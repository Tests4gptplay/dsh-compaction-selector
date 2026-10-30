# 1.0.4-uiqa.20261029.2 — unpublished local QA candidate

- Respect provider failures returned inside a successful official model-catalog response. Show the existing localized load-failure/retry control instead of misleading empty-search copy; keep usable partial groups available.
- Previous .1 native round is invalidated by this confirmed catalog-failure defect. All acceptance restarts from zero on .2. No engine, Prompt, credentials, host security or version-gate change.

# 1.0.4-uiqa.20261029.1 — unpublished local QA candidate

- Preserve typed counter input; reject invalid non-negative integers on save instead of silently transforming them.
- Remove undocumented 999999 stepper clamp; preserve the existing safe-integer validation.
- Prevent overlapping saves and translate status/search accessibility text in the active locale.
- No prompt, installation-version gate, host security policy or provider credential changes.

# 更新日志 / Changelog

## 1.0.3

首个公开发行版本。

- 提供「压缩用模型选择」设置页。
- 支持 Auto 跟随对话模型，以及按供应商浏览、搜索模型。
- 支持额外按需压缩次数，默认 1，并提供增减按钮。
- 通过 DSH 设置系统保存配置，压缩引擎读取实时设置。
- 提供中英文界面与固定版本安装包。

First public release: compaction model settings, Auto routing, searchable provider groups, additional-pass controls (default 1), live preferences, and Chinese/English UI.
