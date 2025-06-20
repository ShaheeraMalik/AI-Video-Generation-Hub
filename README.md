# AI-Video-Generation-Hub

**A full-stack AI-powered video generation platform**
Generate marketing videos or virtual real-estate tours with dynamic status polling, preview animations, and easy download/share.

---

## 📄 Table of Contents

1. [Clone the Repo](#clone-the-repo)
2. [Overview](#overview)
3. [Features](#features)
4. [Architecture & Tech Stack](#architecture--tech-stack)
5. [Folder Structure](#folder-structure)
6. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Environment Variables](#environment-variables)
   * [Installation & Running](#installation--running)
7. [API Endpoints](#api-endpoints)
8. [Approach & Technical Decisions](#approach--technical-decisions)
9. [Challenges & Solutions](#challenges--solutions)
10. [Future Extensions](#future-extensions)
11. [License](#license)

---

## 🔀 Clone the Repo

```bash
git clone https://github.com/ShaheeraMalik/AI-Video-Generation-Hub.git
cd AI-Video-Generation-Hub
```

---

## 📝 Overview

VideoAI Pro lets you:

* **Create marketing videos** from feature lists, tone, audience, style, and optional image
* **Generate real-estate property tours** with address, price, stats, features, style
* See an animated “AI in progress” preview, poll backend for job status, then watch/download the final video

---

## 🚀 Features

* **Zero-config file-based routing** (Next.js)
* **AI progress animations** while you wait
* **Polling** to show live “pending → complete/failed” status
* **FormData** upload of images in marketing flows
* **Server‐side & static page rendering** for instant SEO-friendly content
* **Reusable UI components** (React + Tailwind + shadcn/ui + lucide-react icons)
* **Express** backend with Multer image handling, validation, job controllers

---

## 🏗️ Architecture & Tech Stack

| Layer          | Technology & Libraries                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Frontend**   | Next.js (13+), React, TypeScript, Tailwind CSS, clsx/tw-merge, Axios, Lucide Icons, shadcn/ui, VideoPlayer component  |
| **Backend**    | Node.js, Express, TypeScript, Multer (in-memory uploads), JOI/Zod (validation), in-memory job store (simulated queue) |
| **API**        | RESTful JSON + multipart/form-data for image uploads                                                                  |
| **Styling**    | Utility-first Tailwind CSS                                                                                            |
| **Deployment** | Vercel (Frontend) + Heroku/DigitalOcean (Backend) or Docker                                                           |

---

## 📂 Folder Structure

```
/
├─ frontend/                        # Next.js application
│  ├─ pages/
│  │   ├─ index.tsx                 # Landing page with “Marketing” & “Tour” cards
│  │   ├─ marketing.tsx             # Marketing video UI + polling
│  │   └─ tour.tsx                  # Real-estate tour UI + polling
│  ├─ components/
│  │   └─ VideoPlayer.tsx           # Downloadable video player component
│  ├─ lib/
│  │   ├─ api.ts                    # Axios wrappers for start/status calls
│  │   └─ types.ts                  # Shared request/response TypeScript types
│  ├─ styles/                       # Tailwind config, globals.css
│  └─ public/                       # Static assets (previews, placeholder images)
│
└─ backend/                         # Express API server
   ├─ controllers/
   │   ├─ marketingController.ts
   │   └─ tourController.ts
   ├─ routes/
   │   ├─ marketing.ts
   │   └─ tour.ts
   ├─ utils/
   │   └─ validation.ts             # Request schema validation
   └─ jobs/                         # In-memory job store & simulation
```

---

## 🛠️ Getting Started

### Prerequisites

* **Node.js** v16 or later
* **npm** or **Yarn**
* (Optional) Docker

### Environment Variables

#### Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

#### Backend

Create `backend/.env`:

```env
PORT=4000
```

### Installation & Running

1. **Start the Backend**

   ```bash
   cd backend
   npm install
   npm run dev
   # or yarn && yarn dev
   ```
2. **Start the Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   # or yarn && yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API Endpoints

### Marketing Video

| Method | Endpoint                             | Payload                                                                                                                  | Response                             |            |                                                  |
| ------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------- | ------------------------------------------------ |
| POST   | `/api/video/marketing`               | multipart/form-data:<br>- `features`: JSON string array<br>- `tone`<br>- `audience`<br>- `style`<br>- `image` (optional) | `{ jobId: string, message: string }` |            |                                                  |
| GET    | `/api/video/marketing/status/:jobId` | —                                                                                                                        | \`{ status: 'pending'                | 'complete' | 'failed', message: string, videoUrl?: string }\` |

### Real-Estate Tour

| Method | Endpoint                        | Payload                                                                                               | Response                             |            |                                                  |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------- | ------------------------------------------------ |
| POST   | `/api/video/tour`               | JSON:<br>- `address`<br>- `price`<br>- `beds`<br>- `baths`<br>- `sqft`<br>- `features[]`<br>- `style` | `{ jobId: string, message: string }` |            |                                                  |
| GET    | `/api/video/tour/status/:jobId` | —                                                                                                     | \`{ status: 'pending'                | 'complete' | 'failed', message: string, videoUrl?: string }\` |

---

## 💡 Approach & Technical Decisions

1. **Next.js** for unified file-based routing, SSR/SSG, and performance SEO.
2. **Express** backend to isolate AI-job logic, easy to scale.
3. **Polling** via React `useEffect` + `setInterval` to check job status every 2 seconds.
4. **FormData** approach for marketing image uploads; JSON payload for tour requests.
5. **Tailwind CSS** for rapid, utility-first styling and small final bundle via Purge.
6. **TypeScript** on both client and server to enforce types and share definitions.

---

## 🧱 Challenges & Solutions

* **Long-running jobs**: Implemented polling since WebSockets/SSE were out of scope; decoupled polling from UI animations.
* **File uploads**: Configured Multer for in-memory storage in Express and used FormData in the frontend.
* **Type sharing**: Centralized request/response types in `lib/types.ts` to avoid mismatches.
* **Responsive design**: Tailwind’s mobile-first approach made UI adaptation straightforward.

---

## 🔮 Future Extensions

With more time, we’d add:

1. **WebSocket/SSE** for push-based real-time updates.
2. **Persistent queue** (Redis + Bull) for job durability and horizontal scaling.
3. **User authentication** (NextAuth.js) and history of past jobs.
4. **Video streaming & chunked delivery** for large outputs.
5. **Analytics dashboard**: usage metrics, style popularity, conversion rates.
6. **i18n & accessibility**: multi-language support and ARIA compliance.

---

## 📄 License

MIT © 2025 Shaheera Imtiaz

> Built with ❤️ using Next.js, React, Express, Tailwind & AI magic.
