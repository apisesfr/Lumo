# Lumo

A free AI made by a student, for students. Lumo runs **inside your browser** with [wllama](https://github.com/ngxson/wllama) (llama.cpp in WebAssembly), so chats and photos stay on your device.

- **Model:** Lumo Pro, a fine-tune of [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B) on Lumo's personality, school subjects, facts and memory practice. Scores 48/50 on our school test (plain Qwen3-0.6B: 35/50).
  - Computers load the 5-bit version (397 MB), phones the 4-bit version (341 MB). Files are split into pieces under 100 MB.
- **Photos:** read in the browser by [SmolVLM-256M](https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct) on computers, or [Tesseract.js](https://github.com/naptha/tesseract.js) with shadow cleanup on phones
- **Math:** equations and arithmetic are solved exactly with [nerdamer](https://github.com/jiggzson/nerdamer) and shown as "Checked answer"
- **Heads up:** Lumo can make mistakes. Double-check anything important.

## Credits and licenses
- Base model: **Qwen3-0.6B** by the Qwen team, licensed under the Apache License 2.0 (see `LICENSE-Qwen3.txt`). Lumo is not made or endorsed by the Qwen team or Alibaba.
- Fine-tuning data: answers written by Qwen3-8B (Apache 2.0) and checked against GSM8K (MIT), ARC (CC BY-SA 4.0) and MATH (MIT) answer keys; smol-smoltalk (Apache 2.0); CoEdIT (Apache 2.0); SQuAD (CC BY-SA 4.0); plus our own generated facts, memory and personality chats.
- Lumo also has a from-scratch sibling (Lumo 1.x / 2.x), trained on a single RTX 4060.
