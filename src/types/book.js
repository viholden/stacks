// Book type definitions (converted from TypeScript)
// These are just documentation - JavaScript doesn't enforce types

/**
 * @typedef {Object} Book
 * @property {string} canonicalId
 * @property {string} title
 * @property {string[]} authors
 * @property {string} [isbn]
 * @property {string} [isbn13]
 * @property {string} [openLibraryId]
 * @property {string} [coverUrl]
 * @property {number} [publishYear]
 * @property {string} [publisher]
 * @property {number} [pageCount]
 * @property {string[]} [subjects]
 * @property {string} [format]
 */

export const BookFormat = {
  HARDCOVER: 'hardcover',
  PAPERBACK: 'paperback',
  EBOOK: 'ebook',
  AUDIOBOOK: 'audiobook',
  OTHER: 'other'
}
