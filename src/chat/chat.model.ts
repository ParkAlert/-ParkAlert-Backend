import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { msgDto } from "./chat.dto";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
	@ApiProperty()
	@Prop({ required: true, unique: true })
	roomName: string;

	@ApiProperty()
	@Prop({ required: true, type: [Object] })
	chatHistory: msgDto[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
