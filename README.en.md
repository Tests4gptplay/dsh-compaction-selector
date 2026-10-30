# Compaction Selector

> **1.0.6** · [Changelog](CHANGELOG.md) · [Acceptance and scope](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/docs/testing/ACCEPTANCE.md).


## Summary model and compaction passes

Choose an independent summary model or Auto to follow the conversation route. Configure extra passes for automatic pressure compaction; manual `/compact` attempts one useful compaction. Auto prefers the latest request route and falls back to the Agent model through the official engine.

[中文说明](README.md)

Adds **Settings → Compaction Selector** to DeepSeek Harness, with an independent summarization model and configurable additional automatic pressure-compaction passes for Standard mode.

## Features

- Browse and search the models configured in DSH, grouped by provider.
- **Auto**, at the top of the picker, follows the current conversation model route.
- Additional automatic pressure-compaction passes default to **1**. Values **0 / 1 / 3** allow at most **1 / 2 / 4** passes per automatic trigger, continuing only while above the threshold and a useful range remains. Manual `/compact` attempts one useful compaction and does not repeat according to this setting.
- Settings are saved through DSH and read by the next compaction.
- Chinese and English UI, theme-aware styling, keyboard selection and stepper controls.

## Install

Current version: **1.0.6**. Follow the steps below for a first installation; an upgrade does not require uninstalling the existing plugin.

Verified host version: **DeepSeek Harness 0.2.1-rc.3**. Use Standard mode with the official compaction capability.

Open **Plugins → Add plugin**, paste the pinned source, then install and enable:

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.6
```

For the Web profile:

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.6'
```

A packaged `.tgz` is also available in the [release](https://github.com/Tests4gptplay/dsh-compaction-selector/releases/tag/v1.0.6). For a local installation, enter the `.tgz` path in Add plugin.

## Use

Open **Settings → Compaction Selector**, choose Auto or a specific model, and set the non-negative number of additional passes. Changes are saved automatically for the next compaction.

The bundle integrates with **Standard mode**. Existing DSH sessions retain their original preset revision; create a new Standard-mode session after installation to use the updated engine configuration. Follow DSH's restart prompt after initial activation or replacing plugin code.

When migrating from `@local/dsh-sol-compaction`, enable this plugin and disable the old bundle so that this settings page owns the model and pass count.

## Usage requirements and technical documentation

Use a new Standard-mode session after installation so the summary-model and extra-pass settings apply. Other modes are outside this settings page’s scope. Install the prebuilt package directly; no manual build is needed.

[Developer documentation](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/README.en.md#implementation) is maintained separately in the repository.

[Changelog](CHANGELOG.md) · [Issues](https://github.com/Tests4gptplay/dsh-compaction-selector/issues) · [MIT license](LICENSE)

## Compatibility and acceptance scope

This update names both the settings entry and page “Compaction Selector”; model selection, automatic extra-pass settings and manual compaction behavior are unchanged.

Linux, Windows and macOS native behavior must each be validated on that OS; a Linux result does not certify Windows or macOS.

## 支持项目 / Support

[GitHub Sponsors](https://github.com/sponsors/Tests4gptplay) · [Ko-fi](https://ko-fi.com/kou392350) · [Patreon](https://www.patreon.com/cw/Kou848) · [爱发电 / Afdian](https://afdian.com/a/kkt_ifd1) · [支付宝 / Alipay](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/SPONSOR.md)


Windows checks cover installation, saved settings, manual compaction and continued chat. Naturally triggered automatic pressure compaction has not yet been observed on Windows; that coverage limit does not change what the extra-pass setting does.
