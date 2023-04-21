import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.model";
import { Model } from "mongoose";
import { userDto, updatePasswordDto } from "./user.dto";
import * as bcrypt from "bcrypt";

const saltLength = 9;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}
  async create(user: userDto) {
    user.password = await bcrypt.hash(user.password, saltLength);
    return this.userModel.create(user);
  }
  findById(id: string) {
    return this.userModel.findById(id);
  }
  async updateById(id: string, data: updatePasswordDto) {
    const user = await this.userModel
      .findById(id)
      .select("email password")
      .exec();

    if (user.email !== data.email) {
      throw new ForbiddenException("Email is wrong");
    }

    const isValidPassword = await bcrypt.compare(
      data.oldPassword,
      user.password
    );
    if (!isValidPassword) {
      throw new ForbiddenException("Password is wrong");
    }
    user.password = data.newPassword;
    user.password = await bcrypt.hash(user.password, saltLength);
    const updatedUser = await user.save();
    return updatedUser;
  }
}
