import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.model";
import { Model } from "mongoose";
import { userDto } from "./user.dto";
import * as bcrypt from "bcrypt";

const saltLength = 9;
@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>
	) {}

	async create(user: userDto) {
		const existingUser = await this.userModel.findOne({ email: user.email });

		if (existingUser) {
			throw new ConflictException("Email already exists");
		}

		user.password = await bcrypt.hash(user.password, saltLength);
		const newUser: any = await this.userModel.create(user);
		return { email: newUser.email, id: newUser["_id"] };
	}

	async findByEmail(email: string) {
		return await this.userModel.findOne({ email: email }).exec();
	}
}
