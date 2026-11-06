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
Zenyo Pro is a fine-tune of [MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B) on Zenyo's personality, school subjects, checked math, science, 69 school and college subjects, class notes, facts and memory practice. It scores 50.7% on MMLU and 63.5% on GSM8K math.

The model is one 4-bit GGUF file (613 MB). Its word table alone is 113 MB, over GitHub's 100 MB-per-file limit, so the file is stored as 7 plain pieces (`zenyo-pro-v6-q4.part01` to `part07`) on this repo's `models` branch. The browser downloads them once, keeps them in its cache, and joins them back together before loading. Photos in on-device mode are read with [SmolVLM-256M](https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct) on computers, or [Tesseract.js](https://github.com/naptha/tesseract.js) with shadow cleanup on phones.

## Credits and licenses
- On-device base model: **MiniCPM5-1B** by OpenBMB, licensed under the Apache License 2.0 (see `LICENSE-MiniCPM5.txt`). Zenyo is not made or endorsed by OpenBMB.
- Earlier versions of Zenyo Pro, and the teacher model that wrote much of the training data, are from the **Qwen3** family by the Qwen team, also Apache 2.0 (see `LICENSE-Qwen3.txt`). Zenyo is not made or endorsed by the Qwen team or Alibaba.
- Fine-tuning data: answers written by Qwen3-8B (Apache 2.0) and checked against GSM8K (MIT), ARC (CC BY-SA 4.0), CommonsenseQA (MIT) and MATH (MIT) answer keys; smol-smoltalk (Apache 2.0); CoEdIT (Apache 2.0); SQuAD (CC BY-SA 4.0); plus our own class notes, generated facts, memory and personality chats.
- Game names in the video game notes are trademarks of their owners. The notes are written in our own words.
