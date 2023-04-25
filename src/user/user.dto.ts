import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
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

export class userSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty()
  @IsNotEmpty()
  expirationDate: Date;
}
