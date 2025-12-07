import { EnrollmentController } from "../controllers/enrollmentController";
import { EnrollmentModel } from "../models/enrollmentModel";
import { EnrollmentService } from "../services/enrollmentService";

/**
 * Crea una nueva instancia de EnrollmentModel.
 *
 * @returns {EnrollmentModel} Instancia de EnrollmentModel
 */
export function createEnrollmentModel(): EnrollmentModel {
	return new EnrollmentModel();
}

/**
 * Crea una nueva instancia de EnrollmentService con inyección de dependencias.
 *
 * @param {EnrollmentModel} [enrollmentModel] - Instancia opcional de EnrollmentModel. Si no se proporciona, se crea una nueva
 * @returns {EnrollmentService} Instancia de EnrollmentService con dependencias inyectadas
 */
export function createEnrollmentService(
	enrollmentModel?: EnrollmentModel
): EnrollmentService {
	const model = enrollmentModel || createEnrollmentModel();
	return new EnrollmentService(model);
}

/**
 * Crea una nueva instancia de EnrollmentController con inyección de dependencias.
 *
 * @param {EnrollmentService} [enrollmentService] - Instancia opcional de EnrollmentService. Si no se proporciona, se crea una nueva
 * @param {EnrollmentModel} [enrollmentModel] - Instancia opcional de EnrollmentModel. Solo se usa si enrollmentService no se proporciona
 * @returns {EnrollmentController} Instancia de EnrollmentController con dependencias inyectadas
 */
export function createEnrollmentController(
	enrollmentService?: EnrollmentService,
	enrollmentModel?: EnrollmentModel
): EnrollmentController {
	const service = enrollmentService || createEnrollmentService(enrollmentModel);
	return new EnrollmentController(service);
}

/**
 * Crea todas las instancias del módulo Enrollment con sus dependencias correctamente inyectadas.
 *
 * @returns {{model: EnrollmentModel, service: EnrollmentService, controller: EnrollmentController}} Objeto con todas las instancias del módulo Enrollment
 */
export function createEnrollmentModule(): {
	model: EnrollmentModel;
	service: EnrollmentService;
	controller: EnrollmentController;
} {
	const model = createEnrollmentModel();
	const service = createEnrollmentService(model);
	const controller = createEnrollmentController(service, model);

	return {
		model,
		service,
		controller,
	};
}
