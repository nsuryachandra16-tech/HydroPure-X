# HydroPure-X 💧

**Graphene Smart Sieve — University Science Prototype**

A React + Vite interactive web application simulating graphene-based water purification technology. Explores impurity removal, PPM charts, dual purifier simulations, and ROI comparison matrices.

---

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (bundler)
- **Tailwind CSS v4**
- **Express.js** (static file server for production)
- **Lucide React** icons

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run dev server
npm run dev
```

App will be available at `http://localhost:3000`

---

## 🌐 Deploy on Render

### Option 1: Static Site (Recommended — Free)

1. Go to [render.com](https://render.com) → **New** → **Static Site**
2. Connect your GitHub repo: `nsuryachandra16-tech/HydroPure-X`
3. Set the following:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site**
5. (Optional) Add environment variable `GEMINI_API_KEY` if needed

### Option 2: Web Service (Node.js / Express)

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo: `nsuryachandra16-tech/HydroPure-X`
3. Set the following:
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add environment variable:
   - `GEMINI_API_KEY` = your Gemini API key
5. Click **Create Web Service**

---

## 📁 Project Structure

```
hydropure-x/
├── src/
│   ├── components/       # React components
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   ├── types.ts          # TypeScript types
│   └── index.css         # Global styles
├── server.js             # Express server (for Render Web Service)
├── vite.config.ts        # Vite configuration
├── package.json
├── index.html
└── .env.example
```

---

## 📜 License

Apache-2.0 — University Science Prototype · HydroPure Co.
