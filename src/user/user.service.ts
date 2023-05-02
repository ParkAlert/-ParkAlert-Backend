import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.model";
import { UserSession, UserSessionDocument } from "./userSession.model";
import { Model } from "mongoose";
import { userDto, updatePasswordDto } from "./user.dto";
import * as bcrypt from "bcrypt";

const saltLength = 9;
@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(UserSession.name)
		private readonly userSessionModel: Model<UserSessionDocument>
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

	async updateByEmail(data: updatePasswordDto) {
		const user: any = await this.findByEmail(data.email);
		user.password = data.newPassword;
		user.password = await bcrypt.hash(user.password, saltLength);
		const updatedUser = await user.save();
		return { email: updatedUser.email, id: updatedUser["_id"] };
	}

	async saveSession(email: string, sessionId: string) {
		const userSession = await this.userSessionModel
			.findOne({ email: email })
			.exec();
		if (!userSession) {
			//add a new userSession
			const sessionData: any = {
				sessionId: sessionId,
				email: email,
				expirationDate: new Date("1995-12-17T03:24:00"),
			};
			this.userSessionModel.create(sessionData);
		} else {
			userSession.sessionId = sessionId;
			userSession.expirationDate = new Date("1995-12-17T03:24:00");
			await userSession.save();
		}
		return userSession;
	}

	async removeSession(sessionId: string) {
		const user = await this.userSessionModel.findOneAndDelete({
			sessionId: sessionId,
		});

		if (!user) return null;

		return { email: user.email, id: user["_id"] };
	}

	async findUserFromSessionId(sessionId: string) {
		const userSession = await this.userSessionModel
			.findOne({ sessionId: sessionId })
			.exec();
		if (!userSession) return null;

		const user: any = await this.findByEmail(userSession.email);
		return user;
	}
}
