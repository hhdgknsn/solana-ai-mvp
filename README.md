# AI-Powered MVP Generator Tool

## Project Structure

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

## Backend Overview

The backend is currently modularized into distinct services to handle AI operations, file management, user interactions, and microservice communication. The core functionalities are organized as follows:

- **`aiService.js`**: Manages AI-related tasks, such as building prompts and interacting with the OpenAI API for code generation.
- **`fileService.js`**: Handles file operations, including loading user inputs, saving generated files, and organizing project directories.
- **`userService.js`**: Manages user data, including updating and storing user inputs.
- **`fileSearchService.js`**: Manages file search operations and vector store interactions.
- **`project-template.json`**: Defines the structure for saving generated files within the project.

## Frontend Overview

The frontend provides a user interface for designing MVPs, generating code, and testing deployments. The application is structured into multiple components and pages, allowing users to create and manage their Solana projects.

### Key Components

- **Design Components**: Handle the user input forms and drag-and-drop interfaces for defining the MVP structure.
- **Edit Components**: Provide tools for editing generated code, including a code editor and file explorer.
- **Test Components**: Facilitate the deployment and testing of the generated Solana programs.

### Pages

- **Design**: Interface for specifying the MVP structure.
- **Edit**: Interface for code generation and customization.
- **Test**: Interface for deploying and testing the generated code.

## API Endpoints

### **Code Generation and Management**
- **POST `/generate-and-save-code`**: Generates and saves code based on user input.
- **POST `/update-input`**: Updates the user's input data.
- **GET `/retrieve-files`**: Retrieves a list of generated files.
- **GET `/get-prompt-text`**: Returns the AI prompt for debugging or informational purposes.
- **GET `/get-file/src/:fileName`**: Retrieves the content of a specific file from the project directory.
- **GET `/get-json/:directory/:fileName`**: Retrieves the content of a specified JSON file.

### **File Search and Vector Store**
- **POST `/file-search/create-vector-store`**: Creates a new vector store for managing file embeddings.
- **POST `/file-search/upload`**: Uploads files to the vector store.
- **POST `/file-search/update-assistant`**: Updates the assistant with the vector store data.
- **POST `/file-search/query`**: Queries the vector store for relevant files based on user input.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-mvp-generator.git
   ```
2. Install dependencies:
   ```bash
   cd ai-mvp-generator
   npm install
   ```
3. Create a `.env` file and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   ```
4. Start the server:
   ```bash
   npm start
   ```
