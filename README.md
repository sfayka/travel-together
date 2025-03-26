# Travel Together

A collaborative trip planning application built with Next.js, Tailwind CSS, shadcn/ui, and Supabase.

## Features

- User authentication
- Trip management
- Activity planning
- Collaborative notes
- Trip sharing
- Budget tracking
- Calendar integration
- Email notifications

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Supabase](https://supabase.com) - Backend and authentication

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/travel-together.git
   cd travel-together
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project and get your API keys from the Supabase dashboard.

4. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/` - App router pages and layouts
- `src/components/` - React components
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions

## Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Deployment

The application is deployed on Vercel. Push to the main branch to trigger a deployment.

## License

MIT
