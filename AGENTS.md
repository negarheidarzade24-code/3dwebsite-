# Everhome — Premium Real Estate Marketplace

## Overview
A React + Vite + Tailwind CSS multi-page real estate marketplace with mock data.

## Tech Stack
- **Frontend:** React 18, Vite 5, React Router 6
- **Styling:** Tailwind CSS 3 with custom theme (navy/gold palette)
- **Icons:** lucide-react
- **State:** React Context (Favorites, Toasts), localStorage persistence

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on port 3000 (mapped from internal 5173). Vite dev server with HMR.

## Project Structure
- `src/data/` — mock data (properties, agents, testimonials, locations, blog, categories)
- `src/components/` — reusable UI components
- `src/pages/` — route pages (Home, Properties, PropertyDetails, Buy, Rent, Sell, Agents, AgentProfile, About, Contact, Favorites, Profile, Login)
- `src/context/` — FavoritesContext (localStorage-backed), ToastContext

## Key Details
- No backend or database — all data is mock data in `src/data/`
- Favorites persist via localStorage
- Property images use Unsplash URLs
- No external secrets or credentials required
