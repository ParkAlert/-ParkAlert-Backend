import { Controller, Post, Req, Body, UseGuards, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";
import {
	ApiOperation,
	ApiTags,
	ApiResponse,
	ApiOkResponse,
} from "@nestjs/swagger";
import { msgDto, historyDto, chatListDto } from "./chat.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@ApiTags("Chat")
@Controller("chat")
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post("/history")
	@ApiOperation({ summary: "get chat history from it's roomName" })
	async getChatHistory(@Req() request: Request, @Body() body: historyDto) {
		const roomName = this.chatService.generateRoomName(body.user1, body.user2);
		return await this.chatService.getChatHistory(roomName);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("/list")
	@ApiOperation({ summary: "get chat list" })
	@ApiOkResponse({ description: "成功", type: chatListDto })
	async getChatList(@Req() request: any) {
		const email = request.user.email;

		return await this.chatService.getChatList(email);
	}
}
