import nodemailer from "nodemailer";
import { config } from "../config/config.ts";

export class EmailService {
	async sendEmail(emailOptions: EmailOptions): Promise<void> {
        
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: config.GMAIL,
				pass: config.GOOGLE_APP_PASSWORD,
			},
		});

		const mailOptions = {
			from: emailOptions.from,
			to: emailOptions.to,
			subject: emailOptions.subject,
			html: emailOptions.html,
		};

		return transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email: ", error);
			} else {
				console.log("Email sent: ", info.response);
			}
		});
	}
}

export interface EmailOptions {
	from: string;
	to: string;
	subject: string;
	html: string;
}
