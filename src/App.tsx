import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/common/Header'
import Sidebar from '@/components/common/Sidebar'
import Dashboard from '@/pages/Dashboard'
import JsonFormatter from '@/pages/tools/JsonFormatter'
import JsonValidator from '@/pages/tools/JsonValidator'
import JsonMinifier from '@/pages/tools/JsonMinifier'
import JsonToCsv from '@/pages/tools/JsonToCsv'
import JsonToExcel from '@/pages/tools/JsonToExcel'
import JsonToXml from '@/pages/tools/JsonToXml'
import JsonToYaml from '@/pages/tools/JsonToYaml'
import JsonToTypescript from '@/pages/tools/JsonToTypescript'
import JsonPathFinder from '@/pages/tools/JsonPathFinder'
import JsonDiffChecker from '@/pages/tools/JsonDiffChecker'
import JwtDecoder from '@/pages/tools/JwtDecoder'
import Base64Encoder from '@/pages/tools/Base64Encoder'
import UrlEncoder from '@/pages/tools/UrlEncoder'
import HashGenerator from '@/pages/tools/HashGenerator'
import UuidGenerator from '@/pages/tools/UuidGenerator'
import PasswordGenerator from '@/pages/tools/PasswordGenerator'
import TimestampConverter from '@/pages/tools/TimestampConverter'
import ColorConverter from '@/pages/tools/ColorConverter'
import SqlFormatter from '@/pages/tools/SqlFormatter'
import HtmlMinifier from '@/pages/tools/HtmlMinifier'
import MarkdownToHtml from '@/pages/tools/MarkdownToHtml'
import LoremIpsumGenerator from '@/pages/tools/LoremIpsumGenerator'
import RegexTester from '@/pages/tools/RegexTester'
import Settings from '@/pages/Settings'
import Premium from '@/pages/Premium'
import About from '@/pages/About'
import ChromeExtension from '@/pages/ChromeExtension'
import PWA from '@/pages/PWA'
import { useThemeStore } from '@/stores/themeStore'

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <div className="flex h-screen">
        <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tools/json-formatter" element={<JsonFormatter />} />
                <Route path="/tools/json-validator" element={<JsonValidator />} />
                <Route path="/tools/json-minifier" element={<JsonMinifier />} />
                <Route path="/tools/json-to-csv" element={<JsonToCsv />} />
                <Route path="/tools/json-to-excel" element={<JsonToExcel />} />
                <Route path="/tools/json-to-xml" element={<JsonToXml />} />
                <Route path="/tools/json-to-yaml" element={<JsonToYaml />} />
                <Route path="/tools/json-to-typescript" element={<JsonToTypescript />} />
                <Route path="/tools/json-path-finder" element={<JsonPathFinder />} />
                <Route path="/tools/json-diff-checker" element={<JsonDiffChecker />} />
                <Route path="/tools/jwt-decoder" element={<JwtDecoder />} />
                <Route path="/tools/base64-encoder" element={<Base64Encoder />} />
                <Route path="/tools/url-encoder" element={<UrlEncoder />} />
                <Route path="/tools/hash-generator" element={<HashGenerator />} />
                <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
                <Route path="/tools/password-generator" element={<PasswordGenerator />} />
                <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
                <Route path="/tools/color-converter" element={<ColorConverter />} />
                <Route path="/tools/sql-formatter" element={<SqlFormatter />} />
                <Route path="/tools/html-minifier" element={<HtmlMinifier />} />
                <Route path="/tools/markdown-to-html" element={<MarkdownToHtml />} />
                <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
                <Route path="/tools/regex-tester" element={<RegexTester />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/about" element={<About />} />
                <Route path="/chrome-extension" element={<ChromeExtension />} />
                <Route path="/pwa" element={<PWA />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
