type SendEmailParams = {
	to: string;
	subject: string;
	text: string;
	html?: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.RESEND_FROM;

	if (!apiKey || !from) {
		console.warn("Email provider is not configured (RESEND_API_KEY/RESEND_FROM).");
		return;
	}

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from,
			to,
			subject,
			text,
			html,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.warn("Failed to send email:", response.status, errorText);
	}
}
