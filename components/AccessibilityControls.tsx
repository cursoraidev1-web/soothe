'use client'

import { useState, useEffect } from 'react'

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize')
    const savedHighContrast = localStorage.getItem('highContrast')
    
    if (savedFontSize) {
      setFontSize(Number(savedFontSize))
      document.documentElement.style.fontSize = `${savedFontSize}%`
    }
    
    if (savedHighContrast === 'true') {
      setHighContrast(true)
      document.documentElement.classList.add('high-contrast')
    }
  }, [])

  const updateFontSize = (newSize: number) => {
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
    localStorage.setItem('fontSize', String(newSize))
  }

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    document.documentElement.classList.toggle('high-contrast')
    localStorage.setItem('highContrast', String(newValue))
  }

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-24 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg hover:bg-primary-700 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
        aria-label="Open accessibility controls"
        aria-expanded={isOpen}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className="fixed right-4 top-40 z-40 w-72 rounded-lg bg-white p-6 shadow-2xl border border-neutral-200"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 id="accessibility-title" className="text-lg font-semibold text-neutral-900">
              Accessibility
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close accessibility controls"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Font Size Control */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Font Size: {fontSize}%
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateFontSize(Math.max(80, fontSize - 10))}
                className="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-sm font-medium transition-colors"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <input
                type="range"
                min="80"
                max="140"
                step="10"
                value={fontSize}
                onChange={(e) => updateFontSize(Number(e.target.value))}
                className="flex-1"
                aria-label="Font size slider"
              />
              <button
                onClick={() => updateFontSize(Math.min(140, fontSize + 10))}
                className="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-sm font-medium transition-colors"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="mb-4">
            <button
              onClick={toggleHighContrast}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                highContrast
                  ? 'bg-accent-500 text-white'
                  : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
              }`}
              aria-pressed={highContrast}
            >
              {highContrast ? 'Disable' : 'Enable'} High Contrast
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              updateFontSize(100)
              if (highContrast) toggleHighContrast()
            }}
            className="w-full px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-medium transition-colors"
          >
            Reset to Default
          </button>
        </div>
      )}
    </>
  )
}
