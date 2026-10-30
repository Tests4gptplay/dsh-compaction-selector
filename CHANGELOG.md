# 更新日志 / Changelog

## 1.0.4（2026-10-30）

- Show model-catalog provider failures with localized retry controls; retain healthy partial groups.
- Preserve typed counter input and reject invalid values rather than silently transforming them; remove the undocumented stepper clamp while retaining safe-integer validation.
- Prevent overlapping saves and refresh localized status/search labels.
- Clarify that extra passes apply to automatic pressure compaction only; manual compaction attempts one useful pass.

23 component/official-engine checks with DSH 0.2.1-rc.3 and the production package whitelist passed. Existing Linux synthetic automatic-loop/Stop evidence and Windows installation/settings/manual-compaction/continued-chat evidence are adopted. Natural automatic-pressure compaction was not triggered on Windows; no paid artificial load was generated. This is a documented coverage boundary, not a claim that all platforms or failure paths passed. Runtime is unchanged from the tested candidate.

## 1.0.3

首个公开发行版本。

- 提供「压缩用模型选择」设置页。
- 支持 Auto 跟随对话模型，以及按供应商浏览、搜索模型。
- 支持额外按需压缩次数，默认 1，并提供增减按钮。
- 通过 DSH 设置系统保存配置，压缩引擎读取实时设置。
- 提供中英文界面与固定版本安装包。

First public release: compaction model settings, Auto routing, searchable provider groups, additional-pass controls (default 1), live preferences, and Chinese/English UI.
