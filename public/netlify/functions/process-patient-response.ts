import type { Context, Config } from "@netlify/functions";
import { CustomResponse } from "../../src/util/custom-response.ts";
import {
	PatientController,
	ProcessPatientEnquiryRequestDto,
} from "../../src/controller/patient.ts";
import { EmailService } from "../../src/service/email.ts";
import { PatientService } from "../../src/service/patient.ts";

export default async (request: Request, context: Context) => {
	//Setting up dependencies
	const emailService = new EmailService();
	const patientService = new PatientService(emailService);
	const patientController = new PatientController(patientService);

	if (request.method !== "POST") {
		return CustomResponse.badRequestResponse("request method not allowed");
	}

	const requestBody: any = await request.json();
	const processPatientEnquiryRequestDto: ProcessPatientEnquiryRequestDto =
		new ProcessPatientEnquiryRequestDto();
	processPatientEnquiryRequestDto.firstName = requestBody?.firstName;
	processPatientEnquiryRequestDto.lastName = requestBody?.lastName;
	processPatientEnquiryRequestDto.enquiry = requestBody?.enquiry;
	processPatientEnquiryRequestDto.number = requestBody?.number;

	await patientController.processPatientEnquiry(
		processPatientEnquiryRequestDto
	);
};

export const config: Config = {
	path: "/patient-response",
};
