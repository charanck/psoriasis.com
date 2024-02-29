export class CustomResponse {
	static badRequestResponse(errorMessage?: string): Response {
		return new Response(
			JSON.stringify({
				error: errorMessage ? errorMessage : "Bad request",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		);
	}

	static successResponse(body?: any, status?: number): Response {
		return new Response(
			JSON.stringify({
				data: body ? body : null,
			}),
			{
				status: status ? status : 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
