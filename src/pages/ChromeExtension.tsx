import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiChrome,
  FiDownload,
  FiCheckCircle,
  FiZap,
  FiTool,
  FiGlobe,
  FiCode
} from 'react-icons/fi'
import { getBaseUrl, getChromeExtensionUrl } from '@/config/domain'

const ChromeExtension: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const manifestJson = `{
  "manifest_version": 3,
  "name": "JSON Master Tools",
  "version": "1.0.0",
  "description": "Powerful JSON tools and developer utilities in your browser",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_title": "JSON Master Tools"
  },
  "icons": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}`

  // Generate popup.html content with dynamic domain
  const generatePopupHtml = () => {
    const baseUrl = getBaseUrl()
    const chromeExtensionUrl = getChromeExtensionUrl()

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Master Tools</title>
    <style>
        body {
            width: 350px;
            min-height: 400px;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
            padding: 16px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        .header {
            text-align: center;
            margin-bottom: 16px;
        }
        .logo {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
            color: white;
            font-weight: bold;
            font-size: 20px;
        }
        .title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
        }
        .subtitle {
            font-size: 12px;
            color: #64748b;
            margin: 4px 0 0 0;
        }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 16px;
        }
        .tool-btn {
            padding: 12px 8px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 11px;
            text-align: center;
        }
        .tool-btn:hover {
            background: #f1f5f9;
            border-color: #6366f1;
        }
        .tool-btn.primary {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border: none;
        }
        .tool-btn.primary:hover {
            background: linear-gradient(135deg, #5856eb 0%, #7c3aed 100%);
        }
        .footer {
            text-align: center;
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
        }
        .footer-link {
            color: #6366f1;
            text-decoration: none;
            font-size: 12px;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">J</div>
            <h1 class="title">JSON Master Tools</h1>
            <p class="subtitle">Developer Utilities Toolkit</p>
        </div>

        <div class="tools-grid">
            <button class="tool-btn" onclick="openTool('json-formatter')">JSON Formatter</button>
            <button class="tool-btn" onclick="openTool('json-validator')">JSON Validator</button>
            <button class="tool-btn" onclick="openTool('base64-encoder')">Base64 Encoder</button>
            <button class="tool-btn" onclick="openTool('url-encoder')">URL Encoder</button>
            <button class="tool-btn" onclick="openTool('hash-generator')">Hash Generator</button>
            <button class="tool-btn" onclick="openTool('uuid-generator')">UUID Generator</button>
            <button class="tool-btn primary" onclick="openFullApp()">🚀 Full App</button>
            <button class="tool-btn" onclick="openTool('timestamp-converter')">Timestamp</button>
        </div>

        <div class="footer">
            <a href="${chromeExtensionUrl}" target="_blank" class="footer-link">
                Setup Instructions →
            </a>
        </div>
    </div>

    <script>
        function openTool(tool) {
            const url = \`${baseUrl}/tools/\${tool}\`;
            chrome.tabs.create({ url: url });
        }

        function openFullApp() {
            chrome.tabs.create({ url: '${baseUrl}' });
        }
    </script>
</body>
</html>`
  }

  const popupHtml = generatePopupHtml()

  const extensionSteps = [
    {
      step: 1,
      title: "Download Extension Package",
      description: "Click the download button to get the extension files",
      icon: <FiDownload size={20} />
    },
    {
      step: 2,
      title: "Extract Files",
      description: "Unzip the downloaded package to a folder",
      icon: <FiTool size={20} />
    },
    {
      step: 3,
      title: "Open Chrome Extensions",
      description: "Go to chrome://extensions/ and enable 'Developer mode'",
      icon: <FiChrome size={20} />
    },
    {
      step: 4,
      title: "Install Extension",
      description: "Click 'Load unpacked' and select the extracted folder",
      icon: <FiZap size={20} />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-6">
            <FiChrome size={32} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chrome Extension
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Transform JSON Master Tools into a powerful Chrome extension for quick access to all your favorite developer utilities right from your browser toolbar.
          </p>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                  <FiDownload size={28} className="text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    One-Click Setup
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get the complete extension package with all files ready to install
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsDownloading(true)
                    // Create download package
                    const files = {
                      'manifest.json': manifestJson,
                      'popup.html': popupHtml,
                      'README.md': `# JSON Master Tools - Chrome Extension

## Installation
1. Extract all files to a folder
2. Open Chrome and go to chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked" and select the folder
5. Extension will be installed!

## Configuration
Replace "your-domain.com" with your actual domain in popup.html
`
                    }

                    // Create a simple text-based download
                    const blob = new Blob([
                      '=== JSON Master Tools Chrome Extension Package ===\n\n',
                      'Files to create:\n',
                      '1. manifest.json\n',
                      '2. popup.html\n',
                      '3. README.md\n',
                      '4. icons/ folder with PNG icons\n\n',
                      '=== manifest.json ===\n',
                      files['manifest.json'],
                      '\n\n=== popup.html ===\n',
                      files['popup.html'],
                      '\n\n=== README.md ===\n',
                      files['README.md'],
                      '\n\nInstallation instructions are in README.md'
                    ], { type: 'text/plain' })

                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'json-master-tools-extension-setup.txt'
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                    setIsDownloading(false)
                  }}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Preparing Download...</span>
                    </>
                  ) : (
                    <>
                      <FiDownload size={20} />
                      <span>Download Extension Package</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📦 Package includes: manifest.json, popup.html, and setup instructions
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access JSON tools instantly from your browser toolbar
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiTool className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">All Tools</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete toolkit available in extension popup
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Install</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Simple setup process with detailed instructions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Installation Guide
          </h2>

          <div className="space-y-6">
            {extensionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 glass rounded-xl p-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {step.icon}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What You Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiCode className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">manifest.json</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Extension configuration and permissions
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiTool className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">popup.html</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Beautiful popup interface with all tools
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">README.md</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete installation and usage guide
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto-Configuration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Automatically uses your domain settings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
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
            Ready to Install!
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your Chrome extension package is ready. Download it now and follow the simple installation steps above.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
            <FiCheckCircle size={16} />
            <span>Everything included • One-click setup • Professional quality</span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default ChromeExtension
