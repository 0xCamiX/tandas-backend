import { Router } from "express";
import { createModuleCompletionModule } from "../factories/moduleCompletionFactory";
import { authenticate } from "../middlewares/authentication";
import { validateParams, validateQuery } from "../middlewares/validation";
import {
	moduleCompletionFiltersSchema,
	moduleCompletionIdParamSchema,
	moduleCompletionModuleIdParamSchema,
} from "../validators/moduleCompletion.validators";

const router = Router();
const { controller } = createModuleCompletionModule();

// Todas las rutas requieren autenticación
router.use(authenticate);

/**
 * @swagger
 * /api/v1/module-completions:
 *   get:
 *     summary: Obtiene todas las completaciones de módulos con filtros opcionales (requiere autenticación)
 *     tags: [Module Completions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de usuario
 *       - in: query
 *         name: moduleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de módulo
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de curso
 *     responses:
 *       200:
 *         description: Lista de completaciones obtenida exitosamente
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
 *                     $ref: '#/components/schemas/ModuleCompletion'
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
router.get("/", validateQuery(moduleCompletionFiltersSchema), (req, res) =>
	controller.getAllCompletions(req, res)
);

/**
 * @swagger
 * /api/v1/module-completions/me:
 *   get:
 *     summary: Obtiene todas las completaciones del usuario actual (requiere autenticación)
 *     tags: [Module Completions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de completaciones obtenida exitosamente
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
 *                     $ref: '#/components/schemas/ModuleCompletion'
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
router.get("/me", (req, res) => controller.getMyCompletions(req, res));

/**
 * @swagger
 * /api/v1/module-completions/modules/{moduleId}:
 *   post:
 *     summary: Marca un módulo como completado (requiere autenticación)
 *     tags: [Module Completions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     responses:
 *       201:
 *         description: Módulo completado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ModuleCompletion'
 *                 message:
 *                   type: string
 *                   example: Módulo completado exitosamente
 *       400:
 *         description: ID de módulo inválido
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
 *       403:
 *         description: No estás inscrito en este curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Módulo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Ya completaste este módulo
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
	"/modules/:moduleId",
	validateParams(moduleCompletionModuleIdParamSchema),
	(req, res) => controller.completeModule(req, res)
);

/**
 * @swagger
 * /api/v1/module-completions/{id}:
 *   delete:
 *     summary: Elimina una completación (desmarca módulo como completado) (requiere autenticación)
 *     tags: [Module Completions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la completación
 *     responses:
 *       200:
 *         description: Completación eliminada exitosamente
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
 *                   example: Completación eliminada exitosamente
 *       400:
 *         description: ID de completación inválido
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
 *         description: Completación no encontrada
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
router.delete(
	"/:id",
	validateParams(moduleCompletionIdParamSchema),
	(req, res) => controller.deleteCompletion(req, res)
);

export default router;
