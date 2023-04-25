import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserSessionDocument = UserSession & Document;

@Schema()
export class UserSession {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  sessionId: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  expirationDate: Date;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
