import { ModuleController } from "../controllers/moduleController";
import { ModuleModel } from "../models/moduleModel";
import { ModuleService } from "../services/moduleService";

/**
 * Crea una nueva instancia de ModuleModel.
 *
 * @returns {ModuleModel} Instancia de ModuleModel
 */
export function createModuleModel(): ModuleModel {
	return new ModuleModel();
}

/**
 * Crea una nueva instancia de ModuleService con inyección de dependencias.
 *
 * @param {ModuleModel} [moduleModel] - Instancia opcional de ModuleModel. Si no se proporciona, se crea una nueva
 * @returns {ModuleService} Instancia de ModuleService con dependencias inyectadas
 */
export function createModuleService(moduleModel?: ModuleModel): ModuleService {
	const model = moduleModel || createModuleModel();
	return new ModuleService(model);
}

/**
 * Crea una nueva instancia de ModuleController con inyección de dependencias.
 *
 * @param {ModuleService} [moduleService] - Instancia opcional de ModuleService. Si no se proporciona, se crea una nueva
 * @param {ModuleModel} [moduleModel] - Instancia opcional de ModuleModel. Solo se usa si moduleService no se proporciona
 * @returns {ModuleController} Instancia de ModuleController con dependencias inyectadas
 */
export function createModuleController(
	moduleService?: ModuleService,
	moduleModel?: ModuleModel
): ModuleController {
	const service = moduleService || createModuleService(moduleModel);
	return new ModuleController(service);
}

/**
 * Crea todas las instancias del módulo Module con sus dependencias correctamente inyectadas.
 *
 * @returns {{model: ModuleModel, service: ModuleService, controller: ModuleController}} Objeto con todas las instancias del módulo Module
 */
export function createModuleModule(): {
	model: ModuleModel;
	service: ModuleService;
	controller: ModuleController;
} {
	const model = createModuleModel();
	const service = createModuleService(model);
	const controller = createModuleController(service, model);

	return {
		model,
		service,
		controller,
	};
}
