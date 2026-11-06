# Compaction Selector

Choose a summary model and configure additional automatic compaction passes for DeepSeek Harness Standard mode.

## Install

Open **Plugins → Add plugin** in DeepSeek Harness. Paste this source into **Package name or address**, then install and enable it:

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.7
```

Alternatively, use the prebuilt package. No extraction or build is required:

```text
https://github.com/Tests4gptplay/dsh-compaction-selector/releases/download/v1.0.7/dsh-compaction-selector-1.0.7.tgz
```

For a local download, enter the package's full absolute path in the same field. The file must be on the computer running DSH.

## Use

1. Open **Settings → Compaction Selector** and choose Auto or a separate summary model.
2. Set the additional automatic compaction passes as needed. Changes are saved automatically.
3. Create a new Standard-mode session after enabling the plugin. Existing sessions retain their original preset.

Auto follows the conversation model. Additional passes apply only to automatic pressure compaction; manual `/compact` attempts one useful compaction.

## Update

Use the marketplace installation entry or the versioned source above, then enable the plugin. Keep existing settings and user files.
If DSH requires removal first, remove only the plugin entry; do not clear DSH data or manually delete plugin directories.
Restart only when DSH asks. Fully exit, including the tray process, before reopening.

[中文说明](README.md)
