// Google Gemini AI API integration for book recommendations
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Try multiple models in order of preference (March 2026 active free tier models)
const MODELS = [
  'gemini-3-flash-preview',      // Best overall for free tier (2026)
  'gemini-2.5-pro',              // Smartest, but lower rate limits
  'gemini-3.1-flash-lite-preview' // Lightweight, high-volume
];

/**
 * Sleep utility for retry logic
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call Gemini AI with a prompt (with retry logic)
 * @param {string} prompt - The prompt to send to Gemini
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise<string>} - The AI response
 */
export async function callGemini(prompt, retryCount = 0) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('Gemini API key not configured. Get one at https://makersuite.google.com/app/apikey');
  }

  const maxRetries = 3;
  const model = MODELS[Math.min(retryCount, MODELS.length - 1)];
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorText);
      
      // Handle specific error codes
      if (response.status === 503 && retryCount < maxRetries) {
        // Service unavailable - retry with exponential backoff
        const waitTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${waitTime}ms... (attempt ${retryCount + 1}/${maxRetries})`);
        await sleep(waitTime);
        return callGemini(prompt, retryCount + 1);
      }
      
      if (response.status === 404 && retryCount < MODELS.length - 1) {
        // Model not found - try next model
        console.log(`Model ${model} not available, trying next model...`);
        return callGemini(prompt, retryCount + 1);
      }
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      
      throw new Error(`Gemini API error: ${response.status} - ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error.message.includes('fetch') && retryCount < maxRetries) {
      // Network error - retry
      const waitTime = Math.pow(2, retryCount) * 1000;
      console.log(`Network error, retrying in ${waitTime}ms...`);
      await sleep(waitTime);
      return callGemini(prompt, retryCount + 1);
    }
    
    console.error('Error calling Gemini:', error);
    throw error;
  }
}

/**
 * Get book recommendations based on user preferences
 * @param {Array} wantToReadBooks - Books from user's Want to Read shelf
 * @param {Object} preferences - User preferences (mood, trope, genre, etc.)
 * @param {Array} readBooks - User's reading history (4+ stars)
 * @returns {Promise<Array>} - Array of recommended book titles with reasons
 */
