#!/usr/bin/env node

/**
 * JSON Master Tools - Chrome Extension File Creator
 * This script helps you create all the necessary files for the Chrome extension
 *
 * IMPORTANT: Before running this script, update the domain configuration in:
 * src/config/domain.ts - Change ENVIRONMENT to 'production' and update the domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 JSON Master Tools - Chrome Extension File Creator');
console.log('===================================================\n');

// IMPORTANT: Read domain configuration from the app
console.log('⚠️  IMPORTANT: Make sure to configure your domain first!');
console.log('📝 Edit src/config/domain.ts and set:');
console.log('   - ENVIRONMENT to "production"');
console.log('   - Update the production baseUrl with your actual domain\n');

// For now, using development config as fallback
const baseUrl = 'http://localhost:5173'; // This should be updated from config

// Create manifest.json
const manifestContent = `{
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
}`;

fs.writeFileSync(path.join(__dirname, 'manifest.json'), manifestContent);
console.log('✅ manifest.json created');

// Create popup.html with dynamic domain
const popupContent = `<!DOCTYPE html>
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
            <a href="${baseUrl}/chrome-extension" target="_blank" class="footer-link">
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
</html>`;

fs.writeFileSync(path.join(__dirname, 'popup.html'), popupContent);
console.log('✅ popup.html created (with dynamic domain)');

// Create icons directory
if (!fs.existsSync(path.join(__dirname, 'icons'))) {
    fs.mkdirSync(path.join(__dirname, 'icons'));
    console.log('✅ icons/ directory created');
}

// Create README
const readmeContent = `# JSON Master Tools - Chrome Extension

A powerful Chrome extension that brings all your favorite JSON tools and developer utilities directly to your browser toolbar for instant access.

## 🚀 Features

- **Quick Access**: Access JSON tools instantly from your browser toolbar
- **Complete Toolkit**: All 20+ tools available in the extension popup
- **Modern UI**: Beautiful, responsive design that matches your app
- **Dynamic Domain**: Automatically uses your configured domain

## 📦 Installation

### Step 1: Configure Domain
1. Open \`src/config/domain.ts\`
2. Set \`ENVIRONMENT\` to \`'production'\`
3. Update the production \`baseUrl\` with your actual domain

### Step 2: Create Icons
Create an \`icons\` folder and add PNG icon files:
- \`icon16.png\` (16x16 pixels)
- \`icon32.png\` (32x32 pixels)
- \`icon48.png\` (48x48 pixels)
- \`icon128.png\` (128x128 pixels)

### Step 3: Enable Developer Mode
1. Open Chrome and go to \`chrome://extensions/\`
2. Enable "Developer mode" in the top right corner

### Step 4: Load Extension
1. Click "Load unpacked" button
2. Select your extension folder
3. The extension will be installed and appear in your toolbar

## 🔧 Domain Configuration

The extension automatically uses the domain configured in your app:
- **Development**: \`http://localhost:5173\`
- **Production**: Your actual domain (set in \`src/config/domain.ts\`)

## 📋 Available Tools

The extension includes quick access to all these tools:

### JSON Tools
- JSON Formatter, Validator, Minifier
- JSON to CSV/Excel/XML/YAML/TypeScript
- JSON Path Finder, Diff Checker

### Security Tools
- JWT Decoder, Hash Generator, Password Generator

### Encoding Tools
- Base64 Encoder, URL Encoder

### Utilities
- UUID Generator, Timestamp Converter
- Color Converter, SQL Formatter
- HTML Minifier, Markdown to HTML
- Lorem Ipsum Generator, Regex Tester

## 🔒 Privacy & Security

- **No data collection**: Extension doesn't collect or store any personal data
- **Local only**: All processing happens in your browser
- **Open source**: Code is transparent and auditable

---

**Made with ❤️ for developers by Kalash Aggarwal**
`;

fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent);
console.log('✅ README.md created');

console.log('\n🎉 All extension files created successfully!');
console.log('\n📋 Next Steps:');
console.log('==============');
console.log('1. ✅ Domain configuration handled automatically');
console.log('2. Create icon files in the icons/ folder');
console.log('3. Open Chrome and go to: chrome://extensions/');
console.log('4. Enable "Developer mode"');
console.log('5. Click "Load unpacked" and select this folder');
console.log('\n🔧 Domain Setup:');
console.log('- Edit src/config/domain.ts');
console.log('- Set ENVIRONMENT to "production"');
console.log('- Update production baseUrl with your domain');
console.log('\nHappy coding! 🚀\n');
