const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting security vulnerability fix script...');

// Check if mailgun-js is used in the project
console.log('Checking for mailgun-js usage in the codebase...');
let usesMailgun = false;
try {
  const result = execSync('grep -r "require(\'mailgun-js\')" --include="*.js" --include="*.ts" .').toString();
  if (result) {
    usesMailgun = true;
    console.log('Found usage of mailgun-js in the project. Will need to migrate.');
  }
} catch (error) {
  console.log('No direct usage of mailgun-js found.');
}

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Remove mailgun-js if it exists
if (packageJson.dependencies && packageJson.dependencies['mailgun-js']) {
  console.log('Removing vulnerable mailgun-js package...');
  delete packageJson.dependencies['mailgun-js'];
  
  if (usesMailgun) {
    console.log('Adding @mailgun/mailgun-js as a safer alternative...');
    packageJson.dependencies['@mailgun/mailgun-js'] = '^0.22.0';
  }
  
  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Clean npm cache
console.log('Cleaning npm cache...');
execSync('npm cache clean --force', { stdio: 'inherit' });

// Remove node_modules and package-lock.json
console.log('Removing node_modules and package-lock.json...');
try {
  fs.rmSync(path.join(__dirname, 'node_modules'), { recursive: true, force: true });
  fs.unlinkSync(path.join(__dirname, 'package-lock.json'));
} catch (error) {
  console.log('Error removing files:', error.message);
}

// Reinstall dependencies
console.log('Reinstalling dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Security vulnerability fix completed!');
