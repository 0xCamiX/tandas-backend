import * as cron from "node-cron";
import { cleanupExpiredSessionsJob } from "./cleanupSessions";

/**
 * Configuración de los jobs programados
 * 
 * Formato cron: "minuto hora día mes día-semana"
 * Ejemplo: "0 2 * * *" = Todos los días a las 2:00 AM
 */
export function startScheduledJobs(): void {
	// Limpiar sesiones expiradas todos los días a las 2:00 AM
	const cleanupSchedule = process.env.CLEANUP_SESSIONS_SCHEDULE || "0 2 * * *";

	cron.schedule(cleanupSchedule, async () => {
		console.log("[Scheduler] Ejecutando limpieza de sesiones expiradas...");
		await cleanupExpiredSessionsJob();
	});

	console.log(
		`[Scheduler] Job de limpieza de sesiones programado: ${cleanupSchedule}`
	);
	console.log("[Scheduler] Los jobs programados están activos");
}

