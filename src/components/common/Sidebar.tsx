import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  FiCode,
  FiSettings,
  FiShield,
  FiKey,
  FiHash,
  FiClock,
  FiDatabase,
  FiFileText,
  FiType,
  FiMoreHorizontal,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface ToolCategory {
  id: string
  name: string
  icon: React.ReactNode
  tools: Tool[]
  isOpen?: boolean
}

interface Tool {
  id: string
  name: string
  path: string
  description: string
  isPremium?: boolean
}

interface SidebarProps {
  isMobileOpen: boolean
  setIsMobileOpen: (isOpen: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['json-tools']))
  const location = useLocation()

  const toolCategories: ToolCategory[] = [
    {
      id: 'json-tools',
      name: 'JSON Tools',
      icon: <FiCode size={18} />,
      tools: [
        { id: 'json-formatter', name: 'JSON Formatter', path: '/tools/json-formatter', description: 'Format and beautify JSON' },
        { id: 'json-validator', name: 'JSON Validator', path: '/tools/json-validator', description: 'Validate JSON syntax' },
        { id: 'json-minifier', name: 'JSON Minifier', path: '/tools/json-minifier', description: 'Minify JSON files' },
        { id: 'json-to-csv', name: 'JSON to CSV', path: '/tools/json-to-csv', description: 'Convert JSON to CSV' },
        { id: 'json-to-excel', name: 'JSON to Excel', path: '/tools/json-to-excel', description: 'Convert JSON to Excel', isPremium: true },
        { id: 'json-to-xml', name: 'JSON to XML', path: '/tools/json-to-xml', description: 'Convert JSON to XML' },
        { id: 'json-to-yaml', name: 'JSON to YAML', path: '/tools/json-to-yaml', description: 'Convert JSON to YAML' },
        { id: 'json-to-typescript', name: 'JSON to TypeScript', path: '/tools/json-to-typescript', description: 'Generate TypeScript interfaces' },
        { id: 'json-path-finder', name: 'JSON Path Finder', path: '/tools/json-path-finder', description: 'Find JSON paths', isPremium: true },
        { id: 'json-diff-checker', name: 'JSON Diff Checker', path: '/tools/json-diff-checker', description: 'Compare JSON files', isPremium: true },
      ]
    },
    {
      id: 'security-tools',
      name: 'Security Tools',
      icon: <FiShield size={18} />,
      tools: [
        { id: 'jwt-decoder', name: 'JWT Decoder', path: '/tools/jwt-decoder', description: 'Decode JWT tokens' },
        { id: 'hash-generator', name: 'Hash Generator', path: '/tools/hash-generator', description: 'Generate hashes' },
        { id: 'password-generator', name: 'Password Generator', path: '/tools/password-generator', description: 'Generate secure passwords' },
      ]
    },
    {
      id: 'encoding-tools',
      name: 'Encoding Tools',
      icon: <FiKey size={18} />,
      tools: [
        { id: 'base64-encoder', name: 'Base64 Encoder', path: '/tools/base64-encoder', description: 'Encode/decode Base64' },
        { id: 'url-encoder', name: 'URL Encoder', path: '/tools/url-encoder', description: 'Encode/decode URLs' },
      ]
    },
    {
      id: 'utility-tools',
      name: 'Utilities',
      icon: <FiSettings size={18} />,
      tools: [
        { id: 'uuid-generator', name: 'UUID Generator', path: '/tools/uuid-generator', description: 'Generate UUIDs' },
        { id: 'timestamp-converter', name: 'Timestamp Converter', path: '/tools/timestamp-converter', description: 'Convert timestamps' },
        { id: 'color-converter', name: 'Color Converter', path: '/tools/color-converter', description: 'Convert color formats' },
        { id: 'sql-formatter', name: 'SQL Formatter', path: '/tools/sql-formatter', description: 'Format SQL queries' },
        { id: 'html-minifier', name: 'HTML Minifier', path: '/tools/html-minifier', description: 'Minify HTML/CSS/JS' },
        { id: 'markdown-to-html', name: 'Markdown to HTML', path: '/tools/markdown-to-html', description: 'Convert Markdown' },
        { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum', path: '/tools/lorem-ipsum-generator', description: 'Generate placeholder text' },
        { id: 'regex-tester', name: 'Regex Tester', path: '/tools/regex-tester', description: 'Test regular expressions' },
        { id: 'about', name: 'About Developer', path: '/about', description: 'Learn about the creator' },
        { id: 'chrome-extension', name: 'Chrome Extension', path: '/chrome-extension', description: 'Install browser extension' },
        { id: 'pwa', name: 'PWA Install', path: '/pwa', description: 'Install as mobile app' },
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Logo and Close Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">JSON Master</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tools</p>
            </div>
          </div>
          {/* Close Button - Only visible on mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {toolCategories.map((category) => (
          <div key={category.id} className="space-y-1">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                {category.icon}
                <span>{category.name}</span>
              </div>
              {openCategories.has(category.id) ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
            </button>

            <AnimatePresence>
              {openCategories.has(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden ml-6 space-y-1"
                >
                  {category.tools.map((tool) => (
                    <NavLink
                      key={tool.id}
                      to={tool.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                        }`
                      }
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span>{tool.name}</span>
                          {tool.isPremium && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full">
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>v1.0.0</p>
          <p className="mt-1">Made with ❤️ for developers</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 z-[60]"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
