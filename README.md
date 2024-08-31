# AI-Powered MVP Generator Tool

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project File Structure](#project-file-structure)
3. [Frontend Overview](#frontend-overview)
4. [Backend Overview](#backend-overview)
5. [API Endpoints](#api-endpoints)
6. [Environment Configuration](#environment-configuration)
8. [Getting Started](#getting-started)

## Project Overview

The AI-Powered MVP Generator Tool is designed to streamline the development of MVPs (Minimum Viable Products) by allowing users to specify their requirements in a user-friendly interface. The tool utilises OpenAI's GPT models to generate the required Solana programs and both frontend and backend codebases based on these specifications. Users can then edit, refine, deploy, and test the generated code directly within the tool.

## Project File Structure

The project is organized into the following main directories and files:

```
backend/
├── src/
│   ├── ai/
│   │   ├── prompt-text.json
│   │   └── gpt4-output.json
│   ├── mvp-design/
│   │   ├── mvp-example.json
│   │   ├── mvp-example2.json
│   │   └── mvp-info.json
│   ├── project/
│   │   ├── src/
│   └── files.json
│   ├── schemas/
│   │   ├── instruction.json
│   │   ├── project-template.json
│   │   ├── state.json
│   │   ├── utils.json
│   │   └── examples/
│   │       ├── error-example.json
│   │       ├── instruction-example.json
│   │       ├── processor-example.json
│   │       ├── program-example.json
│   │       ├── state-example.json
│   │       └── utils-example.json
│   ├── routes/
│   │   ├── endpoints.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── fileService.js
│   │   ├── userService.js
│   │   └── fileSearchService.js
├── index.js
├── .env
├── Dockerfile
└── package.json
│
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Design/
│   │   │   ├── Accounts.js
│   │   │   ├── ErrorHandling.js
│   │   │   ├── General.js
│   │   │   ├── Instructions.js
│   │   │   ├── Integrations.js
│   │   │   ├── OverallForm.js
│   │   │   ├── Roles.js
│   │   │   └── Security.js
│   │   ├── Edit/
│   │   │   ├── CodeEditor.js
│   │   │   ├── FileExplorer.js
│   │   │   └── Terminal.js
│   │   ├── Test/
│   │   │   ├── Deployment.js
│   │   │   ├── Logs.js
│   │   │   └── TestRunner.js
│   │   ├── Sidebar.js
│   │   ├── SideSection.js
│   │   └── Wallet.js
│   ├── pages/
│   │   ├── Deploy.js
│   │   ├── Design.js
│   │   ├── Edit.js
│   │   └── Test.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Deploy.css
│   │   ├── Design.css
│   │   ├── Edit.css
│   │   ├── Header.css
│   │   ├── Index.css
│   │   ├── Sidebar.css
│   │   └── Test.css
│   ├── App.js
│   ├── index.js
│   └── Routes.js
├── Dockerfile
└── package.json
.gitignore
docker-compose.yml
README.md

```

## Frontend Overview

The frontend of the project is built with **React** and various supporting libraries to provide an integrated development environment for users.

### Key Features

- **Design Page**: Allows users to define and refine their MVP specifications.
- **Edit Page**: Provides a code editor for generating, customizing, and managing project files.
- **Test Page**: Facilitates deployment, testing, and monitoring of generated code.

### Dependencies

Below is a summary of the key dependencies used in the frontend:

- **React**: `^18.3.1`
- **React-DOM**: `^18.3.1`
- **React Router DOM**: `^6.25.1`
- **React Monaco Editor**: `^0.56.1` - A code editor component for the IDE.
- **@solana/web3.js**: `^1.95.3` - Solana JavaScript API for blockchain interactions.
- **Axios**: `^1.7.2` - For making HTTP requests to the backend and third-party APIs.
- **@xyflow/react**: `^12.0.2` - Library for drag-and-drop interface components.
- **React-Icons**: `^5.3.0` - Icons for UI components.

### Dev Dependencies

- **@babel/plugin-proposal-private-property-in-object**: `^7.21.11` - For supporting modern JavaScript syntax.

### Scripts

- `npm start`: Runs the frontend in development mode.
- `npm run build`: Builds the frontend for production.
- `npm run test`: Runs the tests for the frontend.

## Backend Overview

The backend is built using **Node.js** with **Express** as the web framework. It handles API requests, integrates with the OpenAI API, and manages Solana program deployments.

### Services and Key Features

- **AI Service**: Handles interactions with OpenAI's API for generating code based on user input.
- **File Service**: Manages user input and generated files, allowing for storage, retrieval, and updates.
- **File Search Service**: Facilitates searching through uploaded files using OpenAI's vector stores.

### Dependencies

Below is a summary of the key dependencies used in the backend:

- **Express**: `^4.17.1` - For creating REST APIs.
- **Axios**: `^1.7.2` - HTTP client for making requests to third-party services.
- **OpenAI**: `^4.52.7` - For interacting with the OpenAI API.
- **Cors**: `^2.8.5` - Middleware to enable CORS.
- **Node-Fetch**: `^2.6.1` - Lightweight HTTP client for Node.js.
- **Path**: `^0.12.7` - Utilities for working with file and directory paths.

### Dev Dependencies

- **Dotenv**: `^16.4.5` - For loading environment variables from `.env` files.

### Scripts

- `npm start`: Runs the backend server.

## API Endpoints

The backend exposes several RESTful API endpoints to manage the generation and handling of code, user input, and file searches. Here is a summary of the key endpoints:

- **POST** `/generate-and-save-code`: Generates code based on user input and saves it using the provided structure template.
- **POST** `/update-input`: Updates user input stored on the backend.
- **GET** `/retrieve-files`: Retrieves a list of generated project files.
- **GET** `/get-prompt-text`: Returns the generated prompt text for a given user input.
- **GET** `/get-file/src/:fileName`: Retrieves the content of a specific file in the project.
- **GET** `/get-json/:directory/:fileName`: Retrieves a JSON file from a specified directory.
- **POST** `/file-search/create-vector-store`: Creates a new vector store for file searches.
- **POST** `/file-search/upload`: Uploads files to a specified vector store.
- **POST** `/file-search/update-assistant`: Updates an assistant with a new vector store.
- **POST** `/file-search/query`: Queries files in the vector store using a given assistant.

## Environment Configuration

### Backend `.env` Example

```env
# Backend Environment Configuration
OPENAI_API_KEY=your_openai_api_key
```

Replace the placeholder values with your actual keys and settings.

## Getting Started

To get started with development, you have two options: **Manual Installation** or **Docker Setup**.

### Option 1: Manual Installation

1. **Clone the Repository**

   ```bash
   git clone --branch version-3 --single-branch https://github.com/hhdgknsn/solana-ai-mvp.git
   cd solana-ai-mvp
   ```

2. **Install Dependencies**

   Install both frontend and backend dependencies:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**

   Create an `.env` file in the `backend` directory with the required environment variables.

4. **Run the Project Locally**

   Run both the frontend and backend in separate terminals:

   ```bash
   # Frontend
   cd frontend
   npm start

   # Backend
   cd ../backend
   npm start
   ```

### Option 2: Docker Setup

1. **Ensure Docker is Installed**

   Make sure Docker is installed and running on your machine. Refer to the [official Docker website](https://www.docker.com/products/docker-desktop) for installation instructions.

2. **Build and Run Docker Containers**

   Use Docker Compose to build and run both the frontend and backend containers:

   ```bash
   docker-compose up --build
   ```

   This command will build Docker images for both the backend and frontend, install all necessary dependencies, and start the services.

3. **Access the Application**

   - **Frontend**: Open your browser and navigate to `http://localhost:3000`.
   - **Backend**: The backend API will be running on `http://localhost:8000`.

