# Cost Calculator – Cloud Deployment & Architecture Guide

---

## 🏗 System Architecture Overview

Cost Calculator is an enterprise-grade SaaS platform built with:
- **Frontend**: Vite + React 19 + TypeScript + Tailwind v4 (Deployed on **Vercel** / **Netlify**)
- **Backend API**: Express.js + TypeScript + Node.js (Deployed on **Railway** / **Render**)
- **Database**: PostgreSQL with Prisma ORM (Provisioned on **Supabase** / **Neon**)
- **Caching**: Redis (Provisioned on **Upstash**)

---

## 🌐 Environment Variables Matrix

### Frontend (`/.env`)
```env
VITE_API_URL=https://api.costcalculator.app/api/v1
VITE_APP_NAME=Cost Calculator
```

### Backend (`/server/.env`)
```env
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
JWT_SECRET=super-secret-production-jwt-key-cost-calculator-2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://costcalculator.app
```

---

## 🚀 Step-by-Step Production Deployment

### 1. Database Provisioning (Supabase / Neon)
1. Create a new PostgreSQL instance on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. Copy the connection string `DATABASE_URL`.
3. Run migrations and seed script from terminal:
   ```bash
   cd server
   npx prisma db push
   npm run prisma:seed
   ```

### 2. Backend API Deployment (Railway / Render)
1. Connect your repository to Railway or Render.
2. Set Root Directory to `server`.
3. Configure Build Command:
   ```bash
   npm install && npm run build
   ```
4. Configure Start Command:
   ```bash
   npm run start
   ```
5. Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `PORT=4000`, `CORS_ORIGIN`.

### 3. Frontend Web App Deployment (Vercel)
1. Import repository into Vercel dashboard.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Set `VITE_API_URL` to your live Railway API URL (e.g. `https://api.costcalculator.app/api/v1`).

---

## 🔒 Security Best Practices Implemented
- **JWT Authentication**: 7-day signed JWT tokens with bearer authentication.
- **Role-Based Access Control**: Admin routes protected via `requireAdmin` middleware.
- **Input Validation**: Zod validation schemas on auth and project inputs.
- **Security Headers**: Helmet & CORS configured for strict origin control.
- **Logging**: Morgan HTTP logger + Prisma audit trail logging.
