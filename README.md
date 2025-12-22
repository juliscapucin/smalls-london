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
- **Category Browsing** - Filter businesses by category
- **Search** - Search business by name
- **Business Details** - Business individual page with details and image gallery

### User Features

- **User Profiles** - Manage user account information
- **Theme Switching** - Dark/light mode support
- **Responsive Design** - Mobile-first, fully responsive UI

### Admin Features

- **Add/Edit Businesses** - Manage businesses from admin dashboard
- **Add/Edit Events** - Manage events from admin dashboard
- **Business Submission** - Approve & publish business submissions
- **Event Submission** - Approve & publish event submissions

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Theming**: Custom design system inspired by Material 3 typography + Tailwind + shadcn design tokens
- **UI Components**: Version of [shadcn/ui](https://ui.shadcn.com) + [radix-ui](https://www.radix-ui.com/themes/docs/overview/getting-started)
- **Icons**: [Lucide React](https://lucide.dev)
- **Schema Validation**: [Zod](https://zod.dev)

### UI Architecture

- Design tokens defined in CSS variables
- Radix used for behavior + accessibility
- shadcn used as a reference & base
- Custom components wrap Radix primitives

## Getting Started

### Prerequisites

- Node.js 22+ installed
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

## Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run gen-types  # Generate TypeScript types from Supabase
```

### Styling

This project uses Tailwind CSS 4 with the default shadcn/ui theme. To customize:

- Modify `src/styles/globals.css` for global styles
- Update `components.json` for shadcn/ui configuration
- Add new shadcn/ui components: `npx shadcn@latest add <component-name>`

### Database Schema Management

Generate TypeScript types from your Supabase schema:

```bash
npm run gen-types
```

This syncs your local TypeScript types with your Supabase database schema.
