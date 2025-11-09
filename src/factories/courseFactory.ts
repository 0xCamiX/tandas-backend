import { CourseController } from "../controllers/courseController";
import { CourseModel } from "../models/courseModel";
import { CourseService } from "../services/courseService";

/**
 * Crea una nueva instancia de CourseModel.
 *
 * @returns {CourseModel} Instancia de CourseModel
 */
export function createCourseModel(): CourseModel {
	return new CourseModel();
}

/**
 * Crea una nueva instancia de CourseService con inyección de dependencias.
 *
 * @param {CourseModel} [courseModel] - Instancia opcional de CourseModel. Si no se proporciona, se crea una nueva
 * @returns {CourseService} Instancia de CourseService con dependencias inyectadas
 */
export function createCourseService(courseModel?: CourseModel): CourseService {
	const model = courseModel || createCourseModel();
	return new CourseService(model);
}

/**
 * Crea una nueva instancia de CourseController con inyección de dependencias.
 *
 * @param {CourseService} [courseService] - Instancia opcional de CourseService. Si no se proporciona, se crea una nueva
 * @param {CourseModel} [courseModel] - Instancia opcional de CourseModel. Solo se usa si courseService no se proporciona
 * @returns {CourseController} Instancia de CourseController con dependencias inyectadas
 */
export function createCourseController(
	courseService?: CourseService,
	courseModel?: CourseModel
): CourseController {
	const service = courseService || createCourseService(courseModel);
	return new CourseController(service);
}

/**
 * Crea todas las instancias del módulo Course con sus dependencias correctamente inyectadas.
 *
 * @returns {{model: CourseModel, service: CourseService, controller: CourseController}} Objeto con todas las instancias del módulo Course
 */
export function createCourseModule(): {
	model: CourseModel;
	service: CourseService;
	controller: CourseController;
} {
	const model = createCourseModel();
	const service = createCourseService(model);
	const controller = createCourseController(service, model);

	return {
		model,
		service,
		controller,
	};
}
