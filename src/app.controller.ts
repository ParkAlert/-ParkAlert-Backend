import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: "The server is running" })
  @ApiOperation({ summary: "Health Check Path" })
  checkServerStatus(): any {
    return "Server is running";
  }
}
