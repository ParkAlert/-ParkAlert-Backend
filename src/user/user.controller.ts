import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	Res,
	Put,
	ValidationPipe,
	HttpStatus,
	UseGuards,
	Req,
	Header,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { userDto, updatePasswordDto } from "./user.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";
import * as cookieParser from "cookie-parser";

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

	@Put("/password")
	@UseGuards(AuthGuard("local"))
	@UseGuards(AuthGuard("cookie"))
	@ApiOperation({ summary: "Change user password by it's e-mail" })
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "Password is wrong",
	})
	updateByEmail(@Body() body: updatePasswordDto, @Req() request: Request) {
		const sessionId: any = cookieParser.JSONCookies(request.cookies).sessionId;
		this.authService.removeAuth(sessionId);
		return this.userService.updateByEmail(body);
	}

	@UseGuards(AuthGuard("cookie"))
	@Get("/isAuth")
	isAuth(@Req() request: Request) {
		return request.user;
	}

	@UseGuards(AuthGuard("local"))
	@Post("/signin")
	signin(@Req() request: Request, @Res({ passthrough: true }) res: any) {
		//有了就沒發，造成沒有新的id出來
		const sessionId: any = cookieParser.JSONCookies(request.cookies).sessionId;
		this.authService.removeAuth(sessionId);
		request.session["user"] = request.user;
		this.authService.saveAuth(request.user["email"], request.sessionID);
		res.cookie("sessionId", request.sessionID, {
			expires: new Date(Date.now() + 3600000),
			httpOnly: true,
			secure: false,
			sameSite: "strict",
		});

		return request.user;
	}

	@UseGuards(AuthGuard("cookie"))
	@Get("/signout")
	signout(@Req() request: Request) {
		const sessionId: any = cookieParser.JSONCookies(request.cookies).sessionId;
		return this.authService.removeAuth(sessionId);
	}
}
