# planmylife
planmylife is a web application that helps users schedule and manage their tasks using a chatbot, PaulBot. It enables users to add and remove tasks manually, or through the help of PaulBot. The app integrates with Google OAuth for authentication and provides a personalized dashboard to view and manage tasks.

## Features
- Integration with Google OAuth: Secure user authentication using Google OAuth.
- Personalized Dashboard: Access an overview of tasks due for today.
- Calendar: Day, week, and month views of tasks
- PaulBot: Chatbot created using DialogFlow, integrated with the webapp.

## Tech Stack
### Frontend:
- React.js
- Axios
- CSS

### Backend:
- Node.js
- Express framework
- PostgreSQL
- Google OAuth2.0
- Google DialogFlow

## Getting Started
To get started with the project locally, follow these steps:

### Clone the repository
```
git clone https://github.com/yourusername/planmylife.git
```

### Set up the backend
Navigate to the backend directory:
```
cd backend
```
Install the required dependencies:
```
npm install
```
Create a .env file with the required environment variables (e.g., database connection details, Google OAuth credentials, client url path).

### Set up the frontend
Navigate to the frontend directory:
```
cd frontend
```
Install the required dependencies:
```
npm install
```
Create a .env file with the required environment variables (e.g., server url path).

### Start the development servers
For the backend:
```
npm start
```
For the frontend:
```
npm start
```

The app should now be running locally at http://localhost:3000 (for the frontend) and http://localhost:5001 (for the backend). Adjust the ports if needed.

