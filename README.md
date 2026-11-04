# Lumo

Lumo is a small AI trained **from scratch** (random weights, own tokenizer) on a home gaming PC with an RTX 4060.
This website runs Lumo **inside your browser** with [wllama](https://github.com/ngxson/wllama) (llama.cpp in WebAssembly), so chats and photos stay on your device.

- **Model:** Llama-style transformer, 83M parameters (Lumo 1.1), 8-bit GGUF
- **Photos:** words in pictures are read with [Tesseract.js](https://github.com/naptha/tesseract.js); Lumo can't see drawings or graphs
- **Heads up:** Lumo is tiny and makes mistakes. Double-check anything important.

## Trained on
Open datasets: Magicoder-OSS-Instruct, CodeFeedback, smol-smoltalk, TinyStories, Cosmopedia (100k), FineWeb-Edu, GSM8K, Orca-Math, plus generated arithmetic and personality chats.
Thanks to everyone who shares open data.
