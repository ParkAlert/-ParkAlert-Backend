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

@WebSocketGateway({
	transports: ["websocket", "polling", "flashsocket"],
	cors: { origin: "http://localhost:3000" },
})
@Injectable()
export class ChatGateway implements OnModuleInit {
	constructor(private readonly chatService: ChatService) {}
	@WebSocketServer()
	server: Server;
	userEmail = "";
	chatHistory = [];
	onModuleInit() {
		this.server.on("connection", socket => {
			if (socket.handshake.headers.authorization) {
				const token = socket.handshake.headers.authorization.replace(
					"Bearer ",
					""
				);
				this.userEmail = this.chatService.getUserInfo(token).email;
			}

			const target = socket.handshake.headers.chatwith;
			const roomName = [this.userEmail, target].sort().join("");
			socket.join(roomName);
		});
	}

	@SubscribeMessage("newMessage")
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: any) {
		let tempUser = "";
		if (socket.handshake.headers.authorization) {
			const token = socket.handshake.headers.authorization.replace(
				"Bearer ",
				""
			);
			tempUser = this.chatService.getUserInfo(token).email;
		}
		const obj = {};
		obj[tempUser] = body;
		this.chatHistory.push(obj);
		this.server.emit("onMessage", this.chatHistory);
	}
}
