import { CustomResponse } from "../util/custom-response.ts";

export class PatientController {
	constructor(private patientServie: IPatientService) {}

	async processPatientEnquiry(
		enquiryData: ProcessPatientEnquiryRequestDto
	): Promise<Response> {
		// Validation for the requestData
		if (!enquiryData.firstName || String(enquiryData.firstName) === "") {
			return CustomResponse.badRequestResponse("firstname is required");
		}
		if (!enquiryData.lastName || String(enquiryData.lastName) === "") {
			return CustomResponse.badRequestResponse("lastname is required");
		}
		if (!enquiryData.number || Number.isNaN(enquiryData.number)) {
			return CustomResponse.badRequestResponse(
				"phone number is required"
			);
		}
		if (!enquiryData.enquiry || String(enquiryData.enquiry) === "") {
			return CustomResponse.badRequestResponse("enquiry is required");
		}

		await this.patientServie.sendPatientEnquiryAsEmail(enquiryData);

		return CustomResponse.successResponse(
			null,
			201
		);
	}
}

export class ProcessPatientEnquiryRequestDto {
	firstName: string;
	lastName: string;
	number: number;
	enquiry: string;
}

interface IPatientService {
	sendPatientEnquiryAsEmail(
		enquiryData: ProcessPatientEnquiryRequestDto
	): Promise<void>;
}
