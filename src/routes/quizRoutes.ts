import { Router } from "express";
import { createQuizModule } from "../factories/quizFactory";
import { authenticate } from "../middlewares/authentication";
import {
	validateBody,
	validateParams,
	validateQuery,
} from "../middlewares/validation";
import {
	createQuizAttemptSchema,
	createQuizSchema,
	moduleIdParamSchema,
	quizFiltersSchema,
	quizIdParamSchemaAlt,
	updateQuizSchema,
} from "../validators/quiz.validators";

const router = Router();
const { controller } = createQuizModule();

/**
 * @swagger
 * /api/v1/quizzes:
 *   get:
 *     summary: Obtiene todos los quizzes con filtros opcionales
 *     tags: [Quizzes]
 *     parameters:
 *       - in: query
 *         name: moduleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de módulo
 *     responses:
 *       200:
 *         description: Lista de quizzes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateQuery(quizFiltersSchema), (req, res) =>
	controller.getAllQuizzes(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes/modules/{moduleId}:
 *   get:
 *     summary: Obtiene todos los quizzes de un módulo específico
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     responses:
 *       200:
 *         description: Lista de quizzes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: ID de módulo inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
	"/modules/:moduleId",
	validateParams(moduleIdParamSchema),
	(req, res) => controller.getQuizzesByModuleId(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes/{id}/options:
 *   get:
 *     summary: Obtiene un quiz con sus opciones
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del quiz
 *     responses:
 *       200:
 *         description: Quiz con opciones obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/QuizWithOptions'
 *       400:
 *         description: ID de quiz inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id/options", validateParams(quizIdParamSchemaAlt), (req, res) =>
	controller.getQuizWithOptions(req, res)
);

// Rutas protegidas (requieren autenticación)
router.use(authenticate);

/**
 * @swagger
 * /api/v1/quizzes/{id}:
 *   get:
 *     summary: Obtiene un quiz por su ID (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del quiz
 *     responses:
 *       200:
 *         description: Quiz obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: ID de quiz inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParams(quizIdParamSchemaAlt), (req, res) =>
	controller.getQuizById(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes:
 *   post:
 *     summary: Crea un nuevo quiz (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuiz'
 *     responses:
 *       201:
 *         description: Quiz creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/QuizWithOptions'
 *                 message:
 *                   type: string
 *                   example: Quiz creado exitosamente
 *       400:
 *         description: Datos de validación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(createQuizSchema), (req, res) =>
	controller.createQuiz(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes/{id}:
 *   put:
 *     summary: Actualiza un quiz (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuiz'
 *     responses:
 *       200:
 *         description: Quiz actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Quiz'
 *                 message:
 *                   type: string
 *                   example: Quiz actualizado exitosamente
 *       400:
 *         description: Datos de validación inválidos o ID de quiz inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
	"/:id",
	validateParams(quizIdParamSchemaAlt),
	validateBody(updateQuizSchema),
	(req, res) => controller.updateQuiz(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes/{id}:
 *   delete:
 *     summary: Elimina un quiz (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del quiz
 *     responses:
 *       200:
 *         description: Quiz eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Quiz eliminado exitosamente
 *       400:
 *         description: ID de quiz inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /api/v1/quizzes/{id}/attempt:
 *   post:
 *     summary: Registra un intento del módulo (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de un quiz del módulo (se usa para identificar el módulo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuizAttempt'
 *     responses:
 *       201:
 *         description: Intento registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/QuizAttempt'
 *                 message:
 *                   type: string
 *                   example: Intento de quiz realizado exitosamente
 *       400:
 *         description: Datos de validación inválidos, opciones inválidas o respuestas incompletas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
	"/:id/attempt",
	validateParams(quizIdParamSchemaAlt),
	validateBody(createQuizAttemptSchema),
	(req, res) => controller.createQuizAttempt(req, res)
);

/**
 * @swagger
 * /api/v1/quizzes/{id}/attempts:
 *   get:
 *     summary: Obtiene todos los intentos del usuario en un quiz (requiere autenticación)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del quiz
 *     responses:
 *       200:
 *         description: Lista de intentos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizAttempt'
 *       400:
 *         description: ID de quiz inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id/attempts", validateParams(quizIdParamSchemaAlt), (req, res) =>
	controller.getQuizAttempts(req, res)
);

router.delete("/:id", validateParams(quizIdParamSchemaAlt), (req, res) =>
	controller.deleteQuiz(req, res)
);

export default router;
