# React TypeScript Blog

A modern blog website built with React, TypeScript, and Storybook. This project features a clean, responsive design and a component-based architecture.

## Features

- Responsive design for mobile, tablet, and desktop
- Article categories and tagging system
- Featured posts section
- Markdown content rendering
- Component library with Storybook documentation

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Express.js, Node.js
- **State Management**: React Query (TanStack Query)
- **Component Development**: Storybook
- **Styling**: TailwindCSS
- **Deployment**: Heroku-ready configuration

## Development Setup

### Prerequisites

- Node.js (version 20.x or higher)
- npm (version 9.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/react-typescript-blog.git
   cd react-typescript-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the backend Express server and the frontend Vite development server.

4. Run Storybook:
   ```bash
   ./run-storybook.sh
   ```
   Storybook will be available at http://localhost:6006

### Building for Production

```bash
npm run build
```

### Building Storybook

```bash
./build-storybook.sh
```

## Project Structure

```
├── client/          # Frontend code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── hooks/
├── server/          # Backend code
│   ├── routes.ts
│   └── storage.ts
├── shared/          # Shared types and schemas
├── stories/         # Storybook stories
└── .storybook/      # Storybook configuration
```

## Continuous Integration

This project uses GitHub Actions for CI/CD:
- Type checking
- Build verification
- Storybook build testing

## License

MIT