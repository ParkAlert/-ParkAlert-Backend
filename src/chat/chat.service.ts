import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument } from "./chat.model";
import { AuthService } from "src/auth/auth.service";
import { Model } from "mongoose";
import { historyDto, msgDto } from "./chat.dto";
@Injectable()
export class ChatService {
	constructor(
		private readonly authService: AuthService,
		@InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>
	) {}

	getUserInfo(token: string) {
		return this.authService.getUserInfo(token);
	}

	generateRoomName(user1: string, user2: string): string {
		return [user1, user2].sort().join("");
	}

	async getChatList(userEmail: string) {
		const results = { list: [] };
		const list = await this.chatModel.find({
			roomName: { $regex: userEmail },
		});

		for (const el of list) {
			results.list.push({
				target: el.roomName.replace(userEmail, ""),
				latestMsg: el.chatHistory[el.chatHistory.length - 1],
			});
		}
		return results;
	}

	async createChatRoom(roomName: string) {
		const chatRoom = await this.chatModel
			.findOne({ roomName: roomName })
			.exec();

		if (chatRoom) return chatRoom;

		const newChatRoom: any = await this.chatModel.create({
			roomName: roomName,
			chatHistory: [],
		});

		return newChatRoom;
	}

	async updateChatHistory(roomName: string, newChat: msgDto) {
		const chatRoom = await this.chatModel
			.findOne({ roomName: roomName })
			.exec();

		//已有此聊天室
		if (chatRoom) {
			chatRoom.chatHistory.push(newChat);
			await chatRoom.save();
		} else {
			//還未有聊天室
			await this.chatModel.create({
				roomName: roomName,
				chatHistory: [newChat],
			});
		}

		const finalChatRoom = await this.chatModel
			.findOne({ roomName: roomName })
			.exec();

		return finalChatRoom;
	}

	async getChatHistory(roomName: string) {
		return await this.chatModel.findOne({ roomName: roomName }).exec();
	}
}
