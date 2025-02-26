# Task Management Application

A modern task management application built with React, TypeScript, and Node.js that helps users organize and track their tasks efficiently.

## Features

- **Task Management**
  - Create, read, update, and delete tasks
  - Set task priorities (Low, Medium, High)
  - Track task status (To Do, On Progress, Done, Expired)
  - Set deadlines for tasks
  - Automatic task expiration handling

- **User Interface**
  - Clean and intuitive design
  - Drag-and-drop task organization
  - Real-time task status updates
  - Search functionality
  - Task filtering by status
  - Responsive layout

- **Advanced Features**
  - Automatic task timeout handling
  - Real-time task statistics
  - Task deadline tracking
  - Priority-based task organization

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Axios (for API calls)
- Date-fns (for date formatting)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Morgan (for logging)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-app
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
```
MONGODB_URI=mongodb://localhost:27017/task-management
PORT=3000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd ..
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   └── package.json
├── src/
│   ├── components/
│   ├── context/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Task Model

```typescript
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'On Progress' | 'Done' | 'Expired';
  deadline: string;
  createdAt: string;
  updatedAt: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Team for the amazing frontend library
- MongoDB Team for the powerful database
- All contributors who have helped with code and documentation