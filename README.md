# AI-Powered Solana MVP Generator

## Project Overview

This project is a basic proof of concept implementation of the proposed AI-powered tool designed to streamline the development of Minimum Viable Products (MVPs) on the Solana blockchain. The tool generates both on-chain Solana smart contract code and front-end code based on user prompts, significantly reducing the time and effort required to build functional MVPs. The tool is outlined here: https://earn.superteam.fun/listings/bounty/solana-superteam-uk-bounty-ai-powered-solana-mvp-generator/

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
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.html
├── docker-compose.yml
├── .gitignore
├── README.md
```


## Getting Started

### Ensure you have the following installed:
Docker Desktop
Node.js
NPM
Python 3.8
Solana CLI
Anchor CLI
Rust (on WSL Ubuntu if using Windows)

### Clone the repository:
git clone https://github.com/yourusername/solana-ai-mvp.git
cd solana-ai-mvp

### Build and run the Docker containers:
docker-compose up --build

### Start the services:
docker-compose up

### Access the frontend:
Open your browser and navigate to http://localhost:3000.