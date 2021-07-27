import { describe, it} from "mocha";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "chai/register-should";
import * as smsService from "../../src/resources/sms/sms.service";

chai.use(chaiAsPromised);
const expect = chai.expect;
const should = chai.should();

describe("Notification service", () => {
  it("should fail when null is passed", async () => {
    const params = {}
    try {
      await smsService.sendMessageUponClientRestfulRequest(params);
    } catch (error) {
      expect(error?.message).contains("request body is required");
      expect(error?.statusCode).equals(400);
    }
  });

  it("should fail when an invalid request is passed", async () => {
    const notificationModel: NotificationModel = {
      message: "sms message",
      userIds: "userId",
      allUsers: "hjhdjh",
      userType: "bwqn",
      sender: "push",
      type: "string",
    };

    try {
      await smsService.sendMessageUponClientRestfulRequest(
        notificationModel
      );
    } catch (error) {
      expect(error?.message).contains("is required");
      expect(error?.statusCode).equals(400);
    }
  });

  it("should fail if invalid userId is supplied", async () => {
    const notificationModel: NotificationModel = {
      message: "sms message",
      userIds: ["uhvbn", "idjkm", "jhdgyuih"],
      allUsers: "true",
      userType: "admin",
      sender: "swvl",
      type: "PUSH",
    };

    try {
      await smsService.sendMessageUponClientRestfulRequest(
        notificationModel
      );
    } catch (error) {
      error.message.should.exist;
      expect(error?.statusCode).equals(400);
    }
  });

  it("should successfully send sms to users ", async () => {
    const notificationModel: NotificationModel = {
      message: "Hello there!",
      userIds: ["cefc3e", "cbrc3d"],
      allUsers: "true",
      userType: "admin",
      sender: "swvl",
      type: "SMS",
    };
    try {
        await smsService.sendMessageUponClientRestfulRequest(notificationModel);
    } catch (error) {
        expect(error?.message).contains("request body is required");
        expect(error?.statusCode).equals(400);
    }
  });
});
