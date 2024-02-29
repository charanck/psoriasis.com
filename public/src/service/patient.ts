import ejs from "ejs";
import fs from "fs";
import path from "path";
import { ProcessPatientEnquiryRequestDto } from "../controller/patient";
import { config } from "../../src/config/config.ts";
import { EmailOptions, EmailService } from "./email";

export class PatientService {
    constructor(private emailService: IEmailService){}
	async sendPatientEnquiryAsEmail(
		enquiryData: ProcessPatientEnquiryRequestDto
	): Promise<void> {
		const emailTemplateString: string = fs
			.readFileSync(
				path.resolve(
					__dirname,
					"../../email-template/patient-enquiry.ejs"
				)
			)
			.toString();
		const emailHtmlContent = ejs.render(emailTemplateString, {
			firstName: enquiryData.firstName,
			lastName: enquiryData.lastName,
			number: enquiryData.number,
			enquiry: enquiryData.enquiry,
		});
		await this.emailService.sendEmail({
			from: config.GMAIL,
			to: config.EMAIL_TO,
			subject: "Patient Enquiry",
			html: emailHtmlContent,
		});
	}
}

interface IEmailService {
    sendEmail(emailOptions: EmailOptions): Promise<void>
}
