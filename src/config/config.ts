import dotenv from "dotenv";
dotenv.config();

export const config: IConfig = {
    GMAIL: process.env["GMAIL"] ? process.env["GMAIL"]  : "",
    GOOGLE_APP_PASSWORD: process.env["GOOGLE_APP_PASSWORD"] ? process.env["GOOGLE_APP_PASSWORD"]  : "",
    EMAIL_TO: process.env["EMAIL_TO"] ? process.env["EMAIL_TO"]  : ""

}

export interface IConfig {
	GMAIL: string;
	GOOGLE_APP_PASSWORD: string;
	EMAIL_TO: string;
}
