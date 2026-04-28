# Stacks 📚

A book tracking web app for readers who use their local library.

🔗 [stacks-65a73.web.app](https://stacks-65a73.web.app)

---

## Features

- Search books by title, author, or ISBN
- Organize books into shelves — Want to Read, Currently Reading, Read
- Find nearby libraries that have a book and get direct catalog links
- Rate and review books
- AI-powered book recommendations via StacksMatch
- Library savings tracker
- Barcode scanner for quick book lookup
- Community posts and events feed
- Library of Things — browse borrowable items at local libraries

## Tech Stack

| Frontend     | Backend / APIs                      |
| ------------ | ----------------------------------- |
| React + Vite | Firebase (Auth, Firestore, Hosting) |
|              | Open Library API                    |
|              | Google Books API                    |
|              | Gemini AI                           |

## Run Locally

```bash
npm install
npm run dev
```

> Requires a `.env` file with Firebase and API keys.
