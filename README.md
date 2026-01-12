# Cho Ventures Ecosystem

Interactive visualization of the Cho Ventures ecosystem - unifying real estate, regenerative living, thought leadership, and philanthropy.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Visualization:** React Flow
- **Animation:** Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deploy on Vercel

The easiest way to deploy this app is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/cho-ventures)

### Manual Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will detect Next.js automatically and configure the build settings
4. Click Deploy

No environment variables are required.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main home page
│   └── globals.css      # Global styles
├── components/
│   ├── EcosystemMap.tsx       # React Flow visualization
│   ├── EntityNode.tsx         # Node component
│   └── EntityDetailPanel.tsx  # Detail panel
├── lib/
│   └── ecosystem-data.ts      # Entity and connection data
└── public/                    # Static assets
```

## Features

- Interactive ecosystem visualization with React Flow
- Animated intro and transitions
- Click entities to view detailed information
- Hover to highlight connections
- Drag to pan, scroll to zoom
- Mini-map for navigation
- Fully responsive design
