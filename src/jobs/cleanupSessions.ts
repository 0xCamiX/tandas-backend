import { prisma } from "../db/prisma";

/**
 * Elimina todas las sesiones expiradas de la base de datos
 *
 * @returns {Promise<number>} Número de sesiones eliminadas
 */
export async function cleanupExpiredSessions(): Promise<number> {
	try {
		const result = await prisma.session.deleteMany({
			where: {
				expiresAt: {
					lt: new Date(), // Menor que la fecha actual = expiradas
				},
			},
		});

		return result.count;
	} catch (error) {
		console.error("[Cleanup Sessions] Error al limpiar sesiones:", error);
		throw error;
	}
}

/**
 * Job programado para limpiar sesiones expiradas
 * Ejecuta la limpieza y registra el resultado
 */
export async function cleanupExpiredSessionsJob(): Promise<void> {
	try {
		const deletedCount = await cleanupExpiredSessions();
		console.log(
			`[Cleanup Sessions] Eliminadas ${deletedCount} sesiones expiradas`
		);
	} catch (error) {
		console.error("[Cleanup Sessions] Error en el job:", error);
	}
}

