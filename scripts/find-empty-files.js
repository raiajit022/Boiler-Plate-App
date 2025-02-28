const fs = require('fs');
const path = require('path');

// Directory to start scanning from
const startPath = path.resolve(__dirname, '../src');

// Extensions to check (add or remove as needed)
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.scss'];

// Function to check if file is empty or just whitespace
function isEmptyOrWhitespace(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.trim().length === 0;
}

// Function to recursively scan directories
function scanDirectory(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other common folders you want to ignore
      if (!['node_modules', '.next', '.git'].includes(file)) {
        results.push(...scanDirectory(filePath));
      }
    } else {
      // Check if the file extension is one we care about
      const ext = path.extname(file);
      if (extensions.includes(ext) && isEmptyOrWhitespace(filePath)) {
        results.push(filePath);
      }
    }
  }
  
  return results;
}

// Start scanning
console.log('Scanning for empty files...');
const emptyFiles = scanDirectory(startPath);

// Print results
if (emptyFiles.length === 0) {
  console.log('No empty files found!');
} else {
  console.log(`Found ${emptyFiles.length} empty files:`);
  emptyFiles.forEach(file => {
    console.log(`- ${path.relative(path.resolve(__dirname, '..'), file)}`);
  });
}
