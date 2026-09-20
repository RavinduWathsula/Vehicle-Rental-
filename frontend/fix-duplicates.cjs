const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all import React statements
    content = content.replace(/import\s+React\s+from\s+['"]react['"];\s*\n?/g, '');
    
    // If the file uses the React namespace, add exactly one import at the top
    if (content.includes('React.') && !content.includes("import * as React")) {
        content = `import React from 'react';\n` + content;
    }

    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed duplicate React imports');
