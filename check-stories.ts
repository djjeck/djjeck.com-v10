// This is a simple script to check if our story files can be compiled by TypeScript
// This will only check the stories files, not the entire project

// Import the story files to check TypeScript compilation
import './stories/components/BlogPostCard.stories';
import './stories/components/Button.stories';
import './stories/components/Newsletter.stories';

console.log('TypeScript compilation check for story files passed!');