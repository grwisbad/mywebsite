# Cloudflare Pages and Workers App

This project is a demonstration of deploying a static website using Cloudflare Pages, enhanced with Cloudflare Workers for API functionality and optional D1 database support. The application showcases the integration of serverless computing and edge functions to create a dynamic web experience.

## Project Structure

- **public/**: Contains the static assets for the website.
  - **index.html**: The main HTML document serving as the entry point for users.
  - **styles.css**: CSS styles defining the layout and appearance of the website.
  - **main.js**: Client-side JavaScript for interacting with HTML elements and making API calls.

- **worker/**: Contains the Cloudflare Worker scripts and database schema.
  - **index.js**: The Cloudflare Worker script that sets up API endpoints and handles requests.
  - **d1-schema.sql**: SQL schema for the Cloudflare D1 database, defining tables and relationships.

- **research.md**: Contains summaries answering research questions related to Cloudflare Workers, D1, API calls, and edge deployment benefits.

- **README.md**: This documentation file.

- **package.json**: Configuration file for npm, listing project dependencies and scripts.

## Features

- **API Functionality**: The Cloudflare Worker provides RESTful API endpoints that can be called from the front end.
- **Dynamic Data Handling**: Optionally integrates with Cloudflare D1 for persistent data storage.
- **Client-Server Interaction**: Demonstrates how data flows between client-side JavaScript and edge functions.

## Getting Started

To run and test the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd cloudflare-pages-workers-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.