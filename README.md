# Contact Manager Application

## Overview
The Contact Manager application is a full-stack application for managing contacts. It provides functionality to add, view, search, and delete contacts. The backend is built using Node.js with Express and follows the SOLID principles. The frontend is implemented using React with Material-UI for a modern, responsive UI.

---

## Features
### Backend:
- Implements **SOLID Principles** and clean architecture.
- RESTful API with endpoints for CRUD operations.
- Email format validation and duplicate email checks.
- SQLite database for persistent data storage.
- Structured error handling with meaningful HTTP status codes.

### Frontend:
- User-friendly interface built with React.
- Uses Material-UI for responsive and aesthetic design.
- Functional components with hooks for state management.
- Snackbar alerts for success, error, and warning messages.
- Handles edge cases like duplicate entries and invalid inputs.

---

## Setup Instructions

### Prerequisites:
- Node.js (v16 or higher)
- npm (v7 or higher)
- SQLite3

### Clone the Repository
```bash
git clone <repository-url>
cd Contacts Manager Application
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd contacts_manager_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

4. Run tests (optional):
   ```bash
   npm test
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd contacts_manager_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

---

## API Endpoints
### Base URL:
`http://localhost:3000/api`

### Endpoints:
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| `POST` | `/contacts`          | Add a new contact          |
| `GET`  | `/contacts`          | Retrieve all contacts      |
| `GET`  | `/contacts/search`   | Search contacts by name/email |
| `DELETE` | `/contacts/:id`      | Delete a contact by ID     |

---

## Approach and Design Decisions

### Backend:
- **SOLID Principles:**
  - **Single Responsibility Principle:** Each class or module has a single responsibility.
  - **Dependency Inversion Principle:** The controller depends on abstractions, not concrete implementations.
- **Error Handling:** Meaningful HTTP status codes for different scenarios like `400`, `409`, and `500`.
- **Trade-offs:** Used SQLite for simplicity and local development; for production, consider PostgreSQL or MySQL.

### Frontend:
- **React Hooks:** Simplifies state and lifecycle management.
- **Material-UI:** Provides a modern, responsive UI with minimal effort.
- **Error Handling:** Displays alerts for errors like duplicate entries or invalid inputs using Snackbars.
- **Trade-offs:** For larger-scale applications, state management tools like Redux or Context API could be considered.

---

## Improvements and Future Enhancements
- **Backend:**
  - Add JWT-based authentication for secure access.
  - Introduce pagination for large datasets.

- **Frontend:**
  - Implement loading spinners for API calls.
  - Add client-side form validation for better UX.

---

## Contact
For questions or feedback, feel free to reach out via GitHub or email.

