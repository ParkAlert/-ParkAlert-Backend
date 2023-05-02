import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsEmail } from "class-validator";

export class userDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;
}

export class updatePasswordDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	newPassword: string;
}
