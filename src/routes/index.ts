import { Router } from "express";
import courseRoutes from "./courseRoutes";
import moduleRoutes from "./moduleRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/modules", moduleRoutes);

export default router;
