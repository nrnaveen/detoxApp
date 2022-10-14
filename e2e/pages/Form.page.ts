import { element, by, expect, waitFor } from "detox";
// import { render, fireEvent } from "@testing-library/react-native";

class FormScreenPage {
  static async replaceTextAndTapReturnKey(id: string, text: string) {
    console.log(id, text);
    await element(by.id(id)).replaceText(text);
    await element(by.id(id)).tapReturnKey();
    // fireEvent(getByTestId('input'), 'blur');
  }

  static async replaceText(id: string, text: string) {
    await element(by.id(id)).replaceText(text);
  }

  static async Form(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    await this.replaceTextAndTapReturnKey("textInput_firstName", firstName);
    await this.replaceTextAndTapReturnKey("textInput_lastName", lastName);
    await this.replaceTextAndTapReturnKey("textInput_email", email);
    await this.replaceTextAndTapReturnKey("textInput_password", password);
    await element(by.id("submit_form")).tap();
  }

  static async pageIsOffline() {
    await expect(element(by.id("form_page"))).not.toBeVisible();
  }

  static async pageIsOnline() {
    await expect(element(by.id("textInput_firstName"))).toBeVisible();
  }
}

export default FormScreenPage;
