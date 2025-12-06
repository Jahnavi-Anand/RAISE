
# RAISE Platform – Dev Branch

Welcome to the dev branch for the RAISE startup funding platform. This branch contains current development work for both backend and frontend, plus DevOps configuration for smooth local builds, testing, and deployments.

***

## Table of Contents

- Project Overview
- Frontend Structure
- DevOps & CI/CD
- Local Setup
- Environment Variables
- Testing
- Contribution Guide

***

## Project Overview

RAISE is a modern platform for discovering, filtering, and investing in verified startups. Built for high reliability, transparency, and speed using Node.js, Express, EJS, and SCSS.

***

## Frontend Structure

- **Tech Stack**:  
  - Node.js  
  - Express  
  - EJS Templating  
  - SCSS for styling  
  - Vanilla JS for SPA behaviors & filtering  
- **Directory Layout**:  
  - `/public/` (static assets: images, JS, CSS)  
  - `/views/` (EJS templates: login, signup, landing, startup)  
  - `/routes/` (Express routes if split out)
- **Main Components**:  
  - Hero and Section overlays with blurred backgrounds (SCSS)
  - SPA toggle forms and filtering (Investor/Entrepreneur views, startup filters)
  - Responsive single-column card layouts
  - Form validations and custom controls (multi-select, progress, etc.)

***

## DevOps & CI/CD

- **CI/CD Pipeline**:  
  - Integrated using GitHub Actions (or your chosen runner)
  - Runs on push/pull-request to dev branch
- **SonarQube**:  
  - Code quality and coverage via SonarQube scanner
  - Example for SonarQube config:
    ```bash
    sonar-scanner \
      -Dsonar.projectKey=raise-dev \
      -Dsonar.sources=. \
      -Dsonar.host.url=http://localhost:9000 \
      -Dsonar.login=YOUR_TOKEN
    ```
- **Deployment**:  
  - Standard deployment via Docker Compose, Heroku, or Vercel supported  
  - See `/docker/` for example setup (if available)
- **Linting**:  
  - ESLint for JS, Stylelint for SCSS (preset configs included)

***

## Local Setup

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start server:
    ```bash
    npm start
    ```
3. Access via [http://localhost:4000](http://localhost:4000)

***

## Environment Variables

Copy `.env.example` to `.env` with your config:

```
MONGO_URI=mongodb://localhost:27017/raise
PORT=4000
SONAR_TOKEN=your-token
```

***

## Testing

- **Unit & Integration**:  
  Use Jest/Mocha for backend, plus Cypress/Playwright for UI (if configured).
- **Manual Testing**:  
  - Verify login/logout, signup, and card filtering
  - Check form validation and SPA component state

***

## Contribution Guide

- Please branch off `dev` for new features
- PRs require passing lint and Sonar checks  
- Frontend must be fully responsive and match Figma design
- All code must be commented and follow repo conventions

***

For further questions, raise an issue or contact the maintainers.

***

**This README is ready for your GitHub branch and summarizes both DevOps and frontend structure professionally**.Here’s a clear, professional `README.md` you can use for your GitHub branch:[1][2]

***

# RAISE Platform – Dev Branch

This branch contains active development for the RAISE startup investment platform, including DevOps automation and frontend source code.

***

## Table of Contents

- Project Overview
- Frontend Overview
- DevOps Setup
- Local Development & Environment
- Testing & Quality
- Contributing

***

## Project Overview

RAISE helps discover, filter, and invest in registered, verified startups. The stack is Node.js + Express with EJS templating and SCSS for responsive frontend design.

***

## Frontend Overview

- Tech: Node.js, Express, EJS, SCSS/CSS, Vanilla JS
- Structure:
  - `views/`: EJS templates (`login`, `signup`, `startup`, `landing`, etc.)
  - `public/`: Static assets (JS, CSS, images like blurred backgrounds)
  - Custom scripts for form handling, SPA filter panels, progress bars, and card layouts.
- Responsive layouts: Startup cards in single-column rows, filters as a fixed left panel.
- UI features: Blurred hero overlays, branded button toggles, smooth validation.

***

## DevOps Setup

- **CI/CD**: Integrated with GitHub Actions (or applicable runner).
  - Lint, test, and build are triggered on new pushes and PRs to this branch.
- **SonarQube**: Configured for code quality scanning.
  - Example scanner usage:
    ```bash
    sonar-scanner -Dsonar.projectKey=raise-dev -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=YOUR_TOKEN
    ```
- **Deployment**: Docker Compose and Heroku supported. `docker/` and deployment scripts may be configured if present.
- **Style checks**: ESLint for JS, Stylelint for SCSS.

***

## Local Development & Environment

1. Clone, then install:
    ```bash
    npm install
    ```
2. Run the dev server:
    ```bash
    npm start
    ```
3. Visit [http://localhost:4000](http://localhost:4000)

Set env variables by copying `.env.example` to `.env`:
```
MONGO_URI=mongodb://localhost:27017/raise
PORT=4000
SONAR_TOKEN=your-token
```

***

## Testing & Quality

- Manual: Use browser for UI/UX, card filtering, form DSLs.
- Automated: Add tests in `test/`, integrate with Jest or Mocha as preferred.
- SonarQube: Automatic scan on push for static analysis and coverage.

***

## Contributing

- Branch from `dev` for features/fixes.
- Pass lint & sonar checks before PR.
- UI should be fully responsive and follow design guidelines.
- Add code comments and keep to project conventions.

***

For any issues, open a GitHub issue or reach out to maintainers.

***
