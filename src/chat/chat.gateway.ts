import { OnModuleInit } from "@nestjs/common";
import {
	WebSocketGateway,
	SubscribeMessage,
	WsResponse,
	WebSocketServer,
	WsException,
	MessageBody,
	ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "dgram";

import { Server } from "socket.io";
import { JwtStrategy } from "../auth/jwt.strategy";
import { AuthService } from "src/auth/auth.service";
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
	onModuleInit() {
		this.server.on("connection", socket => {
			if (socket.handshake.headers.authorization) {
				const token = socket.handshake.headers.authorization.replace(
					"Bearer ",
					""
				);
				this.userEmail = this.chatService.getUserInfo(token).email;
				console.log(this.userEmail + " is Connected");
			}

			socket.join("chatRoom");
		});
	}

	@SubscribeMessage("newMessage")
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: any) {
		console.log(body);
		this.server.emit("onMessage", "我是另一個人，我收到你發的 : " + body);
	}
}
