import { OnModuleInit } from "@nestjs/common";
import {
	WebSocketGateway,
	SubscribeMessage,
	WebSocketServer,
	MessageBody,
	ConnectedSocket,
} from "@nestjs/websockets";

import { Server } from "socket.io";
import { ChatService } from "./chat.service";
import { Injectable } from "@nestjs/common";
import { msgDto } from "./chat.dto";

@WebSocketGateway({
	transports: ["websocket", "polling", "flashsocket"],
	cors: true,
})
@Injectable()
export class ChatGateway implements OnModuleInit {
	constructor(private readonly chatService: ChatService) {}
	@WebSocketServer()
	server: Server;
	onModuleInit() {
		this.server.on("connection", socket => {
			let userEmail = "";
			let roomName = "";
			if (socket.handshake.headers.authorization) {
				const token = socket.handshake.headers.authorization.replace(
					"Bearer ",
					""
				);
				userEmail = this.chatService.getUserInfo(token).email;
			}

			if (!userEmail) socket.disconnect();

			const target = socket.handshake.headers.chatwith;

			if (!target) socket.disconnect();
			roomName = [userEmail, target].sort().join("");
			socket.join(roomName);
		});
	}

	@SubscribeMessage("newMessage")
	async onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: any) {
		let userEmail = "";
		let roomName = "";
		if (socket.handshake.headers.authorization) {
			const token = socket.handshake.headers.authorization.replace(
				"Bearer ",
				""
			);
			userEmail = this.chatService.getUserInfo(token).email;
		}

		if (!userEmail) socket.disconnect();

		const target = socket.handshake.headers.chatwith;

		if (!target) socket.disconnect();
		roomName = [userEmail, target].sort().join("");

		const msgObj: msgDto = {
			name: userEmail,
			msg: body,
			time: new Date().toLocaleString(),
		};

		const msgHistory = await this.chatService.updateChatHistory(
			roomName,
			msgObj
		);

		this.server.to(roomName).emit("onMessage", msgHistory);
	}
}
