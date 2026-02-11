import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { mockItems } from '../data/mockData'
import { getSavedItems, getStacks, createStack, deleteStack } from '../utils/storage'
import '../styles/Profile.css'

function Profile() {
  const [savedItemIds, setSavedItemIds] = useState([])
  const [stacks, setStacks] = useState([])
  const [showNewStackModal, setShowNewStackModal] = useState(false)
  const [newStackName, setNewStackName] = useState('')

  useEffect(() => {
    // Load saved items and stacks from local storage
    setSavedItemIds(getSavedItems())
    setStacks(getStacks())
  }, [])

  // Get actual item objects from IDs
  const savedItems = mockItems.filter(item => savedItemIds.includes(item.id))

  const handleCreateStack = () => {
    if (newStackName.trim()) {
      const newStack = createStack(newStackName.trim())
      if (newStack) {
        setStacks([...stacks, newStack])
        setNewStackName('')
        setShowNewStackModal(false)
      }
    }
  }

  const handleDeleteStack = (stackId) => {
    if (window.confirm('Are you sure you want to delete this stack?')) {
      deleteStack(stackId)
      setStacks(stacks.filter(s => s.id !== stackId))
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <span>H</span>
          </div>
          <div>
            <h1 className="profile-name">Your Profile</h1>
            <p className="profile-subtitle">Manage your saved items and collections</p>
          </div>
        </div>
      </div>

      <section className="profile-section">
        <h2 className="section-title">Your Stacks</h2>
        <div className="stacks-container">
          {stacks.map(stack => {
            const stackItems = mockItems.filter(item => stack.items.includes(item.id))
            return (
              <div key={stack.id} className="stack-collection">
                <div className="stack-collection-header">
                  <h3 className="stack-collection-name">{stack.name}</h3>
                  <div className="stack-collection-actions">
                    <span className="stack-collection-count">{stack.items.length} items</span>
                    <button 
                      className="delete-stack-btn"
                      onClick={() => handleDeleteStack(stack.id)}
                      aria-label="Delete stack"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {stackItems.length > 0 ? (
                  <div className="stack-items-horizontal">
                    {stackItems.map(item => (
                      <Link key={item.id} to={`/item/${item.id}`} className="stack-item-preview">
                        <img src={item.image} alt={item.name} />
                        <div className="stack-item-info">
                          <p className="stack-item-name">{item.name}</p>
                          <p className="stack-item-category">{item.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="stack-empty">
                    <p>No items in this stack yet. Browse items and save them here!</p>
                  </div>
                )}
              </div>
            )
          })}
          <div 
            className="stack-collection stack-collection-new"
            onClick={() => setShowNewStackModal(true)}
          >
            <span className="new-stack-icon">+</span>
            <p>Create New Stack</p>
          </div>
        </div>

        {showNewStackModal && (
          <div className="modal-overlay" onClick={() => setShowNewStackModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Create New Stack</h3>
              <input
                type="text"
                placeholder="Stack name..."
                value={newStackName}
                onChange={(e) => setNewStackName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateStack()}
                autoFocus
              />
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowNewStackModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateStack}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2 className="section-title">Saved Items ({savedItems.length})</h2>
        {savedItems.length > 0 ? (
          <div className="saved-items-grid">
            {savedItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No saved items yet. Start exploring and save items you're interested in!</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile
