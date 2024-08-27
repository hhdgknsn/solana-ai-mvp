# AI-Powered MVP Generator Tool

## Project Structure

```
/project-root
├── /src
│   ├── /ai                   # AI-related files (e.g., prompts.json)
│   ├── /routes               # API route handlers
│   │   ├── endpoints.js      # Main routing file containing all API routes
│   ├── /services             # Core logic and utility functions
│   │   ├── aiService.js      # Manages AI operations: prompt building, code generation
│   │   ├── fileService.js    # Manages file operations: load, save, organize project files
│   │   ├── userService.js    # Handles user-related operations: update and manage user inputs
│   │   ├── microservices.js  # Interacts with microservices for code compilation, deployment, testing
│   │   ├── fileSearchService.js # Manages file search and vector store operations
├── /schemas                  # JSON schema files (e.g., project-template.json)
├── /project                  # Directory for generated project files
│   ├── /src                  # Generated source files (e.g., Rust/Anchor code)
│   ├── /tests                # Generated test files
├── .env                      # Environment variables
├── index.js (or app.js)      # Main server file
```

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

