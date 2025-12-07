RAISE is a digital investment and crowdfunding platform connecting Gen‑Z founders and investors with a full-stack web app plus a DevOps‑driven CI/CD pipeline.[1]

```markdown
# RAISE – Gen‑Z Startup Investment Portal

RAISE is a web platform that helps Indian startups and investors discover each other and execute compliant equity or revenue‑sharing deals using standard templates (no AI‑generated legal documents).[file:12]  
The main branch contains the production‑ready code for the frontend, backend APIs, and the complete CI/CD pipeline.

---

## Tech stack overview

- **Frontend:** React, EJS views for server‑rendered pages, SCSS → CSS build pipeline.[file:12]  
- **Backend:** Node.js / Express with JWT‑based auth, PostgreSQL via Prisma ORM.[file:12]  
- **DevOps & CI/CD:** Docker, Jenkins, SonarQube, JFrog Artifactory, Terraform, Ansible, AWS EKS, Prometheus, Grafana.[file:12]  

---

## Folder structure

- `frontend/` – React app, static assets, SCSS, EJS templates.  
- `backend/` – Express server, routes, controllers, Prisma schema, migrations.  
- `infra/` – Terraform and Ansible scripts for AWS (VPC, RDS, EKS, networking).  
- `jenkins/` – Jenkinsfile(s) and shared library config.  
- `k8s/` – Kubernetes manifests / Helm charts for app, ingress, config, and monitoring.  

(Names are indicative; adjust to your repo if different.)

---

## Frontend

**Key features**

- Landing page, startups listing, investor info pages, and FAQ flow styled with the Raise design system (Poppins + blue/teal palette).[file:12]  
- Dynamic filtering of startups by sector, stage, and city using client‑side JavaScript.  
- Shared header/footer partials with EJS for consistent layout across pages.

**Local development**

```
cd frontend
npm install
npm run dev           # or npm start / vite dev etc.
```

The frontend expects the backend API at `http://localhost:4000` by default (configurable via `.env`).

---

## Backend

**Responsibilities**

- REST APIs for:
  - Startup listing, investor profiles, and deals.  
  - Authentication and authorization via JWT.  
- Data layer:
  - PostgreSQL as primary DB, Prisma for schema and queries.[file:12]  
- Validation and compliance checks to ensure only verified/KYC‑cleared entities can raise or invest.[file:12]  

**Local development**

```
cd backend
cp .env.example .env     # set DB URL, JWT secret, etc.
npm install
npx prisma migrate dev   # apply migrations
npm run dev              # nodemon / ts-node
```

Backend runs on `http://localhost:4000` by default.

---

## CI/CD pipeline

The main branch is protected and deployed through a Jenkins‑based pipeline.[file:12]  

**Stages**

1. **Checkout & install**
   - Clone repo, install frontend & backend dependencies using Node.js.  

2. **Static analysis & tests**
   - Run unit tests for backend and frontend.  
   - Run SonarQube scan for code quality and coverage.[file:12]  

3. **Build**
   - Build production frontend bundle.  
   - Compile SCSS to CSS.  
   - Package backend as a Node app.

4. **Docker image build & push**
   - Build versioned Docker images for frontend and backend.  
   - Push images to JFrog Artifactory / container registry.[file:12]  

5. **Infrastructure provisioning**
   - Use Terraform to provision / update AWS resources (EKS cluster, RDS, networking).  
   - Use Ansible for configuration of nodes and environment variables.[file:12]  

6. **Deploy to Kubernetes**
   - Apply manifests / Helm charts from `k8s/` to the EKS cluster.  
   - Rolling updates with zero‑downtime strategy.

7. **Monitoring & alerts**
   - Prometheus scrapes application and node metrics.  
   - Grafana dashboards visualize app health, latency, error rates, and resource usage.[file:12]  

---

## Running everything with Docker (local)

```
docker-compose up --build
```

This brings up:

- `raise-backend` on port `4000`  
- `raise-frontend` on port `3000` (or 80 via reverse proxy)  
- Local PostgreSQL instance with seeded data

---

## Contributing

- Create feature branches from `main`.  
- Open a PR with passing tests and green SonarQube quality gate.  
- All merges to `main` are automatically built and deployed through the CI/CD pipeline.

---

## License

This repository is for academic/project use; please check with the team before external reuse.
```

[1](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/92555445/42c2881a-76fe-4ac6-a356-8d4c9bdfa102/Raise-Copy-Copy.pptx)
