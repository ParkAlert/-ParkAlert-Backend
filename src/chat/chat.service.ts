import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
@Injectable()
export class ChatService {
	constructor(private readonly authService: AuthService) {}

	getUserInfo(token: string) {
		return this.authService.getUserInfo(token);
	}
}
