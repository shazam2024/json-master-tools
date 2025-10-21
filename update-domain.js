#!/usr/bin/env node

/**
 * Script to update domain name in SEO files
 * Usage: node update-domain.js yourdomain.com
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get domain from command line arguments
const newDomain = process.argv[2]

if (!newDomain) {
  console.error('❌ Please provide a domain name')
  console.log('Usage: node update-domain.js yourdomain.com')
  process.exit(1)
}

// Validate domain format (basic check)
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/
if (!domainRegex.test(newDomain)) {
  console.error('❌ Invalid domain format')
  process.exit(1)
}

console.log(`🔄 Updating domain to: ${newDomain}`)

// Update robots.txt
try {
  const robotsPath = path.join(__dirname, 'public', 'robots.txt')
  let robotsContent = fs.readFileSync(robotsPath, 'utf8')
  robotsContent = robotsContent.replace(/Sitemap: https:\/\/your-domain\.com\/sitemap\.xml/g, `Sitemap: https://${newDomain}/sitemap.xml`)
  fs.writeFileSync(robotsPath, robotsContent)
  console.log('✅ Updated robots.txt')
} catch (error) {
  console.error('❌ Error updating robots.txt:', error.message)
}

// Update sitemap.xml
try {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml')
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  sitemapContent = sitemapContent.replace(/https:\/\/your-domain\.com/g, `https://${newDomain}`)
  fs.writeFileSync(sitemapPath, sitemapContent)
  console.log('✅ Updated sitemap.xml')
} catch (error) {
  console.error('❌ Error updating sitemap.xml:', error.message)
}

// Update canonical URLs in index.html
try {
  const indexPath = path.join(__dirname, 'index.html')
  let indexContent = fs.readFileSync(indexPath, 'utf8')
  indexContent = indexContent.replace(/rel="canonical" href="\/"/g, `rel="canonical" href="https://${newDomain}/"`)
  fs.writeFileSync(indexPath, indexContent)
  console.log('✅ Updated index.html canonical URL')
} catch (error) {
  console.error('❌ Error updating index.html:', error.message)
}

console.log('\n🎉 Domain update complete!')
console.log(`📝 Next steps:`)
console.log(`1. Commit these changes: git add . && git commit -m "Update domain to ${newDomain}"`)
console.log(`2. Push to deploy: git push`)
console.log(`3. Redeploy on Vercel if needed`)
console.log('\n🔍 Your sitemap will be available at:')
console.log(`   https://${newDomain}/sitemap.xml`)
console.log('\n🤖 Your robots.txt will be available at:')
console.log(`   https://${newDomain}/robots.txt`)
