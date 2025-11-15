import { ModuleCompletionController } from "../controllers/moduleCompletionController";
import { ModuleCompletionModel } from "../models/moduleCompletionModel";
import { ModuleCompletionService } from "../services/moduleCompletionService";

/**
 * Crea una nueva instancia de ModuleCompletionModel.
 *
 * @returns {ModuleCompletionModel} Instancia de ModuleCompletionModel
 */
export function createModuleCompletionModel(): ModuleCompletionModel {
	return new ModuleCompletionModel();
}

/**
 * Crea una nueva instancia de ModuleCompletionService con inyección de dependencias.
 *
 * @param {ModuleCompletionModel} [moduleCompletionModel] - Instancia opcional de ModuleCompletionModel. Si no se proporciona, se crea una nueva
 * @returns {ModuleCompletionService} Instancia de ModuleCompletionService con dependencias inyectadas
 */
export function createModuleCompletionService(
	moduleCompletionModel?: ModuleCompletionModel
): ModuleCompletionService {
	const model = moduleCompletionModel || createModuleCompletionModel();
	return new ModuleCompletionService(model);
}

/**
 * Crea una nueva instancia de ModuleCompletionController con inyección de dependencias.
 *
 * @param {ModuleCompletionService} [moduleCompletionService] - Instancia opcional de ModuleCompletionService. Si no se proporciona, se crea una nueva
 * @param {ModuleCompletionModel} [moduleCompletionModel] - Instancia opcional de ModuleCompletionModel. Solo se usa si moduleCompletionService no se proporciona
 * @returns {ModuleCompletionController} Instancia de ModuleCompletionController con dependencias inyectadas
 */
export function createModuleCompletionController(
	moduleCompletionService?: ModuleCompletionService,
	moduleCompletionModel?: ModuleCompletionModel
): ModuleCompletionController {
	const service =
		moduleCompletionService ||
		createModuleCompletionService(moduleCompletionModel);
	return new ModuleCompletionController(service);
}

/**
 * Crea todas las instancias del módulo ModuleCompletion con sus dependencias correctamente inyectadas.
 *
 * @returns {{model: ModuleCompletionModel, service: ModuleCompletionService, controller: ModuleCompletionController}} Objeto con todas las instancias del módulo ModuleCompletion
 */
export function createModuleCompletionModule(): {
	model: ModuleCompletionModel;
	service: ModuleCompletionService;
	controller: ModuleCompletionController;
} {
	const model = createModuleCompletionModel();
	const service = createModuleCompletionService(model);
	const controller = createModuleCompletionController(service, model);

	return {
		model,
		service,
		controller,
	};
}
