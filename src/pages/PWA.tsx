import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiSmartphone,
  FiDownload,
  FiHome,
  FiChrome,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiTool,
  FiGlobe,
  FiCode,
  FiSettings
} from 'react-icons/fi'
import { getBaseUrl, getDomainInfo } from '@/config/domain'

const PWA: React.FC = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const domainInfo = getDomainInfo()
  const baseUrl = getBaseUrl()

  useEffect(() => {
    // Check if PWA is installable
    const checkInstallable = () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsInstallable(true)
      }
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    checkInstallable()
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    }
  }

  const downloadPWAFiles = () => {
    setIsDownloading(true)

    const manifestContent = {
      name: 'JSON Master Tools',
      short_name: 'JSON Tools',
      description: 'Powerful JSON tools and developer utilities',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#6366f1',
      orientation: 'portrait-primary',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      categories: ['developer', 'utilities', 'productivity'],
      lang: 'en',
      scope: '/',
      prefer_related_applications: false
    }

    const swContent = `// Service Worker for JSON Master Tools PWA
const CACHE_NAME = 'json-master-tools-v1'
const urlsToCache = [
  '/',
  '/offline.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})`

    const offlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Master Tools - Offline</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            margin: 0;
            padding: 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .offline-container {
            max-width: 400px;
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .logo {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-weight: bold;
            font-size: 24px;
        }
        h1 {
            color: #1e293b;
            margin: 0 0 16px 0;
        }
        p {
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 24px 0;
        }
        .retry-btn {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
        }
        .retry-btn:hover {
            background: linear-gradient(135deg, #5856eb 0%, #7c3aed 100%);
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="logo">J</div>
        <h1>You're Offline</h1>
        <p>Please check your internet connection and try again. The app will reload automatically when you're back online.</p>
        <button class="retry-btn" onclick="window.location.reload()">
            Retry Connection
        </button>
    </div>
</body>
</html>`

    // Create download package
    const blob = new Blob([
      '=== JSON Master Tools PWA Package ===\n\n',
      'Files to create in your public folder:\n',
      '1. manifest.json (PWA configuration)\n',
      '2. sw.js (Service Worker)\n',
      '3. offline.html (Offline fallback page)\n',
      '4. icons/icon-192.png (PWA icon)\n',
      '5. icons/icon-512.png (PWA icon)\n\n',
      '=== manifest.json ===\n',
      JSON.stringify(manifestContent, null, 2),
      '\n\n=== sw.js ===\n',
      swContent,
      '\n\n=== offline.html ===\n',
      offlineHtml,
      '\n\n=== Installation Instructions ===\n',
      '1. Copy manifest.json to public/manifest.json\n',
      '2. Copy sw.js to public/sw.js\n',
      '3. Copy offline.html to public/offline.html\n',
      '4. Add PWA icons to public/icons/\n',
      '5. Add <link rel="manifest" href="/manifest.json"> to index.html\n',
      '6. Register service worker in your main app file\n\n',
      '=== Service Worker Registration ===\n',
      'if ("serviceWorker" in navigator) {\n',
      '  window.addEventListener("load", () => {\n',
      '    navigator.serviceWorker.register("/sw.js")\n',
      '      .then((registration) => {\n',
      '        console.log("SW registered: ", registration);\n',
      '      })\n',
      '      .catch((registrationError) => {\n',
      '        console.log("SW registration failed: ", registrationError);\n',
      '      });\n',
      '  });\n',
      '}\n'
    ], { type: 'text/plain' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'json-master-tools-pwa-setup.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsDownloading(false)
  }

  const browsers = [
    {
      name: 'Chrome',
      icon: <FiChrome size={24} />,
      support: 'Full Support',
      installSteps: [
        'Click the install icon in address bar',
        'Select "Install" from menu',
        'App installs to desktop/start menu'
      ]
    },
    {
      name: 'Firefox',
      icon: <FiGlobe size={24} />,
      support: 'Full Support',
      installSteps: [
        'Click the install icon in address bar',
        'Select "Install This Site as an App"',
        'App installs to applications folder'
      ]
    },
    {
      name: 'Safari',
      icon: <FiGlobe size={24} />,
      support: 'Limited Support',
      installSteps: [
        'Share button → Add to Home Screen',
        'App installs to home screen',
        'Limited offline capabilities'
      ]
    },
    {
      name: 'Edge',
      icon: <FiGlobe size={24} />,
      support: 'Full Support',
      installSteps: [
        'Click app icon in address bar',
        'Select "Install this site as an app"',
        'App installs to start menu'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-6">
            <FiSmartphone size={32} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Progressive Web App
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform JSON Master Tools into a native-like mobile and desktop app that works offline, launches from home screen, and provides an immersive experience.
          </p>

          {/* Install Button */}
          {isInstallable && !isInstalled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                    <FiDownload size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Install PWA
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Add to your device for quick access
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleInstallClick}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <FiSmartphone size={20} />
                  <span>Install App</span>
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  💡 Works offline • Native-like experience • Home screen access
                </p>
              </div>
            </motion.div>
          )}

          {isInstalled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="glass rounded-2xl p-8 max-w-md mx-auto border-green-200 dark:border-green-800">
                <div className="flex items-center justify-center mb-4">
                  <FiCheckCircle className="text-green-500" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                  App Installed! 🎉
                </h2>
                <p className="text-green-600 dark:text-green-400">
                  JSON Master Tools is now available on your device
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiHome className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Home Screen</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Launch from home screen like a native app
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Offline Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Works without internet connection
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiTool className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Native Feel</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                No browser UI, full-screen experience
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiSettings className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto Updates</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Updates automatically in background
              </p>
            </div>
          </div>
        </motion.div>

        {/* Browser Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Browser Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {browsers.map((browser, index) => (
              <motion.div
                key={browser.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                    {browser.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {browser.name}
                    </h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      browser.support === 'Full Support'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {browser.support}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {browser.installSteps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-2">
                      <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Setup Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Setup Guide
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🚀 One-Click PWA Setup
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Download all necessary PWA files with a single click. The package includes manifest.json, service worker, and offline fallback page.
                  </p>

                  <button
                    onClick={downloadPWAFiles}
                    disabled={isDownloading}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Preparing Download...</span>
                      </>
                    ) : (
                      <>
                        <FiDownload size={20} />
                        <span>Download PWA Package</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiCode className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">manifest.json</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">PWA configuration and metadata</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiSettings className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">sw.js</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Service worker for offline functionality</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiGlobe className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">offline.html</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Offline fallback page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Manual Installation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center glass rounded-xl p-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6">
            <FiCheckCircle className="text-white" size={28} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            PWA Ready! 🚀
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your Progressive Web App package is ready for installation. Users can install it directly from their browsers for the best experience.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
            <FiCheckCircle size={16} />
            <span>Native-like experience • Offline access • Auto-updates</span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default PWA
