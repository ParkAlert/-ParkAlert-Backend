import { UserService } from "../user/user.service";
import { Injectable, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
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

  async isAuth(sessionId) {
    const user = await this.userService.findUserFromSessionId(sessionId);
    if (user) return { email: user.email, id: user["_id"] };
    else return false;
  }

  async saveAuth(email: string, sessionId: string) {
    //use session id to find user
    const user = await this.userService.saveSession(email, sessionId);
    if (user) return user;
    else return false;
  }

  async removeAuth(email: string) {
    const user = await this.userService.removeSession(email);

    return user;
    //remove session
  }
}
