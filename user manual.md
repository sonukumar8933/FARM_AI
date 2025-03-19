# New System Setup Manual

## 1. System Requirements
Before starting, ensure your system meets the following requirements:
- **RAM**: Minimum 4GB (8GB recommended for smoother performance)
- **Processor**: 64-bit processor
- **Disk Space**: At least 20GB of free space
- **Internet Connection**: Required for downloading software and updates

## 2. Basic Development Environment Setup

### 2.1. Install Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.

1. **Download Node.js**:
   - Visit [Node.js official website](https://nodejs.org/).
   - Download the LTS (Long Term Support) version for your operating system.

2. **Install Node.js**:
   - Follow the installation instructions for your OS.
   - Ensure that the installer adds Node.js to your system PATH.

3. **Verify Installation**:
   - Open a terminal or command prompt.
   - Run the following commands to check the installation:
     ```bash
     node --version
     npm --version
     ```

### 2.2. Install Git
Git is a version control system that lets you manage and keep track of your source code history.

1. **Download Git**:
   - For Windows: Download from [Git for Windows](https://git-scm.com/).
   - For Mac: Use Homebrew with the command `brew install git`.
   - For Ubuntu/Debian: Use the command `sudo apt-get install git`.

2. **Verify Installation**:
   - Open a terminal or command prompt.
   - Run the following command:
     ```bash
     git --version
     ```

## 3. Essential Development Tools

### 3.1. Code Editor
A code editor is essential for writing and editing your code. Visual Studio Code (VS Code) is a popular choice.

1. **Install Visual Studio Code**:
   - Download from [Visual Studio Code](https://code.visualstudio.com/).
   - Follow the installation instructions for your OS.

2. **Recommended Extensions**:
   - **ESLint**: For identifying and fixing problems in your JavaScript code.
   - **Prettier**: For code formatting.
   - **GitLens**: Enhances the built-in Git capabilities.
   - **Live Server**: Launch a local development server with live reload.

### 3.2. Package Manager
Yarn is an alternative to npm, providing faster and more reliable package management.

1. **Install Yarn**:
   - Run the following command:
     ```bash
     npm install -g yarn
     ```

## 4. Project Setup

### 4.1. Create a New Project
Setting up a new project involves creating a directory and initializing it with Node.js and Git.

1. **Create a New Directory**:
   - Open a terminal or command prompt.
   - Run the following commands:
     ```bash
     mkdir my-project
     cd my-project
     ```

2. **Initialize a Node.js Project**:
   - Run the following command to create a `package.json` file:
     ```bash
     npm init -y
     ```

3. **Initialize a Git Repository**:
   - Run the following command to start version control:
     ```bash
     git init
     ```

### 4.2. Essential Dependencies
Install necessary packages for development and production.

1. **Development Dependencies**:
   - TypeScript: Adds static typing to JavaScript.
   - Jest: A testing framework.
   - ESLint: A tool for identifying and fixing code issues.
   - Prettier: A code formatter.
   - Nodemon: Automatically restarts the node application when file changes are detected.

   ```bash
   npm install --save-dev @types/node typescript
   npm install --save-dev jest @types/jest
   npm install --save-dev eslint prettier
   npm install --save-dev nodemon
   ```

2. **Common Production Dependencies**:
   - Express: A web application framework for Node.js.
   - Dotenv: Loads environment variables from a `.env` file.
   - Axios: A promise-based HTTP client.
   - Mongoose: An ODM (Object Data Modeling) library for MongoDB.

   ```bash
   npm install express
   npm install dotenv
   npm install axios
   npm install mongoose
   ```

## 5. Configuration Files

### 5.1. TypeScript Configuration
TypeScript requires a configuration file to specify compiler options.

1. **Create `tsconfig.json`**:
   - Add the following content:
     ```json
     {
       "compilerOptions": {
         "target": "es6",
         "module": "commonjs",
         "outDir": "./dist",
         "rootDir": "./src",
         "strict": true,
         "esModuleInterop": true,
         "skipLibCheck": true,
         "forceConsistentCasingInFileNames": true
       },
       "include": ["src/**/*"],
       "exclude": ["node_modules", "**/*.spec.ts"]
     }
     ```

### 5.2. ESLint Configuration
ESLint helps maintain code quality and consistency.

1. **Create `.eslintrc.json`**:
   - Add the following content:
     ```json
     {
       "env": {
         "node": true,
         "es2021": true
       },
       "extends": [
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended"
       ],
       "parser": "@typescript-eslint/parser",
       "parserOptions": {
         "ecmaVersion": 12,
         "sourceType": "module"
       }
     }
     ```

### 5.3. Git Configuration
A `.gitignore` file specifies files and directories that should be ignored by Git.

1. **Create `.gitignore`**:
   - Add the following content:
     ```plaintext
     node_modules/
     dist/
     .env
     *.log
     coverage/
     ```

## 6. Project Structure
Organize your project files and directories for better maintainability.

1. **Create the Following Directory Structure**:
   ```plaintext
   my-project/
   ├── src/
   │   ├── controllers/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   └── index.ts
   ├── tests/
   ├── dist/
   ├── package.json
   ├── tsconfig.json
   ├── .eslintrc.json
   ├── .gitignore
   └── README.md
   ```

## 7. Scripts in package.json
Scripts automate common tasks like building, testing, and running the project.

1. **Add These Scripts to Your `package.json`**:
   ```json
   {
     "scripts": {
       "start": "node dist/index.js",
       "dev": "nodemon src/index.ts",
       "build": "tsc",
       "test": "jest",
       "lint": "eslint . --ext .ts",
       "format": "prettier --write \"src/**/*.ts\""
     }
   }
   ```

## 8. Running the Project
Learn how to run and test your project.

1. **Install Dependencies**:
   - Run the following command:
     ```bash
     npm install
     ```

2. **Run in Development Mode**:
   - Use Nodemon to automatically restart the server on file changes:
     ```bash
     npm run dev
     ```

3. **Build the Project**:
   - Compile TypeScript to JavaScript:
     ```bash
     npm run build
     ```

4. **Run Tests**:
   - Execute tests using Jest:
     ```bash
     npm test
     ```

5. **Run Linting**:
   - Check for code issues with ESLint:
     ```bash
     npm run lint
     ```

## 9. Version Control
Manage your code changes with Git.

1. **Add Files to Git**:
   - Stage changes for commit:
     ```bash
     git add .
     ```

2. **Commit Changes**:
   - Save changes to the repository:
     ```bash
     git commit -m "Initial setup"
     ```

3. **Add Remote Repository**:
   - If using GitHub, add the remote URL:
     ```bash
     git remote add origin <repository-url>
     ```

4. **Push Changes**:
   - Upload changes to the remote repository:
     ```bash
     git push -u origin main
     ```

## 10. Additional Recommendations

### 10.1. Environment Variables
Store sensitive data and configuration settings in a `.env` file.

1. **Create `.env` File**:
   - Add the following content:
     ```plaintext
     PORT=3000
     NODE_ENV=development
     DATABASE_URL=mongodb://localhost:27017/mydb
     ```

### 10.2. Documentation
Maintain clear and comprehensive documentation for your project.

1. **Create a README.md File**:
   - Include project description, setup instructions, and API documentation.

2. **Document API Endpoints**:
   - Provide details on available endpoints, request/response formats, and examples.

3. **List Environment Variables**:
   - Document all required environment variables and their purposes.

### 10.3. Security Best Practices
Ensure your application is secure and protected against common vulnerabilities.

1. **Keep Dependencies Updated**:
   - Regularly update packages to their latest versions.

2. **Use Environment Variables for Sensitive Data**:
   - Avoid hardcoding sensitive information in your codebase.

3. **Implement Proper Error Handling**:
   - Use try-catch blocks and error middleware to handle exceptions gracefully.

4. **Use Security Middleware**:
   - Implement middleware like Helmet and CORS to enhance security.

## 11. Troubleshooting
Common issues and solutions during development.

1. **Check Node.js and npm Versions**:
   - Ensure you are using compatible versions of Node.js and npm.

2. **Clear npm Cache if Needed**:
   - Run the following command to clear the cache:
     ```bash
     npm cache clean --force
     ```

3. **Reinstall Dependencies**:
   - Delete `node_modules` and `package-lock.json`, then run:
     ```bash
     npm install
     ```

4. **Check for Port Conflicts**:
   - Ensure no other applications are using the same port as your server.

This detailed manual should provide a comprehensive guide for setting up and managing a new development environment. Adjust the instructions as needed to fit your specific project requirements. If you have any further questions or need additional details, feel free to ask!
