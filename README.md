# api_phoenix

## Description

api_phoenix is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing assets, projects, and tasks.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Punycode

This project uses the `punycode` library for handling internationalized domain names (IDNs). Punycode is a character encoding scheme that allows Unicode characters to be represented using ASCII characters. This is important for ensuring that domain names with non-ASCII characters can be used in systems that only support ASCII.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Monnyka/api_phoenix.git
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Git Command

1. Create Feature Branch

   ```bash
   git switch -c featureOne
   ```

2. Switch to master branch

   ```
   git switch master
   ```

3. Merge to master branch

   ```
   git merge featureOne
   ```

## Usage

1.  Start the server:

    ```bash
    npm start
    ```

2.  The API will be running on port 3000.

## API Endpoints

- `GET /api/v1/assets` - Get all assets
- `POST /api/v1/assets` - Create a new asset
- `GET /api/v1/assets/:id` - Get a single asset
- `PATCH /api/v1/assets/:id` - Update an asset
- `DELETE /api/v1/assets/:id` - Delete an asset
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create a new project
- `GET /api/v1/projects/:id` - Get a single project
- `PATCH /api/v1/projects/:id` - Update a project
- `DELETE /api/v1/projects/:id` - Delete a project
- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/:id` - Get a single task
- `PATCH /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
