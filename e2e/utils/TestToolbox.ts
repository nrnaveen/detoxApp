import { device, element, by, expect } from "detox";

function getDetoxURLBlacklistRegexFromDomains(domains: string[]) {
  return `\\(${domains.map((domain) => `".*${domain}.*"`).join(",")}\\)`;
}

export async function relaunchApp() {
  await launchApp({
    delete: true,
    permissions: {
      location: "always",
      camera: "YES",
      notifications: "YES",
      userTracking: "YES",
    },
  });
}

export async function launchApp(
  config: Detox.DeviceLaunchAppConfig = {
    delete: false,
    permissions: {
      location: "inuse",
      camera: "YES",
      notifications: "YES",
      userTracking: "YES",
    },
  },
) {
  // const detoxURLBlacklistRegex = getDetoxURLBlacklistRegexFromDomains([
  //   "codepush.appcenter.ms",
  //   "segment.io",
  //   "play.google.com",
  //   "adjust.com",
  //   "clientstream.launchdarkly.com",
  // ]);
  // await device.launchApp({
  //   ...config,
  //   // launchArgs: {
  //   //   detoxURLBlacklistRegex,
  //   // },
  // });
  await device.launchApp();
}

export async function goBack() {
  if (device.getPlatform() === "android") {
    await device.pressBack();
  } else {
    await element(by.type("_UIButtonBarButton")).tap();
  }
}

/* Does a backButton press as the custom's header back icon overwrites the native element */
export async function customBack() {
  if (device.getPlatform() === "android") {
    await device.pressBack();
  } else {
    await element(by.id("go-back-button")).tap();
  }
}

// Helps on syncing issues like:
// detox[9456] INFO:  [APP_STATUS] App synchronization *****:
// The app is busy, due to:
// 	 - UI rendering activity
//
// use it with different expectations, e.g.:
//     await waitFor(element(by.id('view_error_bar')))
//       .not.toBeVisible()
//       .withTimeout(5000);
export async function disableSynchronizationOnAndroid() {
  if (device.getPlatform() === "android") {
    await device.disableSynchronization();
  }
}

export async function enableSynchronizationOnAndroid() {
  if (device.getPlatform() === "android") {
    await device.enableSynchronization();
  }
}

export async function elementWithTextIsVisible(id: string, text: string) {
  const matcher = by.id(id);
  const textMatcher = by.text(text).withAncestor(matcher);
  const textElement = element(textMatcher);
  await expect(textElement).toBeVisible();
}

export async function tapDialogueWithText(text: string) {
  if (device.getPlatform() === "ios") {
    await element(
      by.type("_UIAlertControllerActionView").withDescendant(by.text(text)),
    ).tap();
  } else {
    await element(by.text(text)).tap();
  }
}

export async function scrollIntoView(
  element: Detox.NativeElement,
  scrollerMatcher: Detox.NativeMatcher,
  direction: "down" | "up" = "down",
) {
  await waitFor(element)
    .toBeVisible()
    .whileElement(scrollerMatcher)
    .scroll(300, direction);
}

export async function selectPickerEntry(entry: string) {
  const scroller = by.id("picker-dialog-scroller");

  await expect(element(scroller)).toBeVisible();

  let hasTapped = false;
  const option = element(by.text(entry).withAncestor(scroller));

  while (!hasTapped) {
    await scrollIntoView(option, scroller);

    await option.tap();

    try {
      await expect(element(scroller)).not.toBeVisible();
      hasTapped = true;
    } catch (e) {
      // what can happen is that the element we wanted to tap is right below the first "page" of the scroll view
      // so that it's partially in sight. this makes it "visible" by detox, but it can't be tapped!
      // try scrolling the view just a little bit so it becomes visible and tappable.
      await element(scroller).scroll(100, "down");
    }
  }
}

export async function selectPickerEntryBySearch(entry: string) {
  const scroller = by.id("picker-dialog-scroller");
  await expect(element(scroller)).toBeVisible();
  await element(by.id("picker_search")).tap();
  await element(by.id("picker_search")).replaceText(entry);
  const option = element(by.text(entry).withAncestor(scroller));
  await expect(option).toBeVisible();
  await option.tap();
  await expect(element(scroller)).not.toBeVisible();
}

export async function timeoutOnAndroid(ms: number) {
  if (device.getPlatform() === "android") {
    await timeout(ms);
  }
}

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function elementIsVisible(element: Detox.NativeElement) {
  try {
    await waitFor(element).toBeVisible().withTimeout(5000);
    return true;
  } catch (e) {
    return false;
  }
}

export async function executeWithDismissLocation(
  method: () => Promise<Detox.Expect<any> | void>,
  methodAfterPressBack?: () => Promise<Detox.Expect<any> | void>,
): Promise<void> {
  try {
    await method();
  } catch (e) {
    if (device.getPlatform() === "android") {
      await device.pressBack();
    }
    if (methodAfterPressBack) {
      await methodAfterPressBack();
    } else {
      await method();
    }
  }
}

export async function openDebug() {
  await element(by.id("debug_button")).tap();
}

export async function tapTo(id: string) {
  await element(by.id(id)).tap();
}
