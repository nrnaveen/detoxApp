import { tapTo } from "../utils/TestToolbox";

describe("All Page", () => {
  // beforeAll(async () => {
  //   await device.launchApp();
  // });
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have Form Page screen", async () => {
    await tapTo("form-nav");
    await expect(element(by.id("form_page"))).toBeVisible();
    await tapTo("go_back_form");
  });

  it("should have Notificaion Page screen", async () => {
    await tapTo("notification-nav");
    await expect(element(by.id("notification_page"))).toBeVisible();
    await tapTo("go_back_notification");
  });

  it("should have Profile Page screen", async () => {
    await tapTo("profile-nav");
    await expect(element(by.id("profile_page"))).toBeVisible();
    await tapTo("go_back_profile");
  });
});
