```markdown
# AI-Video-Generation-Hub

**A full-stack AI-powered video generation platform**  
– Generate marketing videos or virtual real-estate tours with dynamic status polling, preview animations, and easy download/share.

---

## 📄 Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Architecture & Tech Stack](#architecture--tech-stack)  
4. [Folder Structure](#folder-structure)  
5. [Getting Started](#getting-started)  
   1. [Prerequisites](#prerequisites)  
   2. [Environment Variables](#environment-variables)  
   3. [Installation & Running](#installation--running)  
6. [API Endpoints](#api-endpoints)  
7. [Approach & Technical Decisions](#approach--technical-decisions)  
8. [Challenges & Solutions](#challenges--solutions)  
9. [Future Extensions](#future-extensions)  
10. [License](#license)  

---

## 📝 Overview

VideoAI Pro lets you:
- **Create marketing videos** from feature lists, tone, audience, style, and optional image.  
- **Generate real-estate property tours** with address, price, stats, features, style.  
- See an animated “AI in progress” preview, poll backend for job status, then watch/download the final video.

---

## 🚀 Features

- **Zero-config file-based routing** (Next.js)  
- **AI progress animations** while you wait  
- **Polling** to show live “pending → complete/failed” status  
- **FormData** upload of images in marketing flows  
- **Server‐side & static page rendering** for instant SEO-friendly content  
- **Reusable UI components** (React + Tailwind + shadcn/ui + lucide-react icons)  
- **Express** backend with Multer image handling, validation, job controllers  

---

## 🏗️ Architecture & Tech Stack

| Layer             | Tech / Libs                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**      | Next.js (13+, `app` or `pages`), React, TypeScript, Tailwind CSS, `clsx`/`tw-merge`, Axios, Lucide Icons, shadcn/ui, VideoPlayer component |
| **Backend**       | Node.js, Express, TypeScript, Multer (in-memory uploads), JOI/Zod (validation), in-memory job store / simulated queue                   |
| **API Protocol**  | RESTful JSON + multipart/form-data for image uploads                                                                                  |
| **Styling**       | Utility-first Tailwind CSS                                                                                                            |
| **Deployment**    | Vercel (Frontend) + Heroku/DigitalOcean (Backend) or Docker                                                                           |

---

## 📂 Folder Structure

```

/
├─ frontend/                    # Next.js app
│  ├─ pages/
│  │   ├─ index.tsx             # Landing page with “Marketing” & “Tour” cards
│  │   ├─ marketing.tsx         # Marketing video UI + polling
│  │   └─ tour.tsx              # Real-estate tour UI + polling
│  ├─ components/
│  │   └─ VideoPlayer.tsx       # Downloadable video player
│  ├─ lib/
│  │   ├─ api.ts                # Axios wrappers for start/status calls
│  │   └─ types.ts              # Shared request/response TypeScript types
│  ├─ styles/                   # Tailwind config, globals.css
│  └─ public/                   # Static assets (previews, placeholder)
│
└─ backend/                     # Express API server
├─ controllers/
│   ├─ marketingController.ts
│   └─ tourController.ts
├─ routes/
│   ├─ marketing.ts
│   └─ tour.ts
├─ utils/
│   └─ validation.ts         # Request schema validation
└─ jobs/                     # (In-memory) job store & simulation

```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v16+  
- **npm** or **Yarn**   

### Environment Variables

#### Frontend (Next.js)

Create `frontend/.env.local`:
```

NEXT\_PUBLIC\_BACKEND\_URL=[http://localhost:4000](http://localhost:4000)

```

#### Backend (Express)

Create `backend/.env`:
```

PORT=4000

````

### Installation & Running

1. **Backend**  
   ```bash
   cd backend
   npm install or npm install -force
   npm run dev
````

2. **Frontend**

   ```bash
   cd frontend
   npm install or npm install -force
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API Endpoints

### Marketing Video

| Method | Endpoint                             | Payload                                                                                                         | Response              |            |                                  |
| ------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------- | ---------- | -------------------------------- |
| POST   | `/api/video/marketing`               | multipart/form-data:<br>`features` (JSON string array)<br>`tone`<br>`audience`<br>`style`<br>`image` (optional) | `{ jobId, message }`  |            |                                  |
| GET    | `/api/video/marketing/status/:jobId` | —                                                                                                               | \`{ status: 'pending' | 'complete' | 'failed', message, videoUrl? }\` |

### Real-Estate Tour

| Method | Endpoint                        | Payload                                                                     | Response                         |
| ------ | ------------------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| POST   | `/api/video/tour`               | JSON:<br>`address`, `price`, `beds`, `baths`, `sqft`, `features[]`, `style` | `{ jobId, message }`             |
| GET    | `/api/video/tour/status/:jobId` | —                                                                           | `{ status, message, videoUrl? }` |

---

## 💡 Approach & Technical Decisions

1. **Next.js** for unified routing + SSR + API routes → faster time-to-market & SEO.
2. **Express** backend keeps AI-job logic separate, scalable.
3. **Polling** in React `useEffect` (setInterval) to fetch job status every 2 s.
4. **FormData** for file uploads in marketing flow; plain JSON for tour flow.
5. **Tailwind** utility CSS: rapid styling, small CSS bundle via Purge.
6. **TypeScript** everywhere: catch bugs early, share types between client/server.

---

## 🧱 Challenges & Solutions

* **Long-running jobs**: Without WebSockets, we used simple polling; decoupled UI animation (“AI visualization”) from actual job status.
* **File uploads**: Configured Multer in Express for in-memory image handling; used FormData in browser.
* **Shared types**: Kept `src/lib/types.ts` synced between frontend + backend to avoid mismatches.
* **Responsive UI**: Tailwind’s mobile-first classes made it easy to ensure good experience on all screens.

---

## 🔮 Future Extensions

With more time, I would:

1. **WebSocket or Server-Sent Events** for true real-time status updates (no polling).
2. **Persistent job queue** (Redis + Bull) to survive restarts and scale horizontally.
3. **User accounts & auth** (NextAuth.js) so users can view past jobs.
4. **Video streaming** & chunked downloads for large files.
5. **Analytics dashboard**: usage metrics, popular styles, conversion rates.
6. **Internationalization** (i18n) and accessibility (ARIA roles, keyboard nav).

---

## 📄 License

MIT © 2025 Your Name

---

> Built with ❤️ using Next.js, React, Express, Tailwind & AI magic.

```
```
