#!/usr/bin/env node

/**
 * Simple script to help package the Chrome extension
 * Run with: node package-extension.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 JSON Master Tools - Chrome Extension Packager');
console.log('================================================\n');

// Check if required files exist
const requiredFiles = ['manifest.json', 'popup.html', 'README.md'];
const iconsDir = 'icons';

let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
        allFilesExist = false;
    }
});

// Check icons directory
if (fs.existsSync(path.join(__dirname, iconsDir))) {
    const icons = fs.readdirSync(path.join(__dirname, iconsDir));
    console.log(`✅ icons/ - Found (${icons.length} files)`);

    const requiredIcons = ['icon16.png', 'icon32.png', 'icon48.png', 'icon128.png'];
    requiredIcons.forEach(icon => {
        if (icons.includes(icon)) {
            console.log(`   ✅ ${icon} - Found`);
        } else {
            console.log(`   ⚠️  ${icon} - Missing (you'll need to create this)`);
        }
    });
} else {
    console.log(`❌ icons/ - Directory missing`);
    allFilesExist = false;
}

console.log('\n📋 Next Steps:');
console.log('==============');

if (allFilesExist && fs.existsSync(path.join(__dirname, iconsDir))) {
    console.log('✅ All required files are present!');
    console.log('\nTo install the extension:');
    console.log('1. Open Chrome and go to: chrome://extensions/');
    console.log('2. Enable "Developer mode" (top right)');
    console.log('3. Click "Load unpacked"');
    console.log('4. Select this chrome-extension folder');
    console.log('5. Extension will be installed in your toolbar');

    console.log('\n🔧 Before using, remember to:');
    console.log('- Replace "your-domain.com" with your actual domain in popup.html');
    console.log('- Create the required icon files in the icons/ folder');
    console.log('- Test the extension in developer mode first');

} else {
    console.log('❌ Some files are missing. Please ensure all required files are present.');
    console.log('\nRequired files:');
    console.log('- manifest.json');
    console.log('- popup.html');
    console.log('- README.md');
    console.log('- icons/ folder with PNG icons');
}

console.log('\n📖 For detailed instructions, see README.md');
console.log('\nHappy coding! 🎉\n');
