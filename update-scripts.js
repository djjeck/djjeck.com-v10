// A script to temporarily update package.json scripts
import fs from 'fs';

try {
  // Read the current package.json
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Create a backup
  fs.writeFileSync('./package.json.bak', JSON.stringify(packageJson, null, 2), 'utf8');
  
  // Add a new script for direct startup without checks
  packageJson.scripts.quick = "tsx server/index.ts";
  
  // Write back the modified package.json
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), 'utf8');
  
  console.log('✅ Successfully added "quick" script to package.json');
  console.log('Now you can run "npm run quick" to start the server directly');
} catch (error) {
  console.error('Error updating package.json:', error);
}