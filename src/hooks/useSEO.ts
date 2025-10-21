import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOMeta {
  title: string
  description: string
  keywords: string
  type?: 'website' | 'article'
  image?: string
}

interface StructuredData {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem?: string
  offers?: {
    '@type': string
    price: string
    priceCurrency: string
  }
}

const toolSEOData: Record<string, SEOMeta> = {
  '/': {
    title: 'JSON Master Tools - Free Developer Utilities Toolkit | 23+ Online Tools',
    description: 'Comprehensive free developer toolkit with 23+ tools for JSON formatting, validation, conversion, encoding, security, and more. JWT decoder, Base64 encoder, UUID generator, and much more.',
    keywords: 'json tools, developer utilities, json formatter, jwt decoder, base64 encoder, uuid generator, free online tools, developer toolkit'
  },
  '/tools/json-formatter': {
    title: 'Free JSON Formatter Online - Pretty Print JSON | JSON Master Tools',
    description: 'Format and pretty print JSON data online for free. Validate JSON syntax, compress JSON, and make your JSON data readable with our advanced JSON formatter tool.',
    keywords: 'json formatter, pretty print json, json beautifier, format json online, json validator, free json tools'
  },
  '/tools/json-validator': {
    title: 'Free JSON Validator Online - Validate JSON Syntax | JSON Master Tools',
    description: 'Validate JSON syntax online instantly. Check if your JSON is valid, find errors, and ensure proper JSON structure with our free JSON validator tool.',
    keywords: 'json validator, validate json, json syntax checker, json lint, free json validator, check json'
  },
  '/tools/json-minifier': {
    title: 'Free JSON Minifier Online - Compress JSON | JSON Master Tools',
    description: 'Minify and compress JSON data online for free. Remove unnecessary whitespace and make your JSON files smaller while maintaining validity.',
    keywords: 'json minifier, compress json, minify json online, json compressor, reduce json size'
  },
  '/tools/json-to-csv': {
    title: 'Convert JSON to CSV Online Free - JSON to CSV Converter | JSON Master Tools',
    description: 'Convert JSON to CSV format online instantly and for free. Transform your JSON data into CSV files with our easy-to-use JSON to CSV converter tool.',
    keywords: 'json to csv, convert json to csv, json csv converter, json to csv online, free converter'
  },
  '/tools/json-to-excel': {
    title: 'Convert JSON to Excel Online Free - JSON to XLSX | JSON Master Tools',
    description: 'Convert JSON to Excel (XLSX) format online for free. Transform your JSON data into downloadable Excel files with our JSON to Excel converter.',
    keywords: 'json to excel, json to xlsx, convert json to excel, json excel converter, json to spreadsheet'
  },
  '/tools/json-to-xml': {
    title: 'Convert JSON to XML Online Free - JSON to XML Converter | JSON Master Tools',
    description: 'Convert JSON to XML format online instantly. Transform your JSON data into XML with our free JSON to XML converter tool.',
    keywords: 'json to xml, convert json to xml, json xml converter, json to xml online, free converter'
  },
  '/tools/json-to-yaml': {
    title: 'Convert JSON to YAML Online Free - JSON to YAML Converter | JSON Master Tools',
    description: 'Convert JSON to YAML format online for free. Transform your JSON data into YAML with our easy-to-use JSON to YAML converter.',
    keywords: 'json to yaml, convert json to yaml, json yaml converter, json to yaml online, free converter'
  },
  '/tools/json-to-typescript': {
    title: 'Convert JSON to TypeScript Online Free - JSON to TS Interface | JSON Master Tools',
    description: 'Convert JSON to TypeScript interfaces online for free. Generate TypeScript types from your JSON data automatically.',
    keywords: 'json to typescript, json to ts, convert json to typescript, json typescript converter, generate typescript interface'
  },
  '/tools/json-path-finder': {
    title: 'JSON Path Finder Online - Extract JSON Data | JSON Master Tools',
    description: 'Find and extract specific data from JSON using JSONPath expressions. Test and validate your JSONPath queries online for free.',
    keywords: 'json path, jsonpath finder, extract json data, json query, json path tester, json path online'
  },
  '/tools/json-diff-checker': {
    title: 'JSON Diff Checker Online - Compare JSON Files | JSON Master Tools',
    description: 'Compare two JSON files and find differences online for free. Perfect for API testing, data validation, and debugging.',
    keywords: 'json diff, compare json, json comparison, json diff checker, json compare online, find json differences'
  },
  '/tools/jwt-decoder': {
    title: 'Free JWT Decoder Online - Decode JWT Tokens | JSON Master Tools',
    description: 'Decode and analyze JWT tokens online for free. View header, payload, and signature information with our JWT decoder tool.',
    keywords: 'jwt decoder, decode jwt, jwt token decoder, jwt analyzer, jwt debugger, free jwt tools'
  },
  '/tools/base64-encoder': {
    title: 'Free Base64 Encoder/Decoder Online - Encode/Decode Base64 | JSON Master Tools',
    description: 'Encode and decode Base64 strings and images online for free. Support for text, files, and image Base64 encoding/decoding.',
    keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, base64 online, free base64 tools'
  },
  '/tools/url-encoder': {
    title: 'Free URL Encoder/Decoder Online - Encode/Decode URLs | JSON Master Tools',
    description: 'Encode and decode URLs online for free. Handle URL encoding for special characters, query parameters, and safe URL sharing.',
    keywords: 'url encoder, url decoder, encode url, decode url, url encoding, percent encoding'
  },
  '/tools/hash-generator': {
    title: 'Free Hash Generator Online - MD5, SHA-256, SHA-512 | JSON Master Tools',
    description: 'Generate hash values online for free. Support for MD5, SHA-1, SHA-256, SHA-512, and other popular hashing algorithms.',
    keywords: 'hash generator, md5 generator, sha256 generator, hash online, free hash tools, password hash'
  },
  '/tools/uuid-generator': {
    title: 'Free UUID Generator Online - Generate UUID v1, v4, v5 | JSON Master Tools',
    description: 'Generate UUIDs online for free. Create UUID version 1, 4, and 5 identifiers with our easy-to-use UUID generator tool.',
    keywords: 'uuid generator, generate uuid, uuid v4, uuid v1, uuid online, free uuid generator'
  },
  '/tools/password-generator': {
    title: 'Free Password Generator Online - Strong Secure Passwords | JSON Master Tools',
    description: 'Generate strong, secure passwords online for free. Create random passwords with customizable length and character sets.',
    keywords: 'password generator, generate password, strong password, secure password, random password'
  },
  '/tools/timestamp-converter': {
    title: 'Free Timestamp Converter Online - Unix Timestamp Tools | JSON Master Tools',
    description: 'Convert between Unix timestamps and human-readable dates online for free. Support for multiple timestamp formats and timezones.',
    keywords: 'timestamp converter, unix timestamp, convert timestamp, timestamp to date, date to timestamp'
  },
  '/tools/color-converter': {
    title: 'Free Color Converter Online - HEX, RGB, HSL, HSV | JSON Master Tools',
    description: 'Convert between different color formats online for free. Support for HEX, RGB, HSL, HSV, and other color models.',
    keywords: 'color converter, hex to rgb, rgb to hsl, color format converter, color picker, color tools'
  },
  '/tools/sql-formatter': {
    title: 'Free SQL Formatter Online - Pretty Print SQL Queries | JSON Master Tools',
    description: 'Format and beautify SQL queries online for free. Make your SQL code readable and properly indented with our SQL formatter.',
    keywords: 'sql formatter, format sql, sql beautifier, pretty print sql, sql online formatter'
  },
  '/tools/html-minifier': {
    title: 'Free HTML Minifier Online - Compress HTML Code | JSON Master Tools',
    description: 'Minify and compress HTML code online for free. Remove unnecessary whitespace and optimize your HTML files for faster loading.',
    keywords: 'html minifier, compress html, minify html online, html compressor, optimize html'
  },
  '/tools/markdown-to-html': {
    title: 'Free Markdown to HTML Converter Online - MD to HTML | JSON Master Tools',
    description: 'Convert Markdown to HTML online for free. Transform your Markdown files into HTML with live preview and syntax highlighting.',
    keywords: 'markdown to html, md to html, convert markdown, markdown converter, markdown online'
  },
  '/tools/lorem-ipsum-generator': {
    title: 'Free Lorem Ipsum Generator Online - Placeholder Text | JSON Master Tools',
    description: 'Generate Lorem Ipsum placeholder text online for free. Create dummy text for your designs and prototypes with customizable options.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text, lorem ipsum online, fake text generator'
  },
  '/tools/regex-tester': {
    title: 'Free Regex Tester Online - Test Regular Expressions | JSON Master Tools',
    description: 'Test and validate regular expressions online for free. Debug your regex patterns with live matching and syntax highlighting.',
    keywords: 'regex tester, test regex, regular expression tester, regex online, regex debugger'
  }
}

