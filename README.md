##

Here’s a simple README structure that guides users on how to build your project locally with Express.js and Next.js:

---

# Project Name

This project consists of two main parts:
- **API**: An Express.js server located in the `api` folder.
- **Client**: A Next.js frontend located in the `client/my-app` folder.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js) or install Nodemon for convinience

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Dikachitheman/JECE.git
cd your-repo
```

### 2. Setup the API

Navigate to the `api` folder and install dependencies:
```bash
cd api
npm install
```
### 2.1 There are no .env files, it's one of the things I left out because of time. All the config variables are in the .js files

#### 2.2 Run the API
Start the Express.js server:
```bash
npm run dev
```
The API should now be running at `http://localhost:5000`.

### 3. Setup the Client

Navigate to the `client` folder and install dependencies:
```bash
cd ../client
npm install
```

#### 3.1 No .env file, config variables are used directly

#### 3.2 Run the Client
Start the Next.js application:
```bash
npm run dev
```
The Next.js client should now be running at `http://localhost:3000`.

## Development Workflow

- **API Development**: Modify the files in the `api` folder and restart the Express server if necessary.
- **Client Development**: Modify the files in the `client/my-app` folder, and the Next.js app will automatically reload.

## License

[MIT](LICENSE)

---
