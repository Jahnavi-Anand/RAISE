# RAISE – Gen‑Z Startup Investment Platform

RAISE is a digital investment and crowdfunding platform connecting Gen‑Z founders with investors.[file:12]  
It supports compliant equity and revenue‑sharing deals using standard legal templates (no AI‑generated documents), with a full frontend, backend, and DevOps/CI‑CD setup on the **main** branch.[file:12]  

---

## 🧭 Table of Contents

- Project Overview  
- Architecture  
- Tech Stack  
- Frontend  
- Backend & Authentication  
- DevOps & CI/CD (Jenkins)  
- Docker (Local Setup)  
- Environment Variables  
- Testing & Quality  
- Contributing  
- License  

---

## 🌐 Project Overview

RAISE helps discover, filter, and invest in verified startups while giving investors a transparent, data‑driven view of opportunities.[file:12]  
The platform combines the openness of crowdfunding with the structure of institutional investing, but relies on curated templates rather than AI to generate any legal documents, aligning with current Indian regulations.[file:12]  

Core capabilities:

- Startup discovery and filtering by sector, stage, and city.  
- Verified profiles for startups and investors with KYC/AML workflows.[file:12]  
- Deal‑flow support: pitch sharing, document exchange, standard term‑sheet templates, and funding progress tracking.[file:12]  

---

## 🏗 Architecture

High‑level components:

- **Client layer:** React + EJS views served via Node.js/Express.  
- **API layer:** REST APIs with JWT‑based authentication and role‑based authorization.  
- **Data layer:** PostgreSQL database accessed via Prisma ORM.[file:12]  
- **Infrastructure:** Dockerized services deployed on AWS EKS; infrastructure managed via Terraform and Ansible; monitoring with Prometheus and Grafana.[file:12]  

Suggested repo layout:

- `frontend/` – React app, EJS templates, SCSS, static assets  
- `backend/` – Express server, routes, controllers, Prisma schema, tests  
- `infra/` – Terraform & Ansible scripts for AWS (VPC, RDS, EKS)  
- `jenkins/` – Jenkinsfile(s) and shared library configuration  
- `k8s/` – Kubernetes manifests / Helm charts  

---

## 💻 Tech Stack

### Frontend

- React  
- EJS (server‑rendered pages)  
- SCSS → CSS build pipeline[file:12]  

### Backend

- Node.js / Express  
- PostgreSQL  
- Prisma ORM  
- JSON Web Tokens (JWT) for authentication[file:12]  

### DevOps / CI‑CD

- Docker  
- Jenkins  
- SonarQube  
- JFrog Artifactory  
- Terraform  
- Ansible  
- AWS EKS (Kubernetes)  
- Prometheus + Grafana[file:12]  

---

## 🎨 Frontend

### Features

- Landing and information/FAQ pages describing the Raise portal for startups and investors.[file:12]  
- Startup listing page with filters for **sector**, **stage**, and **city**, implemented in client‑side JavaScript.  
- Shared header/footer partials and consistent theming using the Raise color palette and Poppins font.[file:12]  

### Structure

- `frontend/src/` – React components and pages (if applicable)  
- `views/` – EJS templates for routes such as `/`, `/startup`, `/login`, `/signup`, `/info`  
- `public/css/` – Compiled CSS from SCSS  
- `public/js/` – Client‑side scripts (filters, accordions, SPA‑like behavior)  
- `public/img/` – Logos and illustrations  

### Local Development

cd frontend
npm install
npm run dev # or npm start / your dev script


The frontend expects the backend API at `http://localhost:4000` (configurable via environment variables).

---

## 🧩 Backend & Authentication

### Responsibilities

- REST APIs for:
  - User registration and login (founders, investors, admins).  
  - Startup CRUD, listing, and filtered search.  
  - Basic deal‑flow operations (e.g., expressing interest, viewing funding progress).  
- JWT‑based authentication:
  - Issue token on successful login.  
  - Middleware to protect authenticated and role‑specific routes.  
- Data layer:
  - Prisma schema & migrations for users, startups, investments, and audit logs.[file:12]  

### Local Development

cd backend
cp .env.example .env # set DATABASE_URL, JWT_SECRET, etc.
npm install
npx prisma migrate dev
npm run dev


Backend runs at: `http://localhost:4000`.

---

## 🚀 DevOps & CI/CD (Jenkins)

The **main** branch is wired to a Jenkins CI/CD pipeline that builds, tests, scans, and deploys the application.[file:12]  

### Pipeline Stages

1. **Checkout & Install**  
   - Clone repository  
   - Install dependencies for frontend and backend  

2. **Static Analysis & Tests**  
   - Run unit tests (backend and frontend)  
   - Run SonarQube scan to enforce a quality gate[file:12]  

3. **Build**  
   - Build production frontend bundle (React/EJS + SCSS → CSS)  
   - Package backend server  

4. **Docker Build & Push**  
   - Build versioned Docker images for frontend and backend  
   - Push images to JFrog Artifactory (or configured container registry)[file:12]  

5. **Infrastructure Provisioning**  
   - Use Terraform to create/update AWS VPC, RDS, and EKS cluster  
   - Use Ansible to configure nodes and application environment.[file:12]  

6. **Kubernetes Deployment**  
   - Apply manifests / Helm charts from `k8s/`  
   - Perform rolling updates to ensure zero downtime  

7. **Monitoring & Alerts**  
   - Prometheus scrapes application and node metrics  
   - Grafana dashboards provide visibility into latency, errors, and resource usage.[file:12]  

---

## 🐳 Docker (Local Setup)

If `docker-compose.yml` is present, you can bring up the stack locally with:

docker-compose up --build


This typically starts:

- Backend on `http://localhost:4000`  
- Frontend on `http://localhost:3000` (or port 80 via reverse proxy)  
- PostgreSQL with seed data  

---

## 🔐 Environment Variables

Create `.env` files for backend and frontend using the provided examples.

### Backend `.env` example

PORT=4000
DATABASE_URL=postgresql://raise_user:password@localhost:5432/raise
JWT_SECRET=your-jwt-secret
NODE_ENV=development


### Frontend `.env` example

VITE_API_BASE_URL=http://localhost:4000


### CI/Quality

SONAR_TOKEN=your-sonar-token
Do **not** commit real secrets into version control.

---

## ✅ Testing & Quality

- **Backend tests:** Jest/Mocha (e.g. `npm test` in `backend/`).  
- **Frontend tests:** React Testing Library / Jest where configured.  
- **Static analysis:**
  - ESLint for JavaScript/TypeScript  
  - Stylelint for SCSS  
  - SonarQube for overall code quality and coverage.[file:12]  

Manual testing checklist:

- Login / signup flows work and JWTs are issued/stored correctly.  
- Protected endpoints are not accessible without valid tokens.  
- Startup listing filters correctly by sector, stage, and city.  
- Info and FAQ pages render correctly and remain responsive on mobile and desktop.  

---

## 🤝 Contributing

- Create feature branches from `main`.  
- Before opening a PR:
  - Ensure tests pass (`npm test` in relevant packages).  
  - Ensure linting passes (ESLint, Stylelint).  
  - Ensure SonarQube quality gate is green (where enforced).[file:12]  
- Keep UI responsive and consistent with the Raise design system.  
- Comment complex logic and follow existing naming and structure conventions.  

---

## 📄 License

This project is intended for academic/project use; contact the maintainers before using it for external or commercial purposes.[file:12]  
