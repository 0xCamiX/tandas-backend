import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import { prisma } from "../db/prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, token }) => {
			const frontendUrl = process.env.NEXT_PUBLIC_URL;
			const resetUrl = frontendUrl
				? `${frontendUrl}/reset-password?token=${token}`
				: undefined;

			if (!resetUrl) {
				console.warn("NEXT_PUBLIC_URL is not configured; cannot build reset URL.");
				return;
			}

			void sendEmail({
				to: user.email,
				subject: "Restablece tu contraseña",
				text: `Haz clic en el enlace para restablecer tu contraseña: ${resetUrl}`,
				html: `
          <p>Hola,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p><a href="${resetUrl}">Restablecer contraseña</a></p>
          <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        `,
			});
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	trustedOrigins: [process.env.NEXT_PUBLIC_URL as string],
	plugins: [bearer()],
});
