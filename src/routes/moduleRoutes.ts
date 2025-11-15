import { Router } from "express";
import { createModuleModule } from "../factories/moduleFactory";
import { authenticate } from "../middlewares/authentication";
import {
	validateBody,
	validateParams,
	validateQuery,
} from "../middlewares/validation";
import {
	courseIdParamSchema,
	createModuleSchema,
	moduleFiltersSchema,
	moduleIdParamSchemaAlt,
	updateModuleSchema,
} from "../validators/module.validators";

const router = Router();
const { controller } = createModuleModule();

/**
 * @swagger
 * /api/v1/modules:
 *   get:
 *     summary: Obtiene todos los módulos con filtros opcionales
 *     tags: [Modules]
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID de curso
 *     responses:
 *       200:
 *         description: Lista de módulos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Module'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateQuery(moduleFiltersSchema), (req, res) =>
	controller.getAllModules(req, res)
);

/**
 * @swagger
 * /api/v1/courses/{courseId}/modules:
 *   get:
 *     summary: Obtiene todos los módulos de un curso específico
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de módulos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Module'
 *       400:
 *         description: ID de curso inválido
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
	"/courses/:courseId/modules",
	validateParams(courseIdParamSchema),
	(req, res) => controller.getModulesByCourseId(req, res)
);

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   get:
 *     summary: Obtiene un módulo por su ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     responses:
 *       200:
 *         description: Módulo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Module'
 *       400:
 *         description: ID de módulo inválido
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
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParams(moduleIdParamSchemaAlt), (req, res) =>
	controller.getModuleById(req, res)
);

/**
 * @swagger
 * /api/v1/modules/{id}/full:
 *   get:
 *     summary: Obtiene un módulo con sus relaciones (curso, quizzes, recursos)
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     responses:
 *       200:
 *         description: Módulo con relaciones obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ModuleWithRelations'
 *       400:
 *         description: ID de módulo inválido
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
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id/full", validateParams(moduleIdParamSchemaAlt), (req, res) =>
	controller.getModuleWithRelations(req, res)
);

// Rutas protegidas (requieren autenticación)
router.use(authenticate);

/**
 * @swagger
 * /api/v1/modules:
 *   post:
 *     summary: Crea un nuevo módulo (requiere autenticación)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModule'
 *     responses:
 *       201:
 *         description: Módulo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Module'
 *                 message:
 *                   type: string
 *                   example: Módulo creado exitosamente
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
router.post("/", validateBody(createModuleSchema), (req, res) =>
	controller.createModule(req, res)
);

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   put:
 *     summary: Actualiza un módulo (requiere autenticación)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateModule'
 *     responses:
 *       200:
 *         description: Módulo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Module'
 *                 message:
 *                   type: string
 *                   example: Módulo actualizado exitosamente
 *       400:
 *         description: Datos de validación inválidos o ID de módulo inválido
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
 *         description: Módulo no encontrado
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
	validateParams(moduleIdParamSchemaAlt),
	validateBody(updateModuleSchema),
	(req, res) => controller.updateModule(req, res)
);

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   delete:
 *     summary: Elimina un módulo (requiere autenticación)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del módulo
 *     responses:
 *       200:
 *         description: Módulo eliminado exitosamente
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
 *                   example: Módulo eliminado exitosamente
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
 *       404:
 *         description: Módulo no encontrado
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
router.delete("/:id", validateParams(moduleIdParamSchemaAlt), (req, res) =>
	controller.deleteModule(req, res)
);

export default router;
