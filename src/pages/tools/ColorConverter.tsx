import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ColorConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState('')
  const [rgbColor, setRgbColor] = useState('')
  const [hslColor, setHslColor] = useState('')

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const convertColor = () => {
    if (!hexColor.trim()) {
      toast.error('Please enter a hex color')
      return
    }

    try {
      const rgb = hexToRgb(hexColor)
      if (!rgb) {
        throw new Error('Invalid hex color')
      }

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
      setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
      toast.success('Color converted!')
    } catch (error) {
      toast.error('Invalid hex color format')
      setRgbColor('')
      setHslColor('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Color Converter - JSON Master Tools</title>
        <meta name="description" content="Convert colors between HEX, RGB, and HSL formats." />
      </Helmet>

      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Color Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Convert colors between HEX, RGB, and HSL formats
            </p>
          </div>

          <button
            onClick={convertColor}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <FiPlay size={16} />
            <span>Convert</span>
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Color Preview */}
            <div className="glass rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Color Preview
              </h2>
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: hexColor || '#ffffff' }}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={hexColor}
                    onChange={(e) => setHexColor(e.target.value)}
                    placeholder="#FF5733"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setHexColor('#FF5733')}
                  className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sample
                </button>
              </div>
            </div>

            {/* Conversions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  RGB Format
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-20 flex items-center">
                  {rgbColor ? (
                    <code className="text-gray-900 dark:text-gray-100">
                      {rgbColor}
                    </code>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      RGB format will appear here
                    </div>
                  )}
                </div>
              </div>

              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  HSL Format
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-20 flex items-center">
                  {hslColor ? (
                    <code className="text-gray-900 dark:text-gray-100">
                      {hslColor}
                    </code>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      HSL format will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorConverter
