# Zenyo Pro model files

The on-device model for [Zenyo](https://zenyoai.github.io): MiniCPM5-1B fine-tuned as Zenyo, one 4-bit GGUF file (613 MB)
stored as 7 plain pieces, because its 113 MB word table is over GitHub's 100 MB file limit. The website downloads the
pieces, joins them in order, and loads the result.

Base model: MiniCPM5-1B by OpenBMB, Apache License 2.0 (see `LICENSE`). Zenyo is not made or endorsed by OpenBMB.
