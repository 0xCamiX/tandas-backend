import { Router } from "express";
import courseRoutes from "./courseRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);

export default router;
