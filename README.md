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
Test