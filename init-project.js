const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Initializing Next.js project and performing security check...');

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log('Creating package.json file...');
  // This will create a basic package.json if it doesn't exist
  execSync('npm init -y', { stdio: 'inherit' });
  
  // Read the newly created package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update with Next.js defaults
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.dependencies.next = "^14.0.4";
  packageJson.dependencies.react = "^18.2.0";
  packageJson.dependencies["react-dom"] = "^18.2.0";
  
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.devDependencies["@types/node"] = "^20.10.5";
  packageJson.devDependencies["@types/react"] = "^18.2.45";
  packageJson.devDependencies["@types/react-dom"] = "^18.2.18";
  packageJson.devDependencies.eslint = "^8.56.0";
  packageJson.devDependencies["eslint-config-next"] = "^14.0.4";
  packageJson.devDependencies.typescript = "^5.3.3";
  
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.dev = "next dev";
  packageJson.scripts.build = "next build";
  packageJson.scripts.start = "next start";
  packageJson.scripts.lint = "next lint";
  packageJson.scripts["security-check"] = "npm i --package-lock-only && npm audit";
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Generate package-lock.json
console.log('Generating package-lock.json...');
execSync('npm i --package-lock-only', { stdio: 'inherit' });

// Run security audit
console.log('Running security audit...');
try {
  const auditOutput = execSync('npm audit', { encoding: 'utf8' });
  console.log(auditOutput);
  
  // Check if there are vulnerabilities
  if (auditOutput.includes('found 0 vulnerabilities')) {
    console.log('✅ No security vulnerabilities found!');
  } else {
    console.log('⚠️ Security vulnerabilities found. Consider running npm audit fix');
  }
} catch (error) {
  console.log('Security vulnerabilities found:');
  console.log(error.stdout);
  console.log('Consider running: npm audit fix');
}

console.log('Project initialization and security check completed!');
