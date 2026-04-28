# AI Avatar Portfolio Assistant (Backend)

A Node.js backend service that processes user input and returns structured responses for the AI Avatar Portfolio application.

---

## Features

* REST API for chat interaction
* Intent-based response handling
* Structured JSON responses for UI rendering
* Project data management
* Seamless frontend integration

---

## Tech Stack

* Node.js
* Express.js
* JavaScript

---

## Project Structure

```bash
backend/
 ├── data/
 │    ├── projectsData.js
 │    ├── resumeData.js
 │
 ├── routes/
 │    ├── ask.js
 │
 ├── server.js
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/9940-pg/ai-avatar-backend.git
cd ai-avatar-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

---

## API Endpoint

### POST /ask

#### Request

```json
{
  "message": "Show me your projects"
}
```

#### Response

```json
{
  "reply": {
    "type": "projects",
    "message": "Here are my projects:",
    "data": [...]
  }
}
```

---

## How It Works

* Receives user message
* Determines intent based on input
* Returns:

  * Plain text response, or
  * Structured object (e.g., projects, details)

---

## Data Format

Project objects include:

* Title
* Description
* Tech stack
* Live link
* GitHub link
* Image

---

## Notes

* Uses static data (no database)
* No authentication implemented
* Designed for frontend consumption

---

## Future Improvements

* AI-based intent detection
* Resume parsing
* Database integration
* User-specific data handling
* Authentication

---

## Author

Priyanka
Full Stack Developer

---

## License

This project is open-source and available for use under standard terms.
