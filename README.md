# badger-ai

A browser extension that lets you run custom AI prompts on selected text using your own AI providers and request templates.

badger-ai is built for flexibility: you can bring your own provider, API key, model, request body template, and response extraction path. It is not locked to a single vendor.

[watch quick tutorial](https://streamable.com/r0esu0)

## Features

- Run prompts on selected text directly from the page.
- Configure multiple AI providers.
- Store prompts and providers locally in extension storage.
- Use fully customizable request templates.
- Support custom response paths such as `choices.0.message.content`.
- Load default providers remotely from a hosted `reqtemplate.json`.
- Works well with OpenAI-compatible providers and custom APIs.

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/)
- [Vue 3](https://vuejs.org/)
- [PrimeVue](https://primevue.org/)

## download & load

1. go to release page and click on version for you browser: [release page](https://github.com/ALAWIII/badger-ai/releases)
2. unzip the archive file.
3. open chrome.
4. go to extensions.
5. enable Developer mode.
6. click load unpacked.
7. locate the folder where you extracted from step 2.

## How It Works

1. Select text on any page.
2. Open the badger-ai quick menu.
3. Choose a prompt.
4. badger-ai resolves the selected provider template.
5. The extension sends the request to the provider API.
6. The configured `responsePath` is used to extract the final text response.

## Remote Default Providers

Default providers can be hosted remotely and loaded into the extension.

This project uses:

```txt
https://alawiii.github.io/badger-ai/reqtemplate.json
```

That file is served from the repository `docs/` folder using GitHub Pages.

## Storage

badger-ai stores prompts, providers, and default provider settings in browser extension local storage.

## Notes

- `requestTemplate` is user-controlled and supports placeholders like `{{apiKey}}`, `{{model}}`, `{{systemPrompt}}`, and `{{selectedText}}`.
- `responsePath` tells the extension where to read the final output from the provider response.
- For long inputs, some models may truncate output even if `max_tokens` is large; chunking can help.

## Roadmap

- Better template validation
- Import/export prompts and providers
- More polished provider presets
- Smarter chunking for large selections
- Improved error reporting in the UI

## License

MIT
