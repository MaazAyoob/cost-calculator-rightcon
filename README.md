# Project Buniyad — Home Construction Planning & Engineering Platform

> **Production SaaS Platform for Homeowners, Architects & Contractors in India.**  
> *Deterministic IS 456 & IS 13920 Calculation Engine · Bank-Ready BOQ & Payment Schedules · Real-Time Regional Material Price Indices*

---

## 🌟 Executive Summary

Project Buniyad is NOT a simple marketing site or CRUD dashboard. It is an enterprise-grade SaaS application designed to empower Indian homeowners to configure every architectural, structural, material, and electrical detail of their dream home before ground breaking.

### Core Capabilities
- **10-Step Interactive Guided Configurator**: Visual Tesla-style wizard with live instant recalculation (<2ms).
- **Deterministic Engineering Engine**: Built on IS 456, IS 13920, IS 1905 & NBC 2016 civil engineering standards.
- **50+ Item BOQ Generator**: Automatically groups line items across 13 construction categories.
- **11-Stage Construction Journey Workspace**: Interactive sidebar, activity cards, and 9-section detail inspector.
- **Side-by-Side Activity Comparison**: Compare costs, durations, and specifications of any two construction tasks.
- **Bank Disbursement Schedule**: 11-milestone payment roadmap aligned with bank housing loan release protocols.
- **Multi-Format Exporters**: Instant export to Bank-Ready PDF, Multi-Sheet Excel Workbooks, and CSV material lists.
- **Production Admin Portal**: Live regional price management for Bangalore & Mysore, brand catalogue manager, and system audit logs.

---

## 🏗 Technology Stack

### Frontend
- **Core**: React 19, TypeScript 5.3, Vite 6.4
- **State Management**: Zustand 4.5 (unidirectional reactive stores)
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System Tokens
- **Animations**: Framer Motion 11 (smooth spring physics & layoutId transitions)
- **Charts**: Recharts 2.12
- **Icons**: Lucide React

### Backend (`/server`)
- **Runtime**: Node.js 20, Express 4.18
- **Language**: TypeScript 5.3
- **ORM**: Prisma 5.10
- **Database**: PostgreSQL (Supabase / Neon)
- **Security**: JWT authentication, bcryptjs, Helmet, Rate Limiter, Zod validation
- **Logging**: Morgan HTTP logger + Prisma Audit Logs

---

## 📁 Repository Structure

```
.
├── public/
│   ├── robots.txt              ← Search engine crawler directives
│   └── sitemap.xml             ← XML sitemap for SEO
├── .github/
│   └── workflows/
│       └── ci-cd.yml           ← Automated GitHub Actions pipeline
├── server/                     ← Express API Backend
│   ├── prisma/
│   │   ├── schema.prisma       ← 12 PostgreSQL models
│   │   └── seed.ts             ← Database seed script
│   └── src/
│       ├── config/             ← Environment configuration
│       ├── controllers/        ← Auth, download & project controllers
│       ├── middlewares/        ← JWT auth, error handling, rate limiting
│       ├── routes/             ← API v1 router (/auth, /download, /health)
│       └── services/           ← PDF, Excel, and CSV export engines
├── src/                        ← Frontend Application
│   ├── animations/             ← Framer Motion variants
│   ├── app/                    ← Router configuration & providers
│   ├── calculation-engine/     ← IS-Code Deterministic Engine (16 modules)
│   │   ├── data/               ← Engineering coefficients & brand database
│   │   ├── modules/            ← Area, Steel, Cement, BOQ, Payment, etc.
│   │   └── calculator.ts       ← Master orchestrator
│   ├── components/             ← Reusable UI component library
│   │   ├── common/             ← SEO, ErrorBoundary, StatusBadge, PageHeader
│   │   ├── dashboard/          ← MetricCard, OverviewTab, CompareDrawer, DownloadsTab
│   │   ├── layout/             ← AppLayout, TopNavigation, Sidebar
│   │   └── ui/                 ← Button, Card, Modal, Toast
│   ├── constants/              ← 13 construction stages & 40+ activities
│   ├── features/               ← Page features (Landing, Planner, Dashboard, Report, Admin)
│   ├── store/                  ← Zustand stores (Wizard, Calculation, Dashboard, UI)
│   └── utils/                  ← Analytics, currency formatters, classnames
├── DEPLOYMENT.md               ← Production Cloud Deployment Guide
└── README.md                   ← Master project documentation
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

### 1. Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Running Locally

Start the Vite frontend development server:

```bash
npm run dev
# App running at http://localhost:3000
```

Start the Express API server:

```bash
cd server
npm run dev
# Server running at http://localhost:4000
```

---

## 📊 Deterministic Engineering Calculation Engine

The engine converts user inputs (plot dimensions, floors, house type, room counts, quality tier, city, parking type, brands) into deterministic structural & financial outputs without external API latency:

$$ \text{Plot Area} = \text{Length} \times \text{Width} $$
$$ \text{Ground Coverage} = \text{Plot Area} \times 0.60 \quad (\text{BBMP 60\% Coverage Rule}) $$
$$ \text{Total Built-Up Area (BUA)} = \text{Ground Coverage} \times 0.92 \times \text{Floors} $$
$$ \text{Super BUA} = \text{BUA} \times 1.15 \quad (\text{15\% Common Area \& Wall Thickness}) $$

### Material Consumption Coefficients (IS 456)
- **TMT Steel**: 3.8 kg/sqft (Essential) · 4.5 kg/sqft (Premium) · 5.5 kg/sqft (Luxury)
- **OPC 53 Cement**: 0.38 bags/sqft (Essential) · 0.44 bags/sqft (Premium) · 0.50 bags/sqft (Luxury)
- **M25 RMC Concrete**: 0.052 $\text{m}^3$/sqft

---

## 🚀 Production Deployment

Refer to [`DEPLOYMENT.md`](file:///c:/Users/Avita/Desktop/Programming/big%20bnglore%20client/cost%20calculator%20rightcon/DEPLOYMENT.md) for full instructions on deploying:
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render
- **Database**: Supabase / Neon PostgreSQL

---

## 🔒 Security & Quality Assurance
- Zero TypeScript warnings or errors (`npx tsc --noEmit`)
- WCAG 2.2 AA compliant keyboard navigation & high contrast colors
- Strict input sanitization & JWT authentication
- Automated GitHub Actions CI/CD pipeline (`.github/workflows/ci-cd.yml`)

---

© 2026 Project Buniyad · Rightcon Constructions. All Rights Reserved.
