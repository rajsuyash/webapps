# AI-Powered Todo App

A modern, AI-powered todo application built with Next.js, Prisma, and Neon Database.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Modal interface for adding new todos
- ✅ Mark todos as complete/incomplete
- ✅ Priority levels (low, medium, high)
- ✅ Responsive design with Tailwind CSS
- ✅ Modern UI with shadcn/ui components
- 🔮 AI-powered categorization (coming soon)
- 🔮 Smart suggestions (coming soon)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: Neon PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Neon database account (sign up at https://neon.tech)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your database:
   - Create a new project on Neon
   - Copy your database connection string
   - Update the `DATABASE_URL` in your `.env` file:
     ```
     DATABASE_URL="postgresql://username:password@your-neon-hostname/dbname?sslmode=require"
     ```

3. Generate Prisma client and push schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The app uses a simple Todo model with the following fields:

- `id`: Unique identifier
- `title`: Todo title (required)
- `description`: Optional description
- `completed`: Boolean completion status
- `priority`: Priority level (low, medium, high)
- `category`: AI-generated category (optional)
- `dueDate`: Optional due date
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Routes

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Usage

1. Click the floating "+" button to add a new todo
2. Fill in the title and optional description
3. Click "Add Todo" to save
4. Use the checkbox to mark todos as complete
5. Use the trash icon to delete todos

## Future Enhancements

- AI-powered automatic categorization
- Smart due date suggestions
- Task prioritization recommendations
- Natural language processing for todo creation
- Search and filtering capabilities
- Drag and drop reordering
