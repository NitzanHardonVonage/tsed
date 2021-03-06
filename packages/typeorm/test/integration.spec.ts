import {TestContext} from "@tsed/testing";
import {TestMongooseContext} from "@tsed/testing-mongoose";
import {expect} from "chai";
import {User} from "./helpers/entity/User";
import {UserRepository} from "./helpers/repository/UserRepository";
import {Server} from "./helpers/Server";
import {UserService} from "./helpers/services/UserService";

describe("TypeORM integration", () => {
  beforeEach(async () => {
    await TestMongooseContext.install();
    const {url} = await TestMongooseContext.getMongooseOptions();
    const bstrp = TestContext.bootstrap(Server, {
      typeorm: [
        {
          name: "default",
          type: "mongodb",
          url,
          entities: [
            User
          ],
          useUnifiedTopology: true
        }
      ]
    });

    await bstrp();
  });
  afterEach(TestMongooseContext.reset);

  it("should return repository", () => {
    const service = TestContext.injector.get<UserService>(UserService)!;

    expect(!!TestContext.injector.getProvider(UserRepository)).to.eq(true);
    service.should.instanceOf(UserService);
    service.repository.should.instanceOf(UserRepository);
    service.repo2.should.instanceOf(UserRepository);
  });
});
