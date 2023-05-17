import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/auth/auth.module";
import { Chat, ChatSchema } from "./chat.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		AuthModule,
		MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
	],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway],
	exports: [ChatService],
})
export class ChatModule {}
