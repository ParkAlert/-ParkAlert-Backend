import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";

@Module({
	imports: [ChatGateway],
	controllers: [ChatController],
	providers: [ChatService],
})
export class ChatModule {}
