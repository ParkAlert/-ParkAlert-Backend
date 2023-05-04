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
