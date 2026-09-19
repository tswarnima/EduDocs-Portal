import { Router } from "express";

// --- Your modules (Profile, Register, RequestDocument, RequestHistory, TrackRequest) ---
import registerRoutes from "../modules/register/register.routes.js";
import profileRoutes from "../modules/profile/profile.routes.js";
import requestDocumentRoutes from "../modules/requestDocument/requestDocument.routes.js";
import requestHistoryRoutes from "../modules/requestHistory/requestHistory.routes.js";
import trackRequestRoutes from "../modules/trackRequest/trackRequest.routes.js";

// --- Colleague modules (Dashboard, Home, Login, NotFound) ---
import loginRoutes from "../modules/login/login.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import homeRoutes from "../modules/home/home.routes.js";

import adminRoutes from "../modules/admin/admin.routes.js";

const router = Router();

// More specific /requests/* routes must come before /requests
router.use("/requests/history", requestHistoryRoutes);
router.use("/requests/track", trackRequestRoutes);
router.use("/requests", requestDocumentRoutes);

router.use("/register", registerRoutes);
router.use("/profile", profileRoutes);

router.use("/login", loginRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/home", homeRoutes);
router.use("/admin", adminRoutes);

export default router;
