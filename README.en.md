# Compaction Selector

## Summary model and compaction passes

Choose an independent summary model or Auto to follow the conversation route. Configure extra passes for automatic pressure compaction; manual `/compact` attempts one useful compaction. Auto prefers the latest request route and falls back to the Agent model through the official engine.

[中文说明](README.md)

Adds **Settings → Compaction model selection** to DeepSeek Harness, with an independent summarization model and configurable additional automatic pressure-compaction passes for Standard mode.

## Features

- Browse and search the models configured in DSH, grouped by provider.
- **Auto**, at the top of the picker, follows the current conversation model route.
- Additional automatic pressure-compaction passes default to **1**. Values **0 / 1 / 3** allow at most **1 / 2 / 4** passes per automatic trigger, continuing only while above the threshold and a useful range remains. Manual `/compact` attempts one useful compaction and does not repeat according to this setting.
- Settings are saved through DSH and read by the next compaction.
- Chinese and English UI, theme-aware styling, keyboard selection and stepper controls.

## Install

For test candidate **1.0.4-uiqa.20261029.2**, use the pinned package in `test-artifacts/README.md`; older tags below are historical releases.

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

## Local compatibility candidate (unpublished)

This source tree is a pinned QA candidate, not a published release. Install its exact local `.tgz` for validation; the public links above still identify the previous release.

The plugin UI and host integration use DSH-provided, OS-neutral APIs rather than OS paths or commands. Linux, Windows and macOS native behavior must each be validated on that OS; a Linux result does not certify Windows or macOS.

## 支持项目 / Support

[GitHub Sponsors](https://github.com/sponsors/Tests4gptplay) · [Ko-fi](https://ko-fi.com/kou392350) · [Patreon](https://www.patreon.com/cw/Kou848) · [爱发电 / Afdian](https://afdian.com/a/kkt_ifd1) · [支付宝 / Alipay](SPONSOR.md)
