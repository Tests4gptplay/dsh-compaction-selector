# Compaction Selector

[中文说明](README.md)

Adds **Settings → Compaction model selection** to DeepSeek Harness, with an independent summarization model and configurable additional on-demand compaction passes for Standard mode.

## Features

- Browse and search the models configured in DSH, grouped by provider.
- **Auto**, at the top of the picker, follows the current conversation model route.
- Additional compaction passes default to **1**. Set **0** for the initial pass only.
- Settings are saved through DSH and read by the next compaction.
- Chinese and English UI, theme-aware styling, keyboard selection and stepper controls.

## Install

Target environment: **DeepSeek Harness 0.2.1-rc.3**, Standard mode and its official basic compaction engine.

Open **Plugins → Add plugin**, paste the pinned source, then install and enable:

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.3
```

For the Web profile:

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.3'
```

A packaged `.tgz` is also available in the [release](https://github.com/Tests4gptplay/dsh-compaction-selector/releases/tag/v1.0.3). For a local installation, enter the `.tgz` path in Add plugin.

## Use

Open **Settings → Compaction model selection**, choose Auto or a specific model, and set the non-negative number of additional passes. Changes are saved automatically for the next compaction.

The bundle integrates with **Standard mode**. Existing DSH sessions retain their original preset revision; create a new Standard-mode session after installation to use the updated engine configuration. Follow DSH's restart prompt after initial activation or replacing plugin code.

When migrating from `@local/dsh-sol-compaction`, enable this plugin and disable the old bundle so that this settings page owns the model and pass count.

## Implementation

A Host service provides live preferences to a subclass of the official `BasicCompactionEngine`: `summarizationProvider`, `summarizationModel`, and `compactionRetries`. Auto supplies an empty provider/model pair and uses the official conversation-target resolution.

The bundle declares the Standard preset and substitutes its basic compaction engine. JavaScript runtime files are shipped directly, with no installation build step. DSH supplies the official Host dependencies.

[Changelog](CHANGELOG.md) · [Issues](https://github.com/Tests4gptplay/dsh-compaction-selector/issues) · [MIT license](LICENSE)
