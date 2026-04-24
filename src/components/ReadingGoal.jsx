import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase/config'
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import './ReadingGoal.css'

function triggerConfetti() {
  const duration = 2500
  const end = Date.now() + duration
  const colors = ['#667eea', '#48bb78', '#ed8936', '#f56565', '#9f7aea']
  let frameCount = 0

  function frame() {
    const canvas = document.getElementById('confetti-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    frameCount++
    // Only draw every 3rd frame to slow it down
    if (frameCount % 3 === 0) {
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height * 0.6
        const size = Math.random() * 8 + 4
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillStyle = color
        ctx.beginPath()
        if (Math.random() > 0.5) {
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        } else {
          ctx.fillRect(x, y, size, size * 0.6)
        }
        ctx.fill()
      }
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    } else {
      // Clear after animation
      setTimeout(() => {
        if (canvas) {
          const ctx2 = canvas.getContext('2d')
          ctx2.clearRect(0, 0, canvas.width, canvas.height)
        }
      }, 500)
    }
  }

  frame()
}

export default function ReadingGoal() {
  const { currentUser } = useAuth()
  const [goal, setGoal] = useState(null)
  const [booksReadThisYear, setBooksReadThisYear] = useState(0)
  const [editing, setEditing] = useState(false)
  const [goalInput, setGoalInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [celebrated, setCelebrated] = useState(false)

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (currentUser) {
      loadGoal()
    }
  }, [currentUser])

  async function loadGoal() {
    try {
      setLoading(true)

      // Load reading goal
      const goalRef = doc(db, 'users', currentUser.uid, 'readingGoals', String(currentYear))
      const goalDoc = await getDoc(goalRef)
      if (goalDoc.exists()) {
        const data = goalDoc.data()
        setGoal(data.target)
        setCelebrated(data.celebrated || false)
      }

      // Count books read this year
      const readBooksRef = collection(db, 'users', currentUser.uid, 'shelves', 'read', 'books')
      const booksSnapshot = await getDocs(readBooksRef)

      let count = 0
      const yearStart = new Date(currentYear, 0, 1)

      booksSnapshot.docs.forEach(bookDoc => {
        const data = bookDoc.data()
        const completedAt = data.completedAt?.toDate?.() || data.addedAt?.toDate?.()
        if (completedAt && completedAt >= yearStart) {
          count++
        }
      })

      setBooksReadThisYear(count)

      // Check if goal just reached
      if (goalDoc.exists() && !goalDoc.data().celebrated && count >= goalDoc.data().target) {
        triggerConfetti()
        setCelebrated(true)
        await setDoc(goalRef, { ...goalDoc.data(), celebrated: true }, { merge: true })
      }
    } catch (error) {
      console.error('Error loading reading goal:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveGoal() {
    const target = parseInt(goalInput)
    if (!target || target < 1) return

    try {
      const goalRef = doc(db, 'users', currentUser.uid, 'readingGoals', String(currentYear))
      await setDoc(goalRef, {
        target,
        year: currentYear,
        celebrated: booksReadThisYear >= target,
        updatedAt: serverTimestamp()
      })
      setGoal(target)
      setEditing(false)

      // Fire confetti if already met
      if (booksReadThisYear >= target && !celebrated) {
        triggerConfetti()
        setCelebrated(true)
      }
    } catch (error) {
      console.error('Error saving reading goal:', error)
    }
  }

  if (loading) return null

  const progress = goal ? Math.min((booksReadThisYear / goal) * 100, 100) : 0
  const isCompleted = goal && booksReadThisYear >= goal

  return (
    <>
      <canvas
        id="confetti-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      <div className={`reading-goal-card ${isCompleted ? 'completed' : ''}`}>
        <div className="goal-header">
          <h3>📖 {currentYear} Reading Goal</h3>
          {goal && !editing && (
            <button className="goal-edit-btn" onClick={() => { setGoalInput(String(goal)); setEditing(true) }}>
              Edit
            </button>
          )}
        </div>

        {!goal && !editing ? (
          <div className="goal-setup">
            <p>Set a reading goal for {currentYear}!</p>
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Set Goal
            </button>
          </div>
        ) : editing ? (
          <div className="goal-edit-form">
            <label>How many books do you want to read in {currentYear}?</label>
            <div className="goal-input-row">
              <input
                type="number"
                min="1"
                max="500"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="e.g. 24"
                autoFocus
              />
              <button className="btn btn-primary" onClick={handleSaveGoal}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="goal-progress">
            <div className="goal-numbers">
              <span className="books-read">{booksReadThisYear}</span>
              <span className="goal-separator">/</span>
              <span className="goal-target">{goal} books</span>
            </div>
            <div className="goal-progress-bar">
              <div
                className="goal-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            {isCompleted ? (
              <p className="goal-message goal-completed">
                🎉 Congratulations! You've reached your reading goal!
              </p>
            ) : (
              <p className="goal-message">
                {goal - booksReadThisYear} more book{goal - booksReadThisYear !== 1 ? 's' : ''} to go!
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
