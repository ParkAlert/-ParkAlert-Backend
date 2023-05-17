import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class msgDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	msg: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	time: string;
}
export class historyDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	user1: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	user2: string;
}

class singleChatDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	target: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	latestMsg: msgDto;
}
export class chatListDto {
	@ApiProperty({ type: [singleChatDto] })
	list: singleChatDto[];
}
