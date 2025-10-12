# JSON Master Tools - Chrome Extension

A powerful Chrome extension that brings all your favorite JSON tools and developer utilities directly to your browser toolbar for instant access.

## 🚀 Features

- **Quick Access**: Access JSON tools instantly from your browser toolbar
- **Complete Toolkit**: All 20+ tools available in the extension popup
- **Modern UI**: Beautiful, responsive design that matches your app
- **One-Click Setup**: Download and install in minutes
- **Auto-Configuration**: Automatically uses your domain settings

## 📦 Installation

### Step 1: Download Extension Package
1. Visit the **Chrome Extension** page in your app (`/chrome-extension`)
2. Click **"Download Extension Package"** button
3. Extract the downloaded `.txt` file to get all files

### Step 2: Create Icons (Optional)
Create an `icons` folder and add PNG icon files:
- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

### Step 3: Enable Developer Mode
1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** in the top right corner

### Step 4: Load Extension
1. Click **"Load unpacked"** button
2. Select your extension folder
3. The extension will be installed and appear in your toolbar

## ⚙️ Configuration

The extension automatically uses your domain configuration:

### For Development
- Uses `http://localhost:5173` by default
- Perfect for testing and development

### For Production
1. Update `src/config/domain.ts`:
   ```typescript
   export const ENVIRONMENT: 'development' | 'production' = 'production'
   ```
2. Set your production domain:
   ```typescript
   baseUrl: 'https://your-actual-domain.com'
   ```

## 🔧 What You Get

### 📁 Complete Package
- ✅ **manifest.json** - Extension configuration
- ✅ **popup.html** - Beautiful popup interface
- ✅ **README.md** - Installation guide
- ✅ **Auto-domain** - Uses your configured domain

### 🎨 Beautiful Interface
- **8 Popular Tools** in a compact grid layout
- **"🚀 Full App"** button for complete access
- **Responsive Design** optimized for extensions
- **Modern Styling** matching your app

### 📚 Professional Documentation
- **Step-by-step installation** guide
- **Domain configuration** instructions
- **Troubleshooting** section
- **Best practices** guide

## 🛠️ Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Choose a tool** from the popup grid
3. **Tool opens** in a new tab with full functionality
4. **Use "🚀 Full App"** button to open the complete application

## 🔧 Configuration

Before using the extension, update the domain in the following files:

### In `popup.html`:
Replace `https://your-domain.com` with your actual domain in these lines:
- Line 58: `const url = \`https://your-domain.com/tools/\${tool}\`;`
- Line 62: `chrome.tabs.create({ url: 'https://your-domain.com' });`
- Line 67: `href="https://your-domain.com/chrome-extension"`

## 📋 Available Tools

The extension includes quick access to all these tools:

### JSON Tools
- JSON Formatter
- JSON Validator
- JSON Minifier
- JSON to CSV/Excel/XML/YAML/TypeScript
- JSON Path Finder
- JSON Diff Checker

### Security Tools
- JWT Decoder
- Hash Generator
- Password Generator

### Encoding Tools
- Base64 Encoder
- URL Encoder

### Utilities
- UUID Generator
- Timestamp Converter
- Color Converter
- SQL Formatter
- HTML Minifier
- Markdown to HTML
- Lorem Ipsum Generator
- Regex Tester

## 🔒 Privacy & Security

- **No data collection**: Extension doesn't collect or store any personal data
- **Local only**: All processing happens in your browser
- **Open source**: Code is transparent and auditable

## 🆘 Troubleshooting

### Extension not loading?
- Ensure all files are in the correct folder structure
- Check that `manifest.json` is valid JSON
- Make sure icons exist and are in PNG format

### Tools not opening?
- Verify your domain is correctly set in `popup.html`
- Check that your web application is accessible at the specified domain

### Permission errors?
- Grant the extension permission to access the current tab when prompted
- Ensure the domain is HTTPS (required for extensions)

## 📝 Development

To modify the extension:
1. Edit `popup.html` for UI changes
2. Update `manifest.json` for permissions/metadata
3. Test in Chrome's developer mode
4. Package as .crx file for distribution (optional)

## 🌟 Support

For issues or feature requests:
1. Check the troubleshooting section above
2. Visit the full application for detailed setup instructions
3. Report bugs through the main application

---

**Made with ❤️ for developers by Kalash Aggarwal**
