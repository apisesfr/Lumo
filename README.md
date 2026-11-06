# Zenyo

A free AI homework helper made by a student, for students. *(Formerly called Lumo.)*

Zenyo has two modes:
- **Zenyo Cloud** (default): the smart mode. Answers come from Zenyo's own server, nothing to download. It can read photos of homework (handwriting, diagrams, graphs). Free, with a daily limit.
- **Zenyo Pro** (on-device): the private mode. Runs **inside your browser** with [wllama](https://github.com/ngxson/wllama) (llama.cpp in WebAssembly), so chats and photos never leave your device, and it works offline.

Both modes also use:
- **Class notes** for biology, automotive technology and video games, so answers match what's taught
- **Exact math:** equations and arithmetic are solved with [nerdamer](https://github.com/jiggzson/nerdamer) and shown as "Checked answer"
- **Multiple choice detection:** Zenyo picks one answer and shows it clearly

Saved chats stay only in your own browser.

**Heads up:** Zenyo can make mistakes. Double-check anything important.

## On-device model
Zenyo Pro is a fine-tune of [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B) on Zenyo's personality, school subjects, checked math, facts and memory practice. Computers load the 5-bit version (397 MB), phones the 4-bit version (341 MB). Files are split into pieces under 100 MB. Photos in on-device mode are read with [SmolVLM-256M](https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct) on computers, or [Tesseract.js](https://github.com/naptha/tesseract.js) with shadow cleanup on phones.

## Credits and licenses
- On-device base model: **Qwen3-0.6B** by the Qwen team, licensed under the Apache License 2.0 (see `LICENSE-Qwen3.txt`). Zenyo is not made or endorsed by the Qwen team or Alibaba.
- Fine-tuning data: answers written by Qwen3-8B (Apache 2.0) and checked against GSM8K (MIT), ARC (CC BY-SA 4.0), CommonsenseQA (MIT) and MATH (MIT) answer keys; smol-smoltalk (Apache 2.0); CoEdIT (Apache 2.0); SQuAD (CC BY-SA 4.0); plus our own class notes, generated facts, memory and personality chats.
- Game names in the video game notes are trademarks of their owners. The notes are written in our own words.
