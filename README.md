# AI-Powered Solana MVP Generator

## Overview

This repository contains both the backend and frontend code for the POC of the AI-powered Solana MVP generator, which provide API endpoints to interact with the MVP (Minimum Viable Product) data and integrate with the OpenAI GPT-4 API for generating Solana Anchor programs.

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
│   ├── index.js
│   ├── mvp-example.json
│   └── mvp-info.json
├── Dockerfile
└── package.json
frontend/
├── public/
│   └── index.html
└── src/
    ├── pages/
    │   ├── accountdesign/
    │   │   ├── components/
    │   │   │   ├── FunctionsForm.js
    │   │   │   ├── GeneralForm.js
    │   │   │   ├── OverallForm.js
    │   │   │   ├── ProgramAccountsForm.js
    │   │   │   └── UserAccountsForm.js
    │   ├── AccountDesign.js
    │   ├── DevnetPlayground.js
    │   └── styles/
    │       ├── AccountDesign.css
    │       ├── OverallForm.css
    │       └── index.css
├── Dockerfile
└── package.json
docker-compose.yml
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- Docker (optional, for containerized deployment)
- .env file with the following environment variables:
  - `OPENAI_API_KEY`: Your OpenAI API key

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mytoken.git
cd mytoken
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
node src/index.js
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

### Save MVP Info

- **Endpoint**: `/api/save`
- **Method**: `POST`
- **Description**: Save the MVP info.
- **Request Body**:

```json
{
  "general": { ... },
  "account_design": { ... },
  "functions": [ ... ],
  ...
}
```

- **Response**:

```json
{
  "message": "MVP info saved successfully",
  "info": { ... }
}
```

### Update Specific Field

- **Endpoint**: `/api/update-field`
- **Method**: `POST`
- **Description**: Update a specific field in the MVP info.
- **Request Body**:

```json
{
  "section": "general",
  "field": "project_name",
  "value": "New Project Name"
}
```

- **Response**:

```json
{
  "message": "Field updated successfully",
  "info": { ... }
}
```

### Get MVP Info

- **Endpoint**: `/api/get-mvp-info`
- **Method**: `GET`
- **Description**: Retrieve the MVP info.
- **Response**:

```json
{ ... }
```

### Get MVP Example

- **Endpoint**: `/api/get-mvp-example`
- **Method**: `GET`
- **Description**: Retrieve the MVP example.
- **Response**:

```json
{ ... }
```

### Get Prompt Text

- **Endpoint**: `/api/get-prompt-text`
- **Method**: `GET`
- **Description**: Retrieve the constructed initial prompt text for GPT-4 API.
- **Response**:

```json
{
  "promptText": "Constructed prompt text"
}
```

### Get GPT-4 Output

- **Endpoint**: `/api/get-gpt4-output`
- **Method**: `POST`
- **Description**: Generate and retrieve the GPT-4 output based on the MVP example.
- **Response**:

```json
{
  "gpt4Output": "Generated Solana Anchor program code"
}
```

### Get Saved GPT-4 Output

- **Endpoint**: `/api/get-saved-output`
- **Method**: `GET`
- **Description**: Retrieve the saved GPT-4 output.
- **Response**:

```json
{
  "gpt4Output": "Previously saved GPT-4 output"
}
```

## Code Documentation

### Backend

The backend code is located in the `backend` directory. The `index.js` file is the main entry point for the backend server. It initializes the server, sets up middleware, and defines various API endpoints.

#### Modules and Dependencies

- **express**: Web framework for Node.js
- **cors**: Middleware to enable CORS
- **fs/promises**: File system module with promises
- **path**: Utility module for file paths
- **axios**: HTTP client for making API requests
- **dotenv**: Module to load environment variables from a `.env` file

#### Environment Setup

Load environment variables and set up the Express application:

```javascript
dotenv.config();
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
```

#### File Paths

Define paths for the JSON files used to store MVP information:

```javascript
const mvpInfoFilePath = path.join(__dirname, 'mvp-info.json');
const mvpExampleFilePath = path.join(__dirname, 'mvp-example.json');
const gpt4OutputPath = path.join(__dirname, 'gpt4_output.json');
```

#### Initialization

Ensure required directories and files exist:

```javascript
async function initialize() {
  await ensureDirectoryExists(path.dirname(mvpInfoFilePath));
  const initialData = { ... };
  await ensureFileExistsWithContent(mvpInfoFilePath, initialData);
  await ensureFileExists(gpt4OutputPath);
}
initialize().catch(err => console.error('Initialization error:', err));
```

#### API Endpoints

Define various API endpoints for saving, updating, and retrieving MVP information and generating GPT-4 outputs.

#### GPT-4 API Integration

Function to call the GPT-4 API with a constructed prompt:

```javascript
async function callGpt4Api(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    { model: 'gpt-4', messages: [{ role: 'user', content: prompt }], temperature: 0.7 },
    { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } }
  );
  return response.data.choices[0].message.content.trim();
}
```

### Frontend

The frontend code is located in the `frontend` directory. It consists of React components that allow users to input and manage the MVP data.

#### `public/index.html`

The main HTML file for the frontend, setting up the React application.

#### `src/pages/accountdesign/components/FunctionsForm.js`

A component for managing functions in the MVP data.

#### `src/pages/accountdesign/components/GeneralForm.js`

A component for managing general information in the MVP data.

#### `src/pages/accountdesign/components/OverallForm.js`

A component that integrates all individual forms.

#### `src/pages/accountdesign/components/ProgramAccountsForm.js`

A component for managing program accounts in the MVP data.

#### `src/pages/accountdesign/components/UserAccountsForm.js`

A component for managing user accounts in the MVP data.

#### `src/pages/accountdesign/AccountDesign.js`

A main component for the Account Design page, including form handling and data fetching.

#### `src/pages/DevnetPlayground.js`

A component for the Devnet Playground page, allowing users to generate code using GPT-4 based on the MVP specifications.

#### `src/App.js`

The main application component, setting up routing and navigation.

#### Styles

CSS files for styling the application, including `App.css`, `index.css`, and component-specific styles.

## Contributing

Please feel free to submit issues and pull requests for any features or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
