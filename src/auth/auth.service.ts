import { UserService } from "../user/user.service";
import { Injectable, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@Inject(UserService) private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}
	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);

		if (!user) {
			return null;
		}

		if (user.email !== email) {
			return null;
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return null;
		}

		return user;
	}

	generateJwt(email: string) {
		const access_token: any = this.jwtService.sign({ email: email });
		return access_token;
	}

	getUserInfo(token: string) {
		const payload = this.jwtService.verify(token);
		return payload;
	}
}
