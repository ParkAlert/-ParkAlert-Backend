import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "../auth/auth.service";

@Module({
	imports: [AuthModule],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway],
	exports: [ChatService],
})
export class ChatModule {}
