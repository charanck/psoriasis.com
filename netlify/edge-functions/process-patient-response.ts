import { CustomResponse } from "../../src/util/custom-response.ts";
import { config as sys_config } from "../../src/config/config.ts";
import { EmailService } from "../../src/service/email.ts";
import ejs from "ejs";
import { ProcessPatientEnquiryRequestDto } from "../../src/controller/patient.ts";

export default async (request: Request) => {
	if (request.method !== "POST") {
		return CustomResponse.badRequestResponse("request method not allowed");
	}
	const requestBody: any = await request.json();
	const processPatientEnquiryRequestDto: ProcessPatientEnquiryRequestDto = new ProcessPatientEnquiryRequestDto();
	processPatientEnquiryRequestDto.firstName = requestBody?.firstName;
	processPatientEnquiryRequestDto.lastName = requestBody?.lastName;
	processPatientEnquiryRequestDto.enquiry = requestBody?.enquiry;
	processPatientEnquiryRequestDto.number = requestBody?.number;
	// Email ejs template string
	const file = `
	<!doctype html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Simple Transactional Email</title>
  <style media="all" type="text/css">
    body {
      font-family: Helvetica, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 16px;
      line-height: 1.3;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-collapse: separate;
      width: 100%;
    }
  </style>
</head>

<body>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">This patient has enquired about the consulation</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">First name: <%= firstName %></li>
        <li class="list-group-item">Last name: <%= lastName %></li>
        <li class="list-group-item">Whatsapp Number: <%= number %></li>
        <p> <strong>Enquiry: </strong><%= enquiry %></p>
      </ul>
    </div>
  </div>
</body>

</html>
	`;
	const emailContent = ejs.render(file,{
		firstName: requestBody.firstName,
		lastName: requestBody.lastName,
		number: requestBody.number,
		enquiry: requestBody.enquiry,
	});
	const emailService = new EmailService();
	await emailService.sendEmail({
		from: sys_config.GMAIL,
		to: sys_config.EMAIL_TO,
		subject: "Patient Enquiry",
		html: emailContent,
	});
	return CustomResponse.successResponse(requestBody, 201);
};
export const config = { path: "/patient-response-edge" };

