# AI-Powered Solana MVP Generator

## Project Overview

This project is an AI-powered tool designed to streamline the development of Minimum Viable Products (MVPs) on the Solana blockchain. The tool generates both on-chain Solana smart contract code and front-end code based on user prompts, significantly reducing the time and effort required to build functional MVPs.

## Directory Structure

```plaintext
solana-ai-mvp/
├── ai_model/
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── public/
│           └── index.html
├── docker-compose.yml
├── .gitignore
├── README.md
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Docker Desktop
- Node.js
- Python 3.8
- Flask
- Solana CLI
- Anchor CLI
- Rust (on WSL Ubuntu if using Windows)

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/solana-ai-mvp.git
   cd solana-ai-mvp
   ```

2. **Build and run the Docker containers:**

   ```sh
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`
   - AI Model: `http://localhost:5000`

## Documentation

### AI Model Service

#### Description
The AI Model service uses a pre-trained model to generate code based on user prompts. It is built using Flask and the Transformers library.

#### Files
- **app.py**: Flask application that handles POST requests to generate code.
- **Dockerfile**: Docker configuration for building the AI Model service.
- **requirements.txt**: Python dependencies required for the AI Model service.

#### Endpoints
- **POST /generate**: Accepts a JSON object with a prompt and returns generated code.

### Backend Service

#### Description
The Backend service acts as an intermediary between the frontend and the AI model service. It is built using Node.js and Express.

#### Files
- **index.js**: Main application file that sets up Express server and routes.
- **Dockerfile**: Docker configuration for building the Backend service.
- **package.json**: Node.js dependencies and scripts.

#### Endpoints
- **POST /api/generate**: Forwards the prompt to the AI model service and returns the generated code.

### Frontend Service

#### Description
The Frontend service provides the user interface for inputting prompts and displaying generated code. It is built using React.

#### Files
- **src/App.js**: Main React component that handles user interactions and displays generated code.
- **src/App.css**: CSS file for styling the frontend application.
- **src/index.js**: Entry point for the React application.
- **public/index.html**: HTML template for the React application.
- **Dockerfile**: Docker configuration for building the Frontend service.
- **package.json**: React dependencies and scripts.

### Docker Compose

#### Description
Docker Compose is used to manage the multi-container application, including the AI model, backend, and frontend services.

#### File
- **docker-compose.yml**: Configuration file to set up and link the three services.
