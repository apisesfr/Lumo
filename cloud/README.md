# Lumo Cloud setup (free, about 10 minutes)

Lumo Cloud is the website's "⚡ Cloud" mode: a bigger AI (Gemma 4 26B) that runs on Cloudflare,
so students get smarter answers and don't have to download anything. It's free with a daily limit
(Cloudflare gives 10,000 "Neurons" a day, roughly 400 chats). When it runs out, the site offers the
on-device Lumo Pro instead.

You need a free Cloudflare account. Online services like this usually need an adult to own the account, so ask a
parent to create it. No credit card is needed for the free plan, and no API key is needed.

## 1. Create the Worker
1. Log in at dash.cloudflare.com.
2. Go to **Workers & Pages** > **Create** > **Create Worker** (start from "Hello World").
3. Name it `lumo-cloud` and click **Deploy**.
4. Click **Edit code**, delete everything, paste in all of `cloud/worker.js`, and click **Deploy**.

## 2. Turn on the AI binding
1. Open the Worker > **Settings** > **Bindings** > **Add** > **Workers AI**.
2. Set the variable name to `AI` (exactly) and save. The Worker redeploys.

## 3. Test it
Open the Worker's URL (looks like `https://lumo-cloud.<your-name>.workers.dev`).
You should see `{"ok":true,"name":"Lumo Cloud",...}`.

## 4. Connect the website
Send the Worker URL to Claude (or put it in `CLOUD_DEFAULT` at the top of the cloud section in `index.html`),
then push the site. The "⚡ Cloud" button appears in the header.

To try it before publishing, open the site and run this in the browser console:
`localStorage.setItem("lumo.cloudUrl", "https://lumo-cloud.<your-name>.workers.dev"); location.reload()`

## Settings you can change in worker.js
- `MODEL`: other free models on Workers AI, for example `@cf/qwen/qwen3-30b-a3b-fp8` (cheaper, more chats a day)
  or `@cf/openai/gpt-oss-120b` (smartest at reasoning, about 130 chats a day).
- `PER_PERSON_PER_DAY`: messages per visitor per day (default 40).
- `ALLOWED_ORIGINS`: which websites may use the Worker.

## Privacy
In Cloud mode, messages are sent to Cloudflare to be answered. Check Cloudflare's privacy policy for how Workers AI
handles them; either way, students shouldn't share personal info. On-device mode never sends anything.