export const useSEO = () => {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const seoData = toolSEOData[path] || toolSEOData['/']

    // Update document title
    document.title = seoData.title

    // Update meta description
    updateMetaTag('name', 'description', seoData.description)

    // Update keywords
    updateMetaTag('name', 'keywords', seoData.keywords)

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', seoData.title)
    updateMetaTag('property', 'og:description', seoData.description)
    updateMetaTag('property', 'og:url', window.location.href)
    updateMetaTag('property', 'og:type', seoData.type || 'website')

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', seoData.title)
    updateMetaTag('name', 'twitter:description', seoData.description)
    updateMetaTag('name', 'twitter:url', window.location.href)

    // Add structured data
    updateStructuredData(path, seoData)

  }, [location.pathname])
}

const updateMetaTag = (attribute: string, name: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`)

  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    element.setAttribute('content', content)
    document.getElementsByTagName('head')[0].appendChild(element)
  }
}

const updateStructuredData = (path: string, seoData: SEOMeta) => {
  // Remove existing structured data
  const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]')
  existingStructuredData.forEach(script => script.remove())

  // Base WebApplication schema
  const baseSchema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Master Tools',
    description: seoData.description,
    url: window.location.href,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }

  // Add specific tool information for tool pages
  if (path !== '/') {
    const toolName = path.split('/tools/')[1]?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    baseSchema.name = `${toolName} - JSON Master Tools`
    baseSchema.description = `Free online ${toolName} tool. ${seoData.description}`
  }

  // Add JSON formatter specific schemas
  if (path === '/tools/json-formatter') {
    const jsonFormatterSchemas = [
      baseSchema,
      // FAQ Schema
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this JSON formatter really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Our JSON formatter is completely free to use with no hidden costs or premium features. You can format unlimited JSON data without any registration or payment.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is JSON formatting?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'JSON formatting, also known as pretty printing, makes JSON data more readable by adding proper indentation, line breaks, and spacing between elements. This makes it easier for humans to read and understand.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I format large JSON files?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely! Our tool can handle large JSON files efficiently. For extremely large files, we recommend using the download feature to save the formatted output.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is my JSON data safe and private?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, your privacy is important to us. All JSON processing happens in your browser locally. We don\'t send your data to any servers, ensuring complete privacy and security.'
            }
          }
        ]
      },
      // HowTo Schema
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Format JSON Data Online',
        description: 'Step-by-step guide to format and beautify JSON data using our free online tool',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Paste JSON',
            text: 'Copy and paste your JSON data into the input field'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Format',
            text: 'Select your preferred indentation (2 spaces, 4 spaces, or tabs)'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Get Result',
            text: 'Click format and get beautifully formatted JSON instantly'
          }
        ]
      },
      // SoftwareApplication schema for better ranking
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Free JSON Formatter Online',
        description: 'Best free online JSON formatter and beautifier tool for developers',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: [
          'Instant JSON formatting',
          'Syntax validation',
          'Customizable indentation',
          'Copy to clipboard',
          'Download formatted JSON',
          'Mobile friendly',
          'No registration required'
        ]
      }
    ]

    // Add all schemas
    jsonFormatterSchemas.forEach(schema => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  } else {
    // For other pages, just add the base schema
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(baseSchema)
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
