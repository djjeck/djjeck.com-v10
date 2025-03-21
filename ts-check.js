// This file checks a specific TypeScript file
const { execSync } = require('child_process');

try {
  console.log('Checking storybook.ts file...');
  execSync('npx tsc --noEmit client/src/lib/storybook.ts', { stdio: 'inherit' });
  console.log('No errors in storybook.ts');
} catch (error) {
  console.error('TypeScript errors found in storybook.ts');
  process.exit(1);
}