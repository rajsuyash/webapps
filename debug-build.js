// Debug script to verify dependencies
console.log('Node version:', process.version);
console.log('NPM version:', process.env.npm_version);
console.log('Current working directory:', process.cwd());

// Check if package.json exists
const fs = require('fs');
const path = require('path');

try {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageLockPath = path.join(process.cwd(), 'package-lock.json');
  
  console.log('Package.json exists:', fs.existsSync(packagePath));
  console.log('Package-lock.json exists:', fs.existsSync(packageLockPath));
  
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log('Package name:', pkg.name);
    console.log('Package version:', pkg.version);
  }
} catch (error) {
  console.error('Error checking files:', error.message);
}