export async function getBookRecommendations(wantToReadBooks, preferences, readBooks = []) {
  // Build the want to read list
  const wantToReadList = wantToReadBooks.map(book => 
    `"${book.title}" by ${book.authors ? book.authors.join(', ') : 'Unknown'} ${book.description ? `(${book.description.slice(0, 200)}...)` : ''}`
  ).join('\n');

  // Build reading history for context
  const readingHistory = readBooks.length > 0
    ? `\n\nThe user recently enjoyed these books (4+ stars):\n${readBooks.map(book => 
        `"${book.title}" by ${book.authors ? book.authors.join(', ') : 'Unknown'} (${book.rating} stars)`
      ).join('\n')}`
    : '';

  let prompt;

  if (preferences && (preferences.mood || preferences.trope || preferences.genre || preferences.vibe)) {
    // User specified preferences
    prompt = `You are a book recommendation expert who understands specific vibes, tropes, and micro-tropes in literature.

The user has the following books on their Want to Read shelf:
${wantToReadList}

The user is looking for:
${preferences.genre ? `Genre: ${preferences.genre}` : ''}
${preferences.mood ? `Mood/Vibe: ${preferences.mood}` : ''}
${preferences.trope ? `Trope/Theme: ${preferences.trope}` : ''}
${preferences.vibe ? `Specific vibe: ${preferences.vibe}` : ''}
${readingHistory}

Based on their preferences, analyze the books on their Want to Read shelf and rank the top 3 books that best match what they're looking for. For each book, explain in 1-2 sentences WHY it matches their mood/trope/vibe.

Format your response EXACTLY as:
TITLE: [exact book title]
REASON: [why it matches]

TITLE: [exact book title]
REASON: [why it matches]

TITLE: [exact book title]
REASON: [why it matches]`;
  } else {
    // Fallback - use reading history
    prompt = `You are a book recommendation expert.

The user has the following books on their Want to Read shelf:
${wantToReadList}
${readingHistory}

Based on their reading history and preferences, recommend the top 3 books from their Want to Read shelf that they should read next. For each book, explain in 1-2 sentences why you think they'll enjoy it.

Format your response EXACTLY as:
TITLE: [exact book title]
REASON: [why they'll enjoy it]

TITLE: [exact book title]
REASON: [why they'll enjoy it]

TITLE: [exact book title]
REASON: [why they'll enjoy it]`;
  }

  try {
    const response = await callGemini(prompt);
    
    // Parse the response
    const recommendations = [];
    const lines = response.split('\n');
    let currentTitle = null;
    let currentReason = null;

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        if (currentTitle && currentReason) {
          recommendations.push({ title: currentTitle, reason: currentReason });
        }
        currentTitle = line.replace('TITLE:', '').trim();
        currentReason = null;
      } else if (line.startsWith('REASON:')) {
        currentReason = line.replace('REASON:', '').trim();
      }
    }

    // Add the last recommendation
    if (currentTitle && currentReason) {
      recommendations.push({ title: currentTitle, reason: currentReason });
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

/**
 * Get similar books for a given book (for BookDetail page)
 * @param {Object} book - The book to find similar books for
 * @param {Array} otherBooks - Optional list of books to search through
 * @returns {Promise<Array>} - Array of similar book titles with reasons
 */
export async function getSimilarBooks(book, otherBooks = []) {
  const prompt = `You are a book recommendation expert.

Given this book:
Title: "${book.title}"
Author: ${book.authors ? book.authors.join(', ') : 'Unknown'}
${book.description ? `Description: ${book.description.slice(0, 500)}` : ''}

Recommend 5 similar books that readers who enjoyed this book would also love. Consider the genre, themes, writing style, and emotional resonance.

For each recommendation, provide:
1. The exact title
2. The author
3. A brief explanation (1 sentence) of why it's similar

Format your response EXACTLY as:
TITLE: [exact book title]
AUTHOR: [author name]
REASON: [why it's similar]

TITLE: [exact book title]
AUTHOR: [author name]
REASON: [why it's similar]

(Continue for all 5 books)`;

  try {
    const response = await callGemini(prompt);
    
    // Parse the response
    const recommendations = [];
    const lines = response.split('\n');
    let current = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        if (current.title && current.author && current.reason) {
          recommendations.push(current);
        }
        current = { title: line.replace('TITLE:', '').trim() };
      } else if (line.startsWith('AUTHOR:')) {
        current.author = line.replace('AUTHOR:', '').trim();
      } else if (line.startsWith('REASON:')) {
        current.reason = line.replace('REASON:', '').trim();
      }
    }

    // Add the last recommendation
    if (current.title && current.author && current.reason) {
      recommendations.push(current);
    }

    return recommendations.slice(0, 5); // Ensure max 5 recommendations
  } catch (error) {
    console.error('Error getting similar books:', error);
    throw error;
  }
}

/**
 * Get general book recommendations (not from user's shelves)
 * based on reading history and preferences
 */
export async function getGeneralRecommendations(readBooks = [], preferences = {}) {
  const readingHistory = readBooks.length > 0
    ? readBooks.map(book => 
        `"${book.title}" by ${book.authors ? book.authors.join(', ') : 'Unknown'}`
      ).join('\n')
    : 'No reading history available';

  let prompt = `You are a book recommendation expert.

The user has recently read these books:
${readingHistory}

${preferences.genre ? `Preferred genre: ${preferences.genre}` : ''}
${preferences.mood ? `Current mood: ${preferences.mood}` : ''}
${preferences.trope ? `Favorite tropes: ${preferences.trope}` : ''}
${preferences.vibe ? `Specific vibe: ${preferences.vibe}` : ''}

Recommend 3 books that are NOT on the user's list that they would enjoy. These should be books that exist and are well-known. Include a mix of recent and classic titles.

Format your response EXACTLY as:
TITLE: [exact book title]
AUTHOR: [author name]
REASON: [1-2 sentence reason]

TITLE: [exact book title]
AUTHOR: [author name]
REASON: [1-2 sentence reason]

TITLE: [exact book title]
AUTHOR: [author name]
REASON: [1-2 sentence reason]`;

  try {
    const response = await callGemini(prompt);
    const recommendations = [];
    const lines = response.split('\n');
    let current = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        if (current.title && current.reason) {
          recommendations.push(current);
        }
        current = { title: line.replace('TITLE:', '').trim() };
      } else if (line.startsWith('AUTHOR:')) {
        current.author = line.replace('AUTHOR:', '').trim();
      } else if (line.startsWith('REASON:')) {
        current.reason = line.replace('REASON:', '').trim();
      }
    }

    if (current.title && current.reason) {
      recommendations.push(current);
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting general recommendations:', error);
    throw error;
  }
}
