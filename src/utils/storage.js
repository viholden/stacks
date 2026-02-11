// Local storage utilities for saving items and stacks

const SAVED_ITEMS_KEY = 'stacks_saved_items'
const STACKS_KEY = 'stacks_collections'

// Saved Items Functions
export const getSavedItems = () => {
  try {
    const saved = localStorage.getItem(SAVED_ITEMS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading saved items:', error)
    return []
  }
}

export const saveItem = (itemId) => {
  try {
    const savedItems = getSavedItems()
    if (!savedItems.includes(itemId)) {
      savedItems.push(itemId)
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems))
    }
    return true
  } catch (error) {
    console.error('Error saving item:', error)
    return false
  }
}

export const unsaveItem = (itemId) => {
  try {
    const savedItems = getSavedItems()
    const filtered = savedItems.filter(id => id !== itemId)
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Error unsaving item:', error)
    return false
  }
}

export const isItemSaved = (itemId) => {
  const savedItems = getSavedItems()
  return savedItems.includes(itemId)
}

// Stacks (Collections) Functions
export const getStacks = () => {
  try {
    const stacks = localStorage.getItem(STACKS_KEY)
    return stacks ? JSON.parse(stacks) : []
  } catch (error) {
    console.error('Error loading stacks:', error)
    return []
  }
}

export const createStack = (name) => {
  try {
    const stacks = getStacks()
    const newStack = {
      id: Date.now().toString(),
      name,
      items: [],
      createdAt: new Date().toISOString()
    }
    stacks.push(newStack)
    localStorage.setItem(STACKS_KEY, JSON.stringify(stacks))
    return newStack
  } catch (error) {
    console.error('Error creating stack:', error)
    return null
  }
}

export const addItemToStack = (stackId, itemId) => {
  try {
    const stacks = getStacks()
    const stack = stacks.find(s => s.id === stackId)
    if (stack && !stack.items.includes(itemId)) {
      stack.items.push(itemId)
      localStorage.setItem(STACKS_KEY, JSON.stringify(stacks))
      return true
    }
    return false
  } catch (error) {
    console.error('Error adding item to stack:', error)
    return false
  }
}

export const removeItemFromStack = (stackId, itemId) => {
  try {
    const stacks = getStacks()
    const stack = stacks.find(s => s.id === stackId)
    if (stack) {
      stack.items = stack.items.filter(id => id !== itemId)
      localStorage.setItem(STACKS_KEY, JSON.stringify(stacks))
      return true
    }
    return false
  } catch (error) {
    console.error('Error removing item from stack:', error)
    return false
  }
}

export const deleteStack = (stackId) => {
  try {
    const stacks = getStacks()
    const filtered = stacks.filter(s => s.id !== stackId)
    localStorage.setItem(STACKS_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Error deleting stack:', error)
    return false
  }
}
