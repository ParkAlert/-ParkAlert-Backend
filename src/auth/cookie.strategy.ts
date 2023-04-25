import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-cookie";
import { AuthService } from "./auth.service";

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, "cookie") {
  constructor(private readonly authService: AuthService) {
    super({
      cookieName: "sessionId",
    });
  }

  async validate(payload: any) {
    return await this.authService.isAuth(payload);
  }
}
