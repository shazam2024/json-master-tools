import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useThemeStore } from '@/stores/themeStore'

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <>
      <Helmet>
        <title>Settings - JSON Master Tools</title>
        <meta name="description" content="Customize your JSON Master Tools experience with theme and preference settings." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your JSON Master Tools experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Editor Settings */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Editor
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Font Size
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Adjust the editor font size
                  </p>
                </div>
                <select className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Tab Size
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Set the number of spaces for indentation
                  </p>
                </div>
                <select className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                </select>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Keyboard Shortcuts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Format/Process
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                  Ctrl + Enter
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Copy Output
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                  Ctrl + C
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Search Tools
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                  Ctrl + K
                </kbd>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Download
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                  Ctrl + D
                </kbd>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About
            </h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Built with:</strong> React, TypeScript, Tailwind CSS</p>
              <p><strong>License:</strong> MIT</p>
              <p className="mt-4">
                JSON Master Tools is a comprehensive developer utility toolkit designed to streamline your workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
