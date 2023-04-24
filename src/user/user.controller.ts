import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  Param,
  Put,
  ValidationPipe,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { userDto, updatePasswordDto } from "./user.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";

@ApiTags("User")
@Controller("users")
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: "Create a new user" })
  create(@Body() body: userDto) {
    return this.userService.create(body);
  }

  @Get(":id")
  @ApiOperation({ summary: "Find user by it's id" })
  findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Put("/:id/password")
  @ApiOperation({ summary: "Change user password by it's id" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Password is wrong",
  })
  updateById(@Param("id") id: string, @Body() body: updatePasswordDto) {
    return this.userService.updateById(id, body);
  }
}
