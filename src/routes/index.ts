import { Router } from "express";
import courseRoutes from "./courseRoutes";
import enrollmentRoutes from "./enrollmentRoutes";
import moduleRoutes from "./moduleRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/modules", moduleRoutes);
router.use("/enrollments", enrollmentRoutes);

export default router;
