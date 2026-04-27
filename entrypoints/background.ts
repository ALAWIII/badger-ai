import { sendPrompt } from "@/utils/api";

import { getProviders } from "@/utils/storage";
import { TemplateVars } from "@/utils/models";
import { getErrorMessage } from "@/utils/errors";

/*
browser.runtime.onStartup.addListener(async () => {
  await getProviders();
});

browser.runtime.onInstalled.addListener(async () => {
  await getProviders();
});


*/
export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "SEND_PROMPT") {
      const template: TemplateVars = message.payload;

      sendPrompt(template)
        .then((result) => sendResponse({ ok: true, result }))
        .catch((e) => sendResponse({ ok: false, error: getErrorMessage(e) }));

      return true;
    }
  });
});
