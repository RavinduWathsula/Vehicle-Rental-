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

for (const relPath of filesToFix) {
  const fullPath = path.join('e:/Projects/Vehicle Rental', relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace standard imports of types with import type
  // This is a naive but effective regex for these specific files
  content = content.replace(/import\s+{([^}]*(?:Vehicle|SearchParams|BookingPayload|Extra|BookingCalculationResponse|User|UserRole|HTMLMotionProps)[^}]*)}\s+from\s+['"]([^'"]+)['"]/g, 'import type { $1 } from "$2"');
  
  // Also remove unused React import if present, to fix TS6133
  content = content.replace(/import\s+React[^;]+;\n/g, (match) => {
    // Keep it if there's a React.FC or useState in it
    if (match.includes('useState') || match.includes('useEffect') || match.includes('useRef') || match.includes('FC') || match.includes('createContext') || match.includes('useContext')) {
      return match;
    }
    // Just remove import React from 'react';
    if (match.trim() === "import React from 'react';") {
      return '';
    }
    return match;
  });

  fs.writeFileSync(fullPath, content);
}

console.log("Fixes applied");
