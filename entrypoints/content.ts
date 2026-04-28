import popupicon from "@/components/iconPopup.vue";
export default defineContentScript({
  matches: ["<all_urls>"],

  async main(ctx) {
    console.log("content script loaded");
    const ui = await createShadowRootUi(ctx, {
      name: "selection-popup",
      position: "overlay",
      onMount(container, shadowRoot) {
        const host = shadowRoot.host as HTMLElement;
        Object.assign(host.style, {
          position: "fixed",
          top: "0",
          left: "0",
          width: "0",
          height: "0",
          overflow: "visible",
          zIndex: "2147483647",
          pointerEvents: "none",
        });
        const app = createApp(popupicon);
        app.mount(container);
        return app;
      },
      onRemove(app) {
        app?.unmount();
      },
    });
    ui.mount();
  },
});
