
#!/bin/bash
npx concurrently -k -s first "npx http-server storybook-static --port 6006 --silent" "npx wait-on tcp:6006 && test-storybook"
