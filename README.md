# API Automation Framework - Bookstore API

## Project Overview
This project is an API automation framework for a FastAPI-based Bookstore application.  
It validates all major functionalities of the API, including CRUD operations, authentication, and error handling.  
The framework is implemented in **TypeScript** using **Playwright** for API testing.

---

## Features
- Full CRUD test coverage for `/books` endpoints
- Positive and negative test scenarios
- JWT authentication (signup/login)
- Request chaining (token reuse)
- JSON schema validation using **AJV**
- Configurable environment via `dev.ts`
- Detailed HTML and Allure reports
- CI/CD ready with GitHub Actions

---

## Project Structure
```
.
├── env/
│ └── dev.ts # Environment configuration
├── src/
│ ├── client/
│ │ ├── auth.ts # Signup & login functions
│ │ └── books.ts # CRUD operations
│ ├── schemas/
│ │ └── book.schema.json # JSON schema for book response
│ └── utils/
│ └── schema.ts # AJV schema validation
├── tests/
│ ├── auth.spec.ts # Auth test
│ ├── health.spec.ts # Health endpoint test
│ └── books/
│ ├── books.create.spec.ts
│ ├── books.get.spec.ts
│ ├── books.update.spec.ts
│ ├── books.delete.spec.ts
│ ├── books.list.spec.ts
│ └── books.negative.spec.ts
├── playwright.config.ts # Playwright configuration
├── playwright.yml # CI/CD workflow for GitHub Actions
├── tsconfig.json # TypeScript configuration
└── package.json # Dependencies
```

---

## Installation

1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd <REPO_FOLDER>
```
Install dependencies:
```
npm install
```
Install Playwright browsers:
```
npx playwright install
```
---
## Running Tests

1. Run all tests:
```
npx playwright test
```
2.Run a specific test file:
```
npx playwright test tests/books/books.create.spec.ts
```
3.View HTML report after execution:
```
npx playwright show-report
```
---
## Testing Strategy
  ## Authentication

  -auth.spec.ts: Validates signup and login endpoints.

  -JWT token generation is verified.

## Books Endpoints
## Positive Tests

  -books.create.spec.ts: Create a book and validate response schema.

  -books.get.spec.ts: Retrieve a book by ID.

  -books.update.spec.ts: Update book details and validate status.

  -books.delete.spec.ts: Delete a book successfully.

  -books.list.spec.ts: List all books and validate array schema.

## Negative Tests

  books.negative.spec.ts:

  -Unauthorized access (403)

  -Invalid payloads (400/422)

  -Non-existent resources (404)

## Health Check

  -health.spec.ts: Validates /health endpoint returns "up".

## Request Chaining

  -JWT token obtained during login is used for all protected endpoints.

  -Ensures proper sequence of dependent API calls.

## Schema Validation

  -AJV is used to validate response payloads against predefined JSON schemas.

## CI/CD Integration

  ## GitHub Actions workflow (playwright.yml) automatically runs tests on:

  -Every push or pull request

  -Multiple OS environments (Windows, Mac, Linux)

  -Generates HTML and Allure reports.

## Sample Test Report

## After running npx playwright test and opening the report:

  -All positive and negative tests pass

  -CRUD operations verified with correct status codes

  -Response payloads validated against JSON schemas

## Notes

  -Experimental warning for JSON imports may appear. Not critical.

  -All environment-specific data is configurable in env/dev.ts.

  -Framework is modular, maintainable, and scalable for future endpoints.

