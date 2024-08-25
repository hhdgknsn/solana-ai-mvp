# AI-Powered Solana MVP Generator

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Code Documentation](#code-documentation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

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
│
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
├── index.js
├── .env
├── Dockerfile
└── package.json
│
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

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- Docker (optional, for containerized deployment)
- A `.env` file with the following environment variable:
  - `OPENAI_API_KEY`: Your OpenAI API key

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/hhdgknsn/solana-ai-mvp
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key
```

4. Start the backend server:

```bash
npm start
```

5. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

6. Start the frontend development server:

```bash
npm start
```

### Docker Setup

1. Build the Docker images for the backend and frontend:

```bash
docker-compose build
```

2. Run the Docker containers:

```bash
docker-compose up
```

## API Endpoints

### Generate Code

- **Endpoint**: `/api/gen-code`
- **Method**: `POST`
- **Description**: Triggers code generation for the Solana MVP using the OpenAI GPT-4 API.
- **Response**:

```json
{
  "message": "Code generated successfully",
  "files": [ "state.rs", "instructions.rs", "errors.rs", "processor.rs", "lib.rs", "utils.rs" ]
}
```

### Retrieve Project Files

- **Endpoint**: `/api/project/files`
- **Method**: `GET`
- **Description**: List all files generated for the project.
- **Response**:

```json
[ "state.rs", "instructions.rs", "errors.rs", "processor.rs", "lib.rs", "utils.rs" ]
```

### Retrieve File Content

- **Endpoint**: `/api/get-file/src/:fileName`
- **Method**: `GET`
- **Description**: Retrieve the content of a specific project file.
- **Response**:

```text
<content of the file>
```

### Retrieve AI Prompt

- **Endpoint**: `/api/get-prompt-text`
- **Method**: `GET`
- **Description**: Retrieve the constructed prompt text used for generating the MVP code.
- **Response**:

```json
{
  "promptText": "<constructed prompt text>"
}
```

### Retrieve JSON File Content

- **Endpoint**: `/api/get-json/:directory/:fileName`
- **Method**: `GET`
- **Description**: Retrieve the contents of a JSON file from a specified directory.
- **Response**:

```
<content of the JSON file>
```

## Code Documentation

### Backend

The backend is responsible for interacting with the OpenAI GPT-4 API, managing user data, and generating Solana Anchor programs based on user inputs. The core functionality includes prompt generation, code generation, and project file management.

#### Key Directories

- **ai/**: Stores AI-related data, including prompt texts and GPT-4 outputs.
- **mvp-design/**: Contains frameworks for storing user input, example MVP designs and schemas.
- **project/**: Stores the generated Solana project files and related schemas.
- **schemas/**: Includes example schemas and frameworks for structuring project files, used to enhance the prompts sent to the model.

#### Main File: `index.js`

- Initializes the backend server.
- Defines API endpoints for generating code, retrieving project files, and more.
- Integrates with the OpenAI API to generate Solana Anchor programs.

### Frontend

The frontend provides a user interface for designing MVPs, generating code, and testing deployments. The application is structured into multiple components and pages, allowing users to create and manage their Solana projects.

#### Key Components

- **Design Components**: Handle the user input forms and drag-and-drop interfaces for defining the MVP structure.
- **Edit Components**: Provide tools for editing generated code, including a code editor and file explorer.
- **Test Components**: Facilitate the deployment and testing of the generated Solana programs.

#### Pages

- **Design**: Interface for specifying the MVP structure.
- **Edit**: Interface for code generation and customization.
- **Test**: Interface for deploying and testing the generated code.
