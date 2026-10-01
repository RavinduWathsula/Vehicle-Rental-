const fs = require('fs');
const path = require('path');

const dir = 'e:/Projects/Vehicle Rental/frontend/src/pages/admin';
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'))
  .map(f => path.join(dir, f));

files.push('e:/Projects/Vehicle Rental/frontend/src/layouts/AdminLayout.jsx');

const replacements = [
  // Backgrounds
  [/bg-black\/40\s+backdrop-blur-md\s+border\s+border-white\/10\s+rounded-2xl\s+overflow-hidden\s+shadow-\[0_0_30px_rgba\(0,0,0,0\.5\)\]/g, 'bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm'],
  [/bg-black\/40\s+backdrop-blur-md\s+p-6\s+rounded-2xl\s+border\s+border-white\/10\s+shadow-\[0_0_30px_rgba\(0,0,0,0\.5\)\]/g, 'bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm'],
  [/bg-black\/40\s+border-b\s+border-white\/10/g, 'bg-drivex-sidebar border-b border-drivex-border'],
  [/bg-black\/60/g, 'bg-drivex-sidebar'],
  [/bg-black\/40/g, 'bg-drivex-card'],
  [/bg-black\/80/g, 'bg-black/60'],
  [/bg-[#111218]/g, 'bg-drivex-bg'],
  [/bg-white\/5/g, 'bg-drivex-card'],
  [/hover:bg-white\/10/g, 'hover:bg-drivex-card-hover'],
  [/bg-white\/10/g, 'bg-drivex-card border border-drivex-border'],
  
  // Colors & Borders
  [/text-white/g, 'text-drivex-text'],
  [/text-gray-400/g, 'text-drivex-text-muted'],
  [/text-gray-300/g, 'text-drivex-text-muted'],
  [/text-gray-500/g, 'text-drivex-text-muted'],
  [/border-white\/10/g, 'border-drivex-border'],
  [/border-white\/20/g, 'border-drivex-border'],
  [/border-white\/5/g, 'border-drivex-border'],
  [/hover:border-white\/20/g, 'hover:border-drivex-accent'],
  
  // Accents
  [/bg-\[#00E5FF\]/g, 'bg-drivex-accent'],
  [/text-\[#00E5FF\]/g, 'text-drivex-accent'],
  [/border-\[#00E5FF\]/g, 'border-drivex-accent'],
  [/focus:border-\[#00E5FF\]/g, 'focus:border-drivex-accent'],
  [/focus:ring-\[#00E5FF\]/g, 'focus:ring-drivex-accent'],
  [/hover:text-\[#00E5FF\]/g, 'hover:text-drivex-accent'],
  [/from-\[#00E5FF\]/g, 'from-drivex-accent'],
  [/hover:shadow-\[0_0_20px_rgba\(0,229,255,0\.4\)\]/g, 'hover:bg-drivex-accent-hover shadow-md'],
  
  // Buttons & text
  [/text-black/g, 'text-drivex-text-inverse'],
  [/hover:bg-white(?!\/)/g, 'hover:bg-drivex-accent-hover'],
  [/bg-transparent/g, 'bg-transparent'],
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Extra fixes
  content = content.replace(/\[var\(--([a-zA-Z-]+)\)\]/g, 'drivex-$1'); // In case some are already converted to [var(--)]
  content = content.replace(/drivex-drivex-/g, 'drivex-'); // Cleanup double drivex
  
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  
  fs.writeFileSync(f, content);
  console.log('Fixed ' + f);
});
