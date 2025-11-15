import { QuizController } from "../controllers/quizController";
import { QuizAttemptModel } from "../models/quizAttemptModel";
import { QuizModel } from "../models/quizModel";
import { QuizService } from "../services/quizService";

/**
 * Crea una nueva instancia de QuizModel.
 *
 * @returns {QuizModel} Instancia de QuizModel
 */
export function createQuizModel(): QuizModel {
	return new QuizModel();
}

/**
 * Crea una nueva instancia de QuizAttemptModel.
 *
 * @returns {QuizAttemptModel} Instancia de QuizAttemptModel
 */
export function createQuizAttemptModel(): QuizAttemptModel {
	return new QuizAttemptModel();
}

/**
 * Crea una nueva instancia de QuizService con inyección de dependencias.
 *
 * @param {QuizModel} [quizModel] - Instancia opcional de QuizModel. Si no se proporciona, se crea una nueva
 * @param {QuizAttemptModel} [quizAttemptModel] - Instancia opcional de QuizAttemptModel. Si no se proporciona, se crea una nueva
 * @returns {QuizService} Instancia de QuizService con dependencias inyectadas
 */
export function createQuizService(
	quizModel?: QuizModel,
	quizAttemptModel?: QuizAttemptModel
): QuizService {
	const model = quizModel || createQuizModel();
	const attemptModel = quizAttemptModel || createQuizAttemptModel();
	return new QuizService(model, attemptModel);
}

/**
 * Crea una nueva instancia de QuizController con inyección de dependencias.
 *
 * @param {QuizService} [quizService] - Instancia opcional de QuizService. Si no se proporciona, se crea una nueva
 * @param {QuizModel} [quizModel] - Instancia opcional de QuizModel. Solo se usa si quizService no se proporciona
 * @param {QuizAttemptModel} [quizAttemptModel] - Instancia opcional de QuizAttemptModel. Solo se usa si quizService no se proporciona
 * @returns {QuizController} Instancia de QuizController con dependencias inyectadas
 */
export function createQuizController(
	quizService?: QuizService,
	quizModel?: QuizModel,
	quizAttemptModel?: QuizAttemptModel
): QuizController {
	const service = quizService || createQuizService(quizModel, quizAttemptModel);
	return new QuizController(service);
}

/**
 * Crea todas las instancias del módulo Quiz con sus dependencias correctamente inyectadas.
 *
 * @returns {{quizModel: QuizModel, quizAttemptModel: QuizAttemptModel, service: QuizService, controller: QuizController}} Objeto con todas las instancias del módulo Quiz
 */
export function createQuizModule(): {
	quizModel: QuizModel;
	quizAttemptModel: QuizAttemptModel;
	service: QuizService;
	controller: QuizController;
} {
	const quizModel = createQuizModel();
	const quizAttemptModel = createQuizAttemptModel();
	const service = createQuizService(quizModel, quizAttemptModel);
	const controller = createQuizController(service, quizModel, quizAttemptModel);

	return {
		quizModel,
		quizAttemptModel,
		service,
		controller,
	};
}
