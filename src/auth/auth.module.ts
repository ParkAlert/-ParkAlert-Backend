import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { CookieStrategy } from "./cookie.strategy";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, CookieStrategy],
  exports: [AuthService],
})
export class AuthModule {}
