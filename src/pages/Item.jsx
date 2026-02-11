import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockItems } from '../data/mockData'
import { saveItem, unsaveItem, isItemSaved, getStacks, createStack, addItemToStack } from '../utils/storage'
import '../styles/Item.css'

function Item() {
  const { id } = useParams()
  const item = mockItems.find(i => i.id === id)
  const [isSaved, setIsSaved] = useState(false)
  const [showStackModal, setShowStackModal] = useState(false)
  const [stacks, setStacks] = useState([])
  const [newStackName, setNewStackName] = useState('')

  useEffect(() => {
    if (item) {
      setIsSaved(isItemSaved(item.id))
    }
    setStacks(getStacks())
  }, [item])

  if (!item) {
    return <div className="item-not-found">Item not found</div>
  }

  const handleSaveClick = () => {
    setShowStackModal(true)
  }

  const handleSaveToStack = (stackId) => {
    addItemToStack(stackId, item.id)
    saveItem(item.id)
    setIsSaved(true)
    setShowStackModal(false)
  }

  const handleCreateAndSave = () => {
    if (newStackName.trim()) {
      const newStack = createStack(newStackName.trim())
      if (newStack) {
        addItemToStack(newStack.id, item.id)
        saveItem(item.id)
        setStacks([...stacks, newStack])
        setNewStackName('')
        setIsSaved(true)
        setShowStackModal(false)
      }
    }
  }

  const handleUnsave = () => {
    unsaveItem(item.id)
    setIsSaved(false)
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="item-image-section">
          <div className="item-image">
            <img src={item.image} alt={item.name} />
          </div>
        </div>

        <div className="item-details-section">
          <div className="item-header">
            <h1 className="item-title">{item.name}</h1>
            <span className={`item-status ${item.available ? 'available' : 'unavailable'}`}>
              {item.available ? '✓ Available' : '✗ Currently Checked Out'}
            </span>
          </div>

          <div className="item-category">
            <Link to={`/results?category=${encodeURIComponent(item.category)}`}>
              {item.category}
            </Link>
          </div>

          <p className="item-description">{item.description}</p>

          <div className="item-info-grid">
            <div className="info-item">
              <span className="info-label">Library</span>
              <Link to={`/library/${item.library.id}`} className="info-value library-link">
                {item.library.name}
              </Link>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{item.library.address}</span>
            </div>
            {(item.copiesAvailable !== undefined || item.totalCopies !== undefined) && (
              <div className="info-item">
                <span className="info-label">Copies</span>
                <span className="info-value">
                  {item.copiesAvailable || 0} of {item.totalCopies || 0} available
                </span>
              </div>
            )}
            {item.holds !== undefined && item.holds > 0 && (
              <div className="info-item">
                <span className="info-label">Holds</span>
                <span className="info-value">{item.holds} {item.holds === 1 ? 'hold' : 'holds'}</span>
              </div>
            )}
            {item.loanPeriod && (
              <div className="info-item">
                <span className="info-label">Loan Period</span>
                <span className="info-value">{item.loanPeriod}</span>
              </div>
            )}
          </div>

          <div className="item-actions">
            <a
              href={item.reserveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Reserve at Library
            </a>
            {isSaved ? (
              <button className="btn btn-secondary saved" onClick={handleUnsave}>
                ✓ Saved to Stacks
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleSaveClick}>
                Save to Stack
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stack Selection Modal */}
      {showStackModal && (
        <div className="modal-overlay" onClick={() => setShowStackModal(false)}>
          <div className="modal-content stack-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Save to Stack</h3>
            <p className="modal-subtitle">Choose a stack or create a new one</p>
            
            {stacks.length > 0 && (
              <div className="stack-list">
                {stacks.map(stack => (
                  <button
                    key={stack.id}
                    className="stack-option"
                    onClick={() => handleSaveToStack(stack.id)}
                  >
                    <span className="stack-option-name">{stack.name}</span>
                    <span className="stack-option-count">{stack.items.length} items</span>
                  </button>
                ))}
              </div>
            )}

            <div className="create-stack-section">
              <p className="section-label">Or create a new stack:</p>
              <div className="create-stack-input">
                <input
                  type="text"
                  placeholder="Stack name..."
                  value={newStackName}
                  onChange={(e) => setNewStackName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateAndSave()}
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateAndSave}
                  disabled={!newStackName.trim()}
                >
                  Create & Save
                </button>
              </div>
            </div>

            <button className="btn btn-secondary modal-close" onClick={() => setShowStackModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Item
