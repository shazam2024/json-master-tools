import React from 'react'
import { motion } from 'framer-motion'
import {
  FiCode,
  FiDatabase,
  FiGlobe,
  FiServer,
  FiSmartphone,
  FiTool,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiTarget
} from 'react-icons/fi'

const About: React.FC = () => {
  const skills = [
    { category: 'Frontend', items: ['React.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
    { category: 'Backend', items: ['Python', 'Django', 'FastAPI', 'Node.js'] },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'Tools & Technologies', items: ['Git', 'Docker', 'Celery', 'Kafka', 'REST APIs'] },
    { category: 'Data Science', items: ['Pandas', 'Numpy', 'Data Analysis', 'BI Tools'] }
  ]

  const achievements = [
    {
      icon: <FiCode size={24} />,
      title: 'Full Stack Development',
      description: '3+ years of experience building scalable web applications'
    },
    {
      icon: <FiDatabase size={24} />,
      title: 'ERP Integrations',
      description: 'Successfully integrated BI tools with enterprise software systems'
    },
    {
      icon: <FiUsers size={24} />,
      title: 'Team Leadership',
      description: 'Leading development teams in building modern web applications'
    },
    {
      icon: <FiTarget size={24} />,
      title: 'Healthcare Solutions',
      description: 'Built secure digital health card system with QR integration'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-6">
            <span className="text-3xl font-bold text-white">K</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Kalash Aggarwal
          </h1>

          <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full mb-6">
            <FiAward className="mr-2" />
            <span className="font-semibold">Full Stack Developer</span>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate full stack developer with 3+ years of experience crafting innovative web solutions.
            Specialized in React, Angular, Python, and modern web technologies. Currently leading development
            initiatives while building cutting-edge developer tools.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Technical Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                    <FiTool className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Professional Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center glass rounded-xl p-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-6">
            <FiZap className="text-white" size={28} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Vision & Mission
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
            "Driven by innovation and a passion for creating impactful solutions, I aspire to leverage
            cutting-edge technologies to build products that make a difference. My goal is to become
            an entrepreneur who creates tools that empower developers and businesses worldwide."
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              <FiTrendingUp size={16} />
              <span>Innovation</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              <FiCode size={16} />
              <span>Quality Code</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
              <FiUsers size={16} />
              <span>Team Leadership</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
