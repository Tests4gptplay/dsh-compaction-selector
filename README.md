# 压缩选择器 · Compaction Selector

> **1.0.5** · [更新记录](CHANGELOG.md) · [验收与范围](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/docs/testing/ACCEPTANCE.md)。


## 模型与压缩次数

选择独立摘要模型，或用 Auto 跟随对话路由。自动压力压缩可设置额外次数；手动 `/compact` 只尝试一次有用压缩。Auto 由官方引擎优先采用最近请求路由，缺少时回退 Agent 模型。

为 DeepSeek Harness 添加「设置 → 压缩用模型选择」，集中管理标准模式的摘要模型和自动压缩额外次数。

[English](README.en.md)

## 功能

- **独立选择压缩模型**：从 DSH 已配置的模型目录中按供应商浏览、搜索和选择。
- **Auto 跟随对话**：模型列表顶部提供 Auto，压缩时使用当前对话的模型路由。
- **自动压缩额外次数**：默认 **1**。仅在自动上下文压力压缩后仍超过阈值时继续；设 **0 / 1 / 3** 时，单次自动触发最多尝试 **1 / 2 / 4** 轮。达到阈值或没有可压缩范围时提前结束。手动 `/compact` 仅尝试一次有用压缩，不套用该额外次数。
- **即时保存**：通过 DSH 设置系统保存选择，供下一次压缩读取。
- **中英文界面**：适配 DSH 主题，支持键盘选择和次数增减按钮。

## 安装

当前版本为 **1.0.5**。首次安装请按下方步骤操作；升级前无需卸载现有插件。

已验证宿主版本：DeepSeek Harness **0.2.1-rc.3**。本插件用于提供官方压缩能力的标准模式。

在 DSH 中打开 **插件 → 添加插件**，粘贴固定版本来源并安装、启用：

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.5
```

Web 版：

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.5'
```

也可从 [Release](https://github.com/Tests4gptplay/dsh-compaction-selector/releases/tag/v1.0.5) 下载预打包 `.tgz`，在「添加插件」中填写安装包路径。使用本地文件安装时，选择 `.tgz` 包。

## 使用

1. 打开 **设置 → 压缩用模型选择**。
2. 在「1. 选择模型」中选择 **Auto** 或具体模型。
3. 在「2. 自动压缩额外次数」中填写非负整数，或使用增减按钮。
4. 设置自动保存，下次压缩读取最新值。

插件通过配置包接入**标准模式**。DSH 已有会话保留创建时的预设版本；安装后新建标准模式会话使用新的引擎配置。首次启用或替换插件代码后，按 DSH 提示重启以加载新模块。

从旧的 `@local/dsh-sol-compaction` 配置包迁移时，启用本插件后停用旧包，将压缩模型和次数统一放在本插件中管理。

## 使用条件与技术资料

本插件用于 DSH 标准模式。安装后新建标准模式会话，使模型选择和额外次数设置生效；其他模式不在本插件的设置范围内。普通用户直接安装预打包文件即可，无需编译。

[开发者技术说明](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/README.md#工作方式)单独保存在仓库中。

## 版本与反馈

- [更新日志](CHANGELOG.md)
- [问题反馈](https://github.com/Tests4gptplay/dsh-compaction-selector/issues)

## 许可

[MIT](LICENSE)

## 兼容性与验收范围

本次更新修正安装包中的文档链接，插件功能与上一版本一致。Linux、Windows、macOS 必须分别在对应系统实际验证，Linux 结果不能代表另外两种系统通过。

## 支持项目 / Support

[GitHub Sponsors](https://github.com/sponsors/Tests4gptplay) · [Ko-fi](https://ko-fi.com/kou392350) · [Patreon](https://www.patreon.com/cw/Kou848) · [爱发电 / Afdian](https://afdian.com/a/kkt_ifd1) · [支付宝 / Alipay](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/SPONSOR.md)


Windows 已验证安装、设置保存、手动压缩及随后续聊。自然压力触发的自动压缩尚未在 Windows 实测；这不影响额外次数的功能定义，也不代表该路径已通过实机验证。


[查验具体用例、实际结果与公开净化证据](https://github.com/Tests4gptplay/dsh-compaction-selector/blob/e9e09efd815e0f6a357c500c66b04f1b5f418cf3/docs/testing/EVIDENCE.md)。
