
# CropCare AI - Plant Health Analysis App

A React-based web application that uses AI to analyze plant health and provide medication recommendations.

## Features

- **Plant Image Analysis**: Upload plant photos for AI-powered identification
- **Comprehensive Health Assessment**: Detailed plant health analysis
- **Medication Recommendations**: Personalized treatment suggestions based on plant conditions
- **User-Friendly Interface**: Clean, responsive design built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase Edge Functions
- **Deployment**: Vercel
- **AI**: Custom plant analysis algorithms

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account (for backend functions)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment

This app is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up the Supabase integration if needed
3. Deploy with one click

The app includes a `vercel.json` configuration file for optimal deployment settings.

## Usage

1. **Upload Plant Image**: Click to upload or drag and drop a plant photo
2. **Fill Plant Information**: Provide details about your plant's condition, location, and symptoms
3. **Get Analysis**: Receive AI-powered plant identification and health assessment
4. **Follow Recommendations**: Apply the suggested treatments and medications

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── integrations/       # External service integrations
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
