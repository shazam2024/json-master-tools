import React, { useState } from 'react'
import { FiSearch, FiSettings, FiMoon, FiSun, FiMenu, FiX, FiSmartphone } from 'react-icons/fi'
import { useThemeStore } from '@/stores/themeStore'
import { useNavigate } from 'react-router-dom'
import { getToolUrl, getFullAppUrl, getAboutUrl, getChromeExtensionUrl } from '@/config/domain'

interface HeaderProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  // Define all available tools for search
  const allTools = [
    { name: 'JSON Formatter', path: '/tools/json-formatter', description: 'Format and beautify JSON' },
    { name: 'JSON Validator', path: '/tools/json-validator', description: 'Validate JSON syntax' },
    { name: 'JSON Minifier', path: '/tools/json-minifier', description: 'Minify JSON files' },
    { name: 'JSON to CSV', path: '/tools/json-to-csv', description: 'Convert JSON to CSV' },
    { name: 'JSON to Excel', path: '/tools/json-to-excel', description: 'Convert JSON to Excel' },
    { name: 'JSON to XML', path: '/tools/json-to-xml', description: 'Convert JSON to XML' },
    { name: 'JSON to YAML', path: '/tools/json-to-yaml', description: 'Convert JSON to YAML' },
    { name: 'JSON to TypeScript', path: '/tools/json-to-typescript', description: 'Generate TypeScript interfaces' },
    { name: 'JSON Path Finder', path: '/tools/json-path-finder', description: 'Find JSON paths' },
    { name: 'JSON Diff Checker', path: '/tools/json-diff-checker', description: 'Compare JSON files' },
    { name: 'JWT Decoder', path: '/tools/jwt-decoder', description: 'Decode JWT tokens' },
    { name: 'Hash Generator', path: '/tools/hash-generator', description: 'Generate hashes' },
    { name: 'Password Generator', path: '/tools/password-generator', description: 'Generate secure passwords' },
    { name: 'Base64 Encoder', path: '/tools/base64-encoder', description: 'Encode/decode Base64' },
    { name: 'URL Encoder', path: '/tools/url-encoder', description: 'Encode/decode URLs' },
    { name: 'UUID Generator', path: '/tools/uuid-generator', description: 'Generate UUIDs' },
    { name: 'Timestamp Converter', path: '/tools/timestamp-converter', description: 'Convert timestamps' },
    { name: 'Color Converter', path: '/tools/color-converter', description: 'Convert color formats' },
    { name: 'SQL Formatter', path: '/tools/sql-formatter', description: 'Format SQL queries' },
    { name: 'HTML Minifier', path: '/tools/html-minifier', description: 'Minify HTML/CSS/JS' },
    { name: 'Markdown to HTML', path: '/tools/markdown-to-html', description: 'Convert Markdown' },
    { name: 'Lorem Ipsum', path: '/tools/lorem-ipsum-generator', description: 'Generate placeholder text' },
    { name: 'Regex Tester', path: '/tools/regex-tester', description: 'Test regular expressions' },
    { name: 'About Developer', path: '/about', description: 'Learn about the creator' },
    { name: 'Chrome Extension', path: '/chrome-extension', description: 'Install browser extension' },
    { name: 'PWA Install', path: '/pwa', description: 'Install as mobile app' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Find matching tools
      const matchingTools = allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

      if (matchingTools.length > 0) {
        // Navigate to the first matching tool
        navigate(matchingTools[0].path)
        setSearchQuery('')
      }
    }
  }

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-3 md:px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <div
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer min-w-0 flex-1"
            onClick={() => navigate('/')}
            title="Go to Dashboard"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs md:text-sm">J</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">
                <span className="hidden sm:inline">JSON Master Tools</span>
                <span className="sm:hidden">JSON Tools</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block truncate">
                Developer Utilities Toolkit
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <FiMoon size={18} className={isDarkMode ? 'hidden' : 'block'} />
            <FiSun size={18} className={isDarkMode ? 'block' : 'hidden'} />
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Settings"
          >
            <FiSettings size={18} />
          </button>

          {/* PWA Install Button */}
          <button
            onClick={() => navigate('/pwa')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Install PWA"
          >
            <FiSmartphone size={18} />
          </button>

          {/* Premium Button - Hidden on mobile */}
          <button
            onClick={() => navigate('/premium')}
            className="hidden sm:block px-3 md:px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 font-medium text-sm"
          >
            Premium
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
