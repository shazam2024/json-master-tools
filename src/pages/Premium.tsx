import React from 'react'
import { Helmet } from 'react-helmet-async'
import { FiCheck, FiStar, FiZap, FiShield, FiDownload, FiHeadphones } from 'react-icons/fi'

const Premium: React.FC = () => {
  const features = [
    {
      icon: <FiZap size={20} />,
      title: 'Unlimited Operations',
      description: 'No daily limits on tool usage'
    },
    {
      icon: <FiDownload size={20} />,
      title: 'Large File Support',
      description: 'Process files up to 10MB in size'
    },
    {
      icon: <FiShield size={20} />,
      title: 'Premium Tools',
      description: 'Access to exclusive premium-only tools'
    },
    {
      icon: <FiStar size={20} />,
      title: 'No Advertisements',
      description: 'Clean experience without any ads'
    },
    {
      icon: <FiHeadphones size={20} />,
      title: 'Priority Support',
      description: 'Get help when you need it most'
    }
  ]

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '50 daily operations',
        '100KB file size limit',
        'Basic tools only',
        'Community support',
        'Standard ads'
      ],
      limitations: [
        'Limited daily usage',
        'Small file support',
        'Basic tools only',
        'No premium features'
      ],
      buttonText: 'Current Plan',
      buttonDisabled: true
    },
    {
      name: 'Premium',
      price: '$4.99',
      period: '/month',
      description: 'For power users and professionals',
      features: [
        'Unlimited operations',
        '10MB file size limit',
        'All tools included',
        'Priority support',
        'No advertisements',
        'Custom themes',
        'API access'
      ],
      buttonText: 'Upgrade Now',
      buttonDisabled: false,
      popular: true
    }
  ]

  return (
    <>
      <Helmet>
        <title>Premium - JSON Master Tools</title>
        <meta name="description" content="Unlock premium features and enhance your JSON Master Tools experience." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Upgrade to{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Unlock the full potential of JSON Master Tools with premium features designed for developers who need more power and flexibility.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Premium Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="glass rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative glass rounded-2xl p-8 ${
                    plan.popular ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <FiCheck className="text-green-500 mr-3 flex-shrink-0" size={18} />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}

                    {plan.limitations?.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center opacity-60">
                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-3 flex-shrink-0" />
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={plan.buttonDisabled}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      plan.buttonDisabled
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We offer a 30-day money-back guarantee if you're not satisfied with the premium features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We accept all major credit cards, PayPal, and other popular payment methods.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  You can try all premium features with the free plan's limitations to see if it fits your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Premium
