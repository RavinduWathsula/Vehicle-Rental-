const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const allFiles = walk(directoryPath);
const exts = ['.js', '.jsx', '.ts', '.tsx', '.css'];

let changedFiles = 0;
allFiles.forEach(file => {
    if (exts.includes(path.extname(file))) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('#D4AF37')) {
            // Replace with blue/cyan
            // We can replace the exact string #D4AF37 with our blue #00E5FF
            content = content.replace(/#D4AF37/g, '#00E5FF');
            
            // Wait, what about yellow-related tailwind classes?
            // "yellow color lrter"
            // Let's also replace text-yellow-500 or similar if they exist.
            content = content.replace(/text-yellow-\d00/g, 'text-cyan-500');
            content = content.replace(/border-yellow-\d00/g, 'border-cyan-500');
            content = content.replace(/bg-yellow-\d00/g, 'bg-cyan-500');
            
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
            console.log(`Updated ${file}`);
        }
    }
});

console.log(`Successfully updated ${changedFiles} files.`);
