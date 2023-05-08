import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	Res,
	ValidationPipe,
	UseGuards,
	Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { userDto, oAuthDto } from "./user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";

@ApiTags("User")
@Controller("users")
@UsePipes(ValidationPipe)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}
	@Post()
	@ApiOperation({ summary: "Create a new user" })
	create(@Body() body: userDto) {
		return this.userService.create(body);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("/isAuth")
	@ApiOperation({ summary: "Check auth status" })
	isAuth(@Req() request: Request) {
		return request.user;
	}

	@UseGuards(AuthGuard("local"))
	@Post("/signin")
	@ApiOperation({ summary: "singin and get access token" })
	signin(
		@Req() request: Request,
		@Res({ passthrough: true }) res: any,
		@Body() body: userDto
	) {
		const jwt = this.authService.generateJwt(body.email);
		return jwt;
	}

	@Post("/google_signin")
	@ApiOperation({
		summary: "Give the google token to signin and get access token",
	})
	async google_signin(@Body() body: oAuthDto) {
		const response = await fetch(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: {
					Authorization: `Bearer ${body.oAuthToken}`,
				},
			}
		);
		const data = await response.json();
		const jwt = this.authService.generateJwt(data.email);
		return jwt;
	}
}
