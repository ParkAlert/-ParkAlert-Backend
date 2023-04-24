import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";

describe("root", () => {
  let appService: AppService;
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService, configService);
  });

  it("should return 'Server is running'", () => {
    expect(appController.checkServerStatus()).toBe("Server is running");
  });
});
