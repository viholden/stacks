import { useState } from 'react'
import './StarRating.css'

export default function StarRating({ 
  rating = 0, 
  onRatingChange = null, 
  size = 24,
  interactive = false 
}) {
  const [hoverRating, setHoverRating] = useState(0)
  
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating

  function handleClick(value) {
    if (interactive && onRatingChange) {
      onRatingChange(value)
    }
  }

  function handleMouseEnter(value) {
    if (interactive) {
      setHoverRating(value)
    }
  }

  function handleMouseLeave() {
    if (interactive) {
      setHoverRating(0)
    }
  }

  return (
    <div className={`star-rating ${interactive ? 'interactive' : ''}`}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = displayRating >= star
        const halfFilled = displayRating >= star - 0.5 && displayRating < star

        return (
          <div
            key={star}
            className="star-container"
            style={{ width: size, height: size }}
            onMouseLeave={handleMouseLeave}
          >
            {/* The actual visible star */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              className="star-svg"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id={`half-gradient-${star}`}>
                  <stop offset="50%" stopColor="#f6ad55" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                </linearGradient>
              </defs>
              <path
                fill={halfFilled && !filled ? `url(#half-gradient-${star})` : filled ? '#f6ad55' : '#e2e8f0'}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>

            {/* Invisible left half hit area */}
            <div
              className="star-hit-area left"
              onMouseEnter={() => handleMouseEnter(star - 0.5)}
              onClick={() => handleClick(star - 0.5)}
            />

            {/* Invisible right half hit area */}
            <div
              className="star-hit-area right"
              onMouseEnter={() => handleMouseEnter(star)}
              onClick={() => handleClick(star)}
            />
          </div>
        )
      })}
      
      {interactive && (
        <span className="rating-value">{displayRating.toFixed(1)}</span>
      )}
    </div>
  )
}
