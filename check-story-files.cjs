// This file checks our story files for TypeScript errors
const { execSync } = require('child_process');

const storyFiles = [
  'stories/components/BlogPostCard.stories.tsx',
  'stories/components/Button.stories.tsx',
  'stories/components/Newsletter.stories.tsx'
];

let hasErrors = false;

for (const file of storyFiles) {
  try {
    console.log(`Checking ${file}...`);
    execSync(`npx tsc --noEmit ${file}`, { stdio: 'inherit' });
    console.log(`✓ No errors in ${file}`);
  } catch (error) {
    console.error(`✗ TypeScript errors found in ${file}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('One or more story files contain TypeScript errors');
  process.exit(1);
} else {
  console.log('All story files passed TypeScript checking!');
}