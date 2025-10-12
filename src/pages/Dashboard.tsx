import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiCode,
  FiShield,
  FiKey,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiZap,
  FiAward
} from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ToolCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  tools: number
  color: string
  path: string
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const categories: ToolCategory[] = [
    {
      id: 'json-tools',
      name: 'JSON Tools',
      description: 'Format, validate, convert and manipulate JSON data',
      icon: <FiCode size={24} />,
      tools: 10,
      color: 'from-blue-500 to-purple-600',
      path: '/tools/json-formatter'
    },
    {
      id: 'security-tools',
      name: 'Security Tools',
      description: 'JWT decoding, hashing, and password generation',
      icon: <FiShield size={24} />,
      tools: 3,
      color: 'from-green-500 to-teal-600',
      path: '/tools/jwt-decoder'
    },
    {
      id: 'encoding-tools',
      name: 'Encoding Tools',
      description: 'Base64, URL encoding and decoding utilities',
      icon: <FiKey size={24} />,
      tools: 2,
      color: 'from-orange-500 to-red-600',
      path: '/tools/base64-encoder'
    },
    {
      id: 'utility-tools',
      name: 'Developer Utilities',
      description: 'UUID, timestamp, color, and text utilities',
      icon: <FiSettings size={24} />,
      tools: 8,
      color: 'from-pink-500 to-rose-600',
      path: '/tools/uuid-generator'
    }
  ]

  const featuredTools = [
    {
      name: 'JSON Formatter',
      description: 'Beautifully format and validate JSON data',
      path: '/tools/json-formatter',
      icon: '✨'
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and analyze JWT tokens',
      path: '/tools/jwt-decoder',
      icon: '🔐'
    },
    {
      name: 'Base64 Encoder',
      description: 'Encode and decode Base64 strings and images',
      path: '/tools/base64-encoder',
      icon: '🔒'
    },
    {
      name: 'UUID Generator',
      description: 'Generate UUID v1 and v4 identifiers',
      path: '/tools/uuid-generator',
      icon: '🆔'
    }
  ]

  const stats = [
    { label: 'Total Tools', value: '23', icon: <FiZap size={20} /> },
    { label: 'Categories', value: '4', icon: <FiSettings size={20} /> },
    { label: 'Free Tools', value: '19', icon: <FiStar size={20} /> },
    { label: 'Premium Tools', value: '4', icon: <FiAward size={20} /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              JSON Master Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your comprehensive developer utility toolkit with 23+ tools for JSON manipulation,
            encoding, security, and much more. All in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-lg p-4"
              >
                <div className="flex items-center justify-center mb-2 text-primary-500">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FiStar className="mr-3 text-yellow-500" />
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-lg p-6 cursor-pointer group"
                onClick={() => navigate(tool.path)}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FiTrendingUp className="mr-3 text-primary-500" />
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-lg p-6 cursor-pointer group"
                onClick={() => navigate(category.path)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}>
                    {category.icon}
                  </div>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                    {category.tools} tools
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start using our powerful developer tools and streamline your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/tools/json-formatter')}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/premium')}
                className="px-8 py-3 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-lg transition-all duration-200 font-medium"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
