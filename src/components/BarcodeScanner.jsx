import { useEffect, useRef, useState } from 'react'
import { BarcodeDetector as BarcodeDetectorPolyfill } from 'barcode-detector'
import './BarcodeScanner.css'

// Use native BarcodeDetector if available, otherwise use polyfill
const BarcodeDetectorImpl = window.BarcodeDetector || BarcodeDetectorPolyfill

export default function BarcodeScanner({ isOpen, onClose, onBarcodeDetected }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(null)
  const [error, setError] = useState(null)
  const [manualISBN, setManualISBN] = useState('')
  const streamRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    startCamera()

    return () => {
      stopCamera()
    }
  }, [isOpen])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setHasPermission(true)
        
        // Start barcode detection using polyfill (works on all browsers)
        try {
          const barcodeDetector = new BarcodeDetectorImpl({
            formats: ['ean_13', 'ean_8', 'code_128', 'code_39']
          })
          detectBarcode(barcodeDetector)
        } catch (detectorErr) {
          console.error('BarcodeDetector init error:', detectorErr)
          setError('Barcode scanning failed to initialize. Please enter the ISBN manually below.')
        }
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Please grant camera permissions or enter ISBN manually.')
      setHasPermission(false)
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  async function detectBarcode(barcodeDetector) {
    const detect = async () => {
      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        try {
          const barcodes = await barcodeDetector.detect(canvas)
          if (barcodes.length > 0) {
            const isbn = barcodes[0].rawValue
            onBarcodeDetected(isbn)
            stopCamera()
            return
          }
        } catch (err) {
          console.error('Barcode detection error:', err)
        }
      }

      requestAnimationFrame(detect)
    }

    detect()
  }

  function handleManualSubmit(e) {
    e.preventDefault()
    if (manualISBN.trim()) {
      onBarcodeDetected(manualISBN.trim())
      setManualISBN('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="barcode-scanner-overlay" onClick={onClose}>
      <div className="barcode-scanner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="scanner-header">
          <h2>Scan Book Barcode</h2>
          <button className="scanner-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="scanner-body">
          {hasPermission === null && (
            <div className="scanner-loading">
              <p>Requesting camera access...</p>
            </div>
          )}

          {hasPermission === false && (
            <div className="scanner-error">
              <p>{error}</p>
              <p className="error-hint">Enter the ISBN manually below</p>
            </div>
          )}

          {/* Always render video so ref is available when startCamera runs */}
          <div className="video-container" style={{ display: hasPermission ? 'block' : 'none' }}>
            <video ref={videoRef} autoPlay playsInline muted className="scanner-video" />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="scanner-frame">
              <div className="scanner-line"></div>
            </div>
            <p className="scanner-instructions">
              Point your camera at the book's barcode
            </p>
          </div>

          <div className="manual-isbn-section">
            <p className="manual-isbn-label">Or enter ISBN manually:</p>
            <form onSubmit={handleManualSubmit} className="manual-isbn-form">
              <input
                type="text"
                placeholder="Enter ISBN (e.g., 9780743273565)"
                value={manualISBN}
                onChange={(e) => setManualISBN(e.target.value)}
                pattern="[0-9]{10,13}"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!manualISBN.trim()}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
