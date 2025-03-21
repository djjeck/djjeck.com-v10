#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine whether storybook stories match our components directory structure
function testComponentMatching() {
  console.log('Testing component structure...');
  
  const componentDirs = ['client/src/components', 'stories/components'];
  
  // Check if both directories exist
  for (const dir of componentDirs) {
    if (!fs.existsSync(dir)) {
      console.error(`Directory ${dir} does not exist!`);
      process.exit(1);
    }
  }
  
  // Get all story files
  const storyFiles = fs.readdirSync('stories/components')
    .filter(file => file.endsWith('.stories.tsx') || file.endsWith('.stories.jsx'));
  
  console.log(`Found ${storyFiles.length} story files:`);
  storyFiles.forEach(file => console.log(` - ${file}`));
  
  // Check if story files match to component files
  let hasErrors = false;
  for (const storyFile of storyFiles) {
    const componentName = storyFile.replace('.stories.tsx', '').replace('.stories.jsx', '');
    
    // Skip ui folder components which are shadcn components
    if (componentName === 'Button') {
      console.log(` - ${componentName}: SKIPPING (shadcn component)`);
      continue;
    }
    
    const componentFile = `${componentName}.tsx`;
    const componentPath = path.join('client/src/components', componentFile);
    
    if (!fs.existsSync(componentPath)) {
      console.error(`Error: Component file ${componentPath} does not exist for story ${storyFile}`);
      hasErrors = true;
    } else {
      console.log(` - ${componentName}: OK`);
    }
  }
  
  if (hasErrors) {
    console.error('Test failed! Some story files do not have matching component files.');
    process.exit(1);
  } else {
    console.log('All tests passed! Story files have matching component files.');
  }
}

// Ensure story files have proper structure for Storybook v8
function testStoryFileStructure() {
  console.log('\nTesting story file structure...');
  
  const storyFiles = fs.readdirSync('stories/components')
    .filter(file => file.endsWith('.stories.tsx') || file.endsWith('.stories.jsx'))
    .map(file => path.join('stories/components', file));
  
  let hasErrors = false;
  for (const storyFile of storyFiles) {
    const content = fs.readFileSync(storyFile, 'utf8');
    
    // Check for export default meta
    if (!content.includes('export default meta')) {
      console.error(`Error: ${storyFile} is missing 'export default meta' statement.`);
      hasErrors = true;
    }
    
    // Check for type Story = StoryObj<>
    if (!content.includes('type Story = StoryObj<')) {
      console.error(`Error: ${storyFile} is missing 'type Story = StoryObj<>' definition.`);
      hasErrors = true;
    }
    
    // Check if it has at least one named export
    if (!content.match(/export const \w+: Story = \{/)) {
      console.error(`Error: ${storyFile} does not have any named exports for stories.`);
      hasErrors = true;
    }
    
    if (!hasErrors) {
      console.log(` - ${storyFile}: OK`);
    }
  }
  
  if (hasErrors) {
    console.error('Test failed! Some story files have incorrect structure for Storybook v8.');
    process.exit(1);
  } else {
    console.log('All tests passed! Story files have correct structure.');
  }
}

// Run the tests
function runTests() {
  console.log('Running component tests...\n');
  testComponentMatching();
  testStoryFileStructure();
  console.log('\nAll tests completed successfully!');
}

runTests();