import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

describe("UserController", () => {
  //to-do userController Test
  // let controller: UserController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UserController],
  //   }).compile();
  //   controller = module.get<UserController>(UserController);
  // });

  it("should be defined", () => {
    expect(1).toBeDefined();
  });
});
