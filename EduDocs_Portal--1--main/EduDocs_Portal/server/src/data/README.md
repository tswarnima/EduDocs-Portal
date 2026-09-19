# Backend data layer (development)

API services read and write **`server/data/db.json`** through `src/data/localStore.js`.

MongoDB integration is handled separately. These files are **unchanged** for that work:

- `src/models/` — Mongoose schemas
- `src/config/database.js` — `connectDB()`
- `src/config/seedAdmin.js` — admin seeding

When MongoDB is ready, your teammate can switch each `*.service.js` back to importing from `src/models/` and restore `connectDB()` / `seedAdmin()` in `src/server.js`.
