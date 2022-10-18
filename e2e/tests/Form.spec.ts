import FormScreenPage from "../pages/Form.page";
import { user } from "../data/user";
import { tapTo } from "../utils/TestToolbox";
// import {  } from "@testing-library/react-native";
// import { customBack, goBack, relaunchApp } from "../utils/TestToolbox";

describe("Form Page", () => {
  beforeAll(async () => {
    await device.launchApp();
    await tapTo("form-nav");
    await FormScreenPage.Form(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
    );
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it("should have form screen", async () => {
    await tapTo("form-nav");
    await expect(element(by.id("textInput_firstName"))).toBeVisible();
    await expect(element(by.id("textInput_lastName"))).toBeVisible();
    await expect(element(by.id("textInput_email"))).toBeVisible();
    await expect(element(by.id("textInput_password"))).toBeVisible();
    await tapTo("go_back_form");
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
