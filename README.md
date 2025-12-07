```markdown
# RAISE – Gen-Z Startup Investment Platform

RAISE is a digital investment and crowdfunding platform connecting Gen-Z founders with investors.  
It supports compliant equity and revenue-sharing deals using standard legal templates.  
The `main` branch contains production-ready code for the frontend, backend APIs, and CI/CD pipeline.

---

## 🚀 Tech Stack

### **Frontend**
- React  
- EJS (server-rendered views)  
- SCSS → CSS build pipeline  

### **Backend**
- Node.js / Express  
- JWT-based authentication  
- PostgreSQL with Prisma ORM  

### **DevOps / CI/CD**
- Docker  
- Jenkins  
- SonarQube  
- JFrog Artifactory  
- Terraform  
- Ansible  
- AWS EKS (Kubernetes)  
- Prometheus + Grafana  

---

## 📁 Folder Structure

```

frontend/   – React app, static assets, SCSS, EJS templates
backend/    – Express server, routes, controllers, Prisma schema
infra/      – Terraform & Ansible scripts for AWS (VPC, RDS, EKS)
jenkins/    – Jenkinsfile(s) and shared library configurations
k8s/        – Kubernetes manifests / Helm charts

````

---

## 🎨 Frontend

### **Features**
- Landing page, startup listings, investor pages, FAQ  
- Filtering by **sector**, **stage**, and **city** (client-side JS)  
- Shared header/footer via EJS partials  

### **Local Development**

```bash
cd frontend
npm install
npm run dev
````

Backend is expected at: `http://localhost:4000`.

---

## 🛠 Backend

### **Responsibilities**

* REST APIs for startups, investors, and deals
* Authentication & authorization (JWT)
* PostgreSQL with Prisma migrations
* Compliance checks for KYC-verified users

### **Local Development**

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

Runs at: `http://localhost:4000`.

---

## 🧩 CI/CD Pipeline (Jenkins)

### **Pipeline Stages**

1. **Checkout & Install**

   * Clone repo
   * Install dependencies

2. **Static Analysis & Tests**

   * Unit tests
   * SonarQube scan

3. **Build**

   * Frontend production build
   * SCSS → CSS
   * Package backend

4. **Docker Build & Push**

   * Build versioned images
   * Push to JFrog Artifactory

5. **Infrastructure Provisioning**

   * Terraform for AWS (EKS, VPC, RDS)
   * Ansible for node configuration

6. **Kubernetes Deployment**

   * Apply manifests / Helm charts
   * Rolling updates (zero downtime)

7. **Monitoring & Alerts**

   * Prometheus metrics
   * Grafana dashboards

---

## 🐳 Docker (Local Setup)

```bash
docker-compose up --build
```

This starts:

* Backend → **4000**
* Frontend → **3000** (or port 80 with reverse proxy)
* PostgreSQL with seed data

---

## 🤝 Contributing

* Create feature branches from `main`
* Open a PR with:

  * Passing tests
  * Green SonarQube quality gate
* Merges to `main` trigger full CI/CD deployment

---

## 📄 License

This project is for academic/project use.
Contact the team for external or commercial reuse.

```
