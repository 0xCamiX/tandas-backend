import { Router } from "express";
import courseRoutes from "./courseRoutes";
import enrollmentRoutes from "./enrollmentRoutes";
import moduleCompletionRoutes from "./moduleCompletionRoutes";
import moduleRoutes from "./moduleRoutes";
import quizRoutes from "./quizRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/modules", moduleRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/quizzes", quizRoutes);
router.use("/module-completions", moduleCompletionRoutes);

export default router;
