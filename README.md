# Jobmate FE (React + Vite)

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env` (or `.env.local`) file at the project root and add your HERE API key:
   ```bash
   VITE_HERE_API_KEY=your_here_api_key
   ```
   - You can obtain this key from the HERE developer dashboard (Apps and Credentials).
   - Never commit the real key—keep it only in your local `.env`.
3. Run the app:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable            | Required | Description                                             |
| ------------------- | -------- | ------------------------------------------------------- |
| `VITE_HERE_API_KEY` | Yes      | HERE Geocoding & Search API key used by location modal. |

The `LocationPickerModal` automatically falls back to `import.meta.env.VITE_HERE_API_KEY`, but you can override it per-usage via the `hereApiKey` prop if needed.

## Tech Highlights

- React 18 + Vite for fast development
- Tailwind CSS utility classes in components
- HERE Autocomplete + Reverse Geocoding inside `LocationPickerModal`

Feel free to expand this README with additional setup or deployment steps as the project evolves.
