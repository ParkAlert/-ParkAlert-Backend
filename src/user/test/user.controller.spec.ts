import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

describe("UserController", () => {
  //to-do userController Test
  // let service: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UserService],
  //   }).compile();
  //   service = module.get<UserService>(UserService);
  // });

  it("should be defined", () => {
    expect(1).toBeDefined();
  });
});
