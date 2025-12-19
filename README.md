<h1 align="center">Smalls London</h1>

<p align="center">
A curated, stylish, human directory of small creative businesses in London built with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#development"><strong>Development</strong></a>
</p>

---

## Features

### Authentication

- **User Registration & Login** - Secure email/password authentication
- **Password Recovery** - Forgot password flow with email verification
- **Password Update** - Secure password change functionality
- **Email Confirmation** - Account verification via email
- **Protected Routes** - Authenticated user-only areas

### Business Management

- **Create Businesses** - Add and manage business profiles
- **Business Listings** - View all registered businesses
- **User-Specific Businesses** - Filter businesses by owner
- **Business Details** - Rich business information including descriptions

### User Features

- **User Profiles** - Manage user account information
- **Theme Switching** - Dark/light mode support
- **Responsive Design** - Mobile-first, fully responsive UI

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Schema Validation**: [Zod](https://zod.dev)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project ([create one here](https://database.new))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd smalls-london
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

   Find these values in your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api)

4. **Set up the database**

   Create the following tables in your Supabase project:

   **businesses** table:

   ```sql
   create table businesses (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     description text not null,
     owner_id uuid references auth.users(id) not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages and components
│   │   ├── login/          # Login page
│   │   ├── sign-up/        # Registration page
│   │   ├── forgot-password/ # Password recovery
│   │   └── _components/    # Auth form components
│   ├── businesses/          # Business management
│   │   ├── _actions/       # Server actions
│   │   ├── _components/    # Business components
│   │   └── _lib/           # Business utilities
│   ├── user/               # User profile management
│   │   └── profile/        # User profile page
│   └── protected/          # Protected/authenticated routes
├── components/              # Shared React components
│   └── ui/                 # shadcn/ui components
├── services/               # External services
│   └── supabase/          # Supabase client, schemas, types
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       ├── schemas/       # Zod validation schemas
│       └── types/         # TypeScript types
└── lib/                    # Utility functions
```

## Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run gen-types  # Generate TypeScript types from Supabase
```

### Key Patterns

- **Server Components**: Default for pages, used for data fetching
- **Client Components**: Marked with `"use client"`, used for interactivity
- **Server Actions**: Located in `_actions/` folders for mutations
- **Supabase SSR**: Cookie-based auth working across the entire Next.js stack

### Styling

This project uses Tailwind CSS 4 with the default shadcn/ui theme. To customize:

- Modify `src/app/globals.css` for global styles
- Update `components.json` for shadcn/ui configuration
- Add new shadcn/ui components: `npx shadcn@latest add <component-name>`

### Database Schema Management

Generate TypeScript types from your Supabase schema:

```bash
npm run gen-types
```

This syncs your local TypeScript types with your Supabase database schema.

## Environment Variables

| Variable                               | Description                          |
| -------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`             | Your Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable (anon) key |

---

Built with ❤️ using Next.js and Supabase
