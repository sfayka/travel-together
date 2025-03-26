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

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > Database > Connection Info
   - Copy the connection string
   - Run the SQL migrations:
     ```bash
     cd supabase
     psql "your-connection-string" -f migrations/20240326_create_profiles.sql
     ```

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
- `supabase/` - Database migrations and schema

## Development Workflow

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Database Schema

### Profiles Table
- `id` (uuid, primary key) - References auth.users
- `name` (text) - User's full name
- `username` (text, unique) - User's unique username
- `bio` (text) - Optional user bio
- `email_notifications` (boolean) - Email notification preferences
- `theme` (text) - UI theme preference
- `language` (text) - Language preference
- `created_at` (timestamptz) - Record creation timestamp
- `updated_at` (timestamptz) - Record update timestamp

## Deployment

The application is deployed on Vercel. Push to the main branch to trigger a deployment.

## License

MIT
