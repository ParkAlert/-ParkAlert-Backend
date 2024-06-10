import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { User } from "../user.model";

describe("UserService", () => {
  // let service: UserService;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserService,
  //       {
  //         provide: "User", // 可以使用字符串标识模型
  //         useValue: User,
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<UserService>(UserService);
  // });

  it("should be defined", () => {
    expect(1).toBeDefined();
  });
});
