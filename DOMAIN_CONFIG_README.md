# 🌐 Domain Configuration Guide

This guide explains how to easily switch between development and production environments in your JSON Master Tools application.

## 🚀 Quick Setup

### Step 1: Copy Environment File
```bash
# Copy the example environment file
cp .env.example .env
```

### Step 2: Configure Your Domain
Edit the `.env` file and update your production domain:

```env
# Environment: 'development' or 'production'
VITE_ENVIRONMENT=development

# Development settings (localhost)
VITE_DEV_DOMAIN=http://localhost:5173
VITE_DEV_NAME=Local Development

# Production settings (update with your actual domain)
VITE_PROD_DOMAIN=https://your-actual-domain.com
VITE_PROD_NAME=Production
```

### Step 3: Switch Environments
To switch between environments, simply change the `VITE_ENVIRONMENT` variable:

```env
# For Development
VITE_ENVIRONMENT=development

# For Production
VITE_ENVIRONMENT=production
```

## 📁 Configuration Files

### `src/config/domain.ts`
This file automatically reads your environment configuration and provides helper functions:

```typescript
import {
  getBaseUrl,        // Gets the current base URL
  getToolUrl,        // Generates tool URLs
  getFullAppUrl,     // Gets the main app URL
  isDevelopment,     // Checks if in development mode
  isProduction       // Checks if in production mode
} from '@/config/domain'
```

### `src/vite-env.d.ts`
TypeScript declarations for environment variables (auto-generated).

### `.env.example`
Template file with all available configuration options.

## 🔧 How It Works

### Automatic Domain Detection
The system automatically detects your environment and uses the appropriate domain:

```typescript
// In development
console.log(getBaseUrl()) // Output: http://localhost:5173

// In production
console.log(getBaseUrl()) // Output: https://your-actual-domain.com
```

### Dynamic URL Generation
All URLs are generated dynamically based on your configuration:

```typescript
// Tool URLs
getToolUrl('/tools/json-formatter') // → https://yourdomain.com/tools/json-formatter

// App URLs
getFullAppUrl() // → https://yourdomain.com

// Special pages
getChromeExtensionUrl() // → https://yourdomain.com/chrome-extension
```

## 🌐 Environment-Specific Features

### Development Mode (`VITE_ENVIRONMENT=development`)
- ✅ **Hot reload** enabled
- ✅ **Localhost** URLs
- ✅ **Debugging** features
- ✅ **Development** tools

### Production Mode (`VITE_ENVIRONMENT=production`)
- ✅ **Optimized** build
- ✅ **Your domain** URLs
- ✅ **Production** optimizations
- ✅ **Chrome extension** ready

## 📦 Chrome Extension Integration

The domain configuration automatically updates your Chrome extension:

### Automatic Domain Updates
- Extension popup uses your configured domain
- Setup instructions link to your domain
- All tool links point to your correct domain

### For Users
1. Set `VITE_ENVIRONMENT=production` in your `.env`
2. Update `VITE_PROD_DOMAIN` with your actual domain
3. The Chrome extension automatically uses the correct URLs

## 🔄 Switching Environments

### From Development to Production
```bash
# 1. Update .env file
echo "VITE_ENVIRONMENT=production" >> .env
echo "VITE_PROD_DOMAIN=https://your-actual-domain.com" >> .env

# 2. Restart your development server
npm run dev

# 3. Build for production
npm run build
```

### From Production to Development
```bash
# 1. Update .env file
echo "VITE_ENVIRONMENT=development" >> .env

# 2. Restart your development server
npm run dev
```

## 🛠️ Advanced Configuration

### Custom Environment Variables
You can add custom environment variables in your `.env` file:

```env
# Custom variables
VITE_APP_NAME="My JSON Tools"
VITE_APP_VERSION="2.0.0"
VITE_ENABLE_ANALYTICS=true
```

### Multiple Environments
You can create multiple environment files:

```bash
# Development
.env.development

# Production
.env.production

# Staging
.env.staging
```

## 🔍 Troubleshooting

### Common Issues

**❌ Extension shows wrong domain**
```bash
# Solution: Update your .env file
VITE_PROD_DOMAIN=https://your-correct-domain.com
```

**❌ Environment not switching**
```bash
# Solution: Restart your dev server after changing .env
npm run dev
```

**❌ TypeScript errors with import.meta.env**
```bash
# Solution: The vite-env.d.ts file should handle this automatically
# If issues persist, restart TypeScript server
```

### Debug Information
Check your current configuration:

```typescript
import { getDomainInfo, ENVIRONMENT } from '@/config/domain'

console.log('Current environment:', ENVIRONMENT)
console.log('Domain info:', getDomainInfo())
```

## 📚 File Structure

```
project-root/
├── .env                    # Your environment configuration
├── .env.example           # Template with all options
├── src/
│   ├── config/
│   │   └── domain.ts      # Domain configuration logic
│   └── vite-env.d.ts      # TypeScript declarations
└── chrome-extension/
    ├── manifest.json      # Auto-updated with domain
    └── popup.html         # Auto-updated with domain
```

## 🎯 Best Practices

### ✅ Do's
- ✅ **Always use** the configuration functions (`getBaseUrl()`, etc.)
- ✅ **Update domains** in `.env` file, not in code
- ✅ **Test both environments** before deployment
- ✅ **Use environment variables** for all URLs

### ❌ Don'ts
- ❌ **Don't hardcode** URLs in components
- ❌ **Don't commit** `.env` files with real domains
- ❌ **Don't forget** to update domains for production

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `VITE_PROD_DOMAIN` in `.env`
- [ ] Set `VITE_ENVIRONMENT=production`
- [ ] Test the Chrome extension setup page
- [ ] Verify all tool URLs work correctly
- [ ] Check search functionality works
- [ ] Test in different browsers

## 💡 Tips

### Quick Domain Testing
```bash
# Test with a temporary domain
VITE_PROD_DOMAIN=https://my-test-domain.com

# Test with localhost for production
VITE_PROD_DOMAIN=http://localhost:3000
```

### Environment-Specific Features
```typescript
// Show different content based on environment
if (isDevelopment()) {
  // Show debug panel
}

if (isProduction()) {
  // Show analytics
}
```

---

**🎉 Happy configuring! Your app will now seamlessly work across all environments!**
