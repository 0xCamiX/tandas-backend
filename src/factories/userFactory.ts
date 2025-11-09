import { UserController } from "../controllers/userController";
import { UserModel } from "../models/userModel";
import { UserService } from "../services/userService";

/**
 * Crea una nueva instancia de UserModel.
 *
 * @returns {UserModel} Instancia de UserModel
 */
export function createUserModel(): UserModel {
	return new UserModel();
}

/**
 * Crea una nueva instancia de UserService con inyección de dependencias.
 *
 * @param {UserModel} [userModel] - Instancia opcional de UserModel. Si no se proporciona, se crea una nueva
 * @returns {UserService} Instancia de UserService con dependencias inyectadas
 */
export function createUserService(userModel?: UserModel): UserService {
	const model = userModel || createUserModel();
	return new UserService(model);
}

/**
 * Crea una nueva instancia de UserController con inyección de dependencias.
 *
 * @param {UserService} [userService] - Instancia opcional de UserService. Si no se proporciona, se crea una nueva
 * @param {UserModel} [userModel] - Instancia opcional de UserModel. Solo se usa si userService no se proporciona
 * @returns {UserController} Instancia de UserController con dependencias inyectadas
 */
export function createUserController(
	userService?: UserService,
	userModel?: UserModel
): UserController {
	const service = userService || createUserService(userModel);
	return new UserController(service);
}

/**
 * Crea todas las instancias del módulo User con sus dependencias correctamente inyectadas.
 *
 * @returns {{model: UserModel, service: UserService, controller: UserController}} Objeto con todas las instancias del módulo User
 */
export function createUserModule(): {
	model: UserModel;
	service: UserService;
	controller: UserController;
} {
	const model = createUserModel();
	const service = createUserService(model);
	const controller = createUserController(service, model);

	return {
		model,
		service,
		controller,
	};
}
