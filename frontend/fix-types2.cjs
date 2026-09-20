const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/SearchPage.tsx',
  'src/pages/VehicleDetailsPage.tsx',
  'src/pages/BookingPage.tsx',
  'src/components/booking/BookingSummary.tsx',
  'src/components/booking/BookingWidget.tsx',
  'src/components/booking/flow/StepConfirm.tsx',
  'src/components/booking/flow/StepDetails.tsx',
  'src/components/booking/flow/StepExtras.tsx',
  'src/components/booking/flow/StepJourney.tsx',
  'src/components/booking/flow/StepVehicle.tsx',
  'src/components/auth/ProtectedRoute.tsx',
  'src/components/ui/Button.tsx',
  'src/components/vehicles/VehicleCard.tsx',
  'src/context/AuthContext.tsx'
];

const types = ['Vehicle', 'SearchParams', 'BookingPayload', 'Extra', 'BookingCalculationResponse', 'User', 'UserRole', 'HTMLMotionProps', 'BookingStep'];

for (const relPath of filesToFix) {
  const fullPath = path.join('e:/Projects/Vehicle Rental', relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // First, revert `import type { ... }` back to `import { ... }` to reset state
  content = content.replace(/import type {/g, 'import {');

  // Then, for each import statement, we parse it
  content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g, (match, importsStr, moduleStr) => {
    // split imports
    const items = importsStr.split(',').map(s => s.trim()).filter(s => s);
    
    const newItems = items.map(item => {
      // If it already has 'type ', ignore
      if (item.startsWith('type ')) return item;
      // If it's one of our known types, prefix with 'type '
      let coreName = item;
      if (item.includes(' as ')) {
        coreName = item.split(' as ')[0].trim();
      }
      if (types.includes(coreName)) {
        return `type ${item}`;
      }
      return item;
    });

    return `import { ${newItems.join(', ')} } from '${moduleStr}'`;
  });

  fs.writeFileSync(fullPath, content);
}

console.log("Precise fixes applied");
