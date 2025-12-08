# Crest Pipeline Dashboard

A simple, local-first pipeline dashboard for tracking real estate sales deals.

## Features

- 📊 **Pipeline Visualization** - Kanban-style board with 5 stages (Lead, Qualification, Under Contract, Closed Won, Closed Lost)
- 💰 **Commission Tracking** - Automatically calculates estimated commissions based on listing price, rate, and your share
- 📈 **Metrics Dashboard** - Real-time overview of total deals, active deals, pipeline value, and closed value
- 💾 **Local Storage** - All data stored locally in your browser (no external database required)
- ✏️ **Easy Management** - Add, edit, and delete deals with a simple modal interface

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Local Storage** - Browser-based data persistence

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Adding a Deal

1. Click the "Add Deal" button in the top right
2. Fill in the property details:
   - Property Address (required)
   - Listing Price (required)
   - Status (default: Lead)
   - Commission Rate (default: 3%)
   - My Share (default: 50%)
   - Estimated Close Date (optional)
   - Notes (optional)
3. Click "Add Deal"

### Editing a Deal

1. Click on any deal card in the pipeline
2. Update the fields as needed
3. Click "Update Deal"

### Deleting a Deal

1. Click on a deal card to open the edit modal
2. Click the "Delete" button at the bottom
3. Confirm the deletion

### Pipeline Stages

- **Lead** - Initial contact or inquiry
- **Qualification** - Qualifying the lead and determining fit
- **Under Contract** - Deal is under contract
- **Closed Won** - Successfully closed deal
- **Closed Lost** - Deal did not close

## Data Storage

All data is stored in your browser's local storage under the key `crest-pipeline-deals`. 

**Important Notes:**
- Data persists across browser sessions
- Data is specific to this domain/origin
- Clearing browser data will delete all deals
- To backup your data, you can export from browser DevTools (Application > Local Storage)

## Project Structure

```
crest-pipeline-dashboard/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── AddDealModal.tsx  # Add/Edit deal modal
│   ├── DealCard.tsx      # Individual deal card
│   ├── MetricsCard.tsx   # Metric display card
│   └── PipelineColumn.tsx # Pipeline stage column
├── lib/
│   ├── storage.ts        # Local storage utilities
│   └── utils.ts          # Helper functions
└── types/
    └── deal.ts           # TypeScript types
```

## License

Private - All rights reserved

---

Built for Crest Real Estate
