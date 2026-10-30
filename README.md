# 压缩选择器 · Compaction Selector

> **1.0.4** · [发行说明](docs/releases/v1.0.4.md) · [验收与范围](docs/testing/ACCEPTANCE.md)。


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

正式安装版本为 1.0.4；历史候选包和校验值仅作为验收归档，见 `test-artifacts/README.md`。

适用环境：DeepSeek Harness **0.2.1-rc.3**，使用其标准模式和官方基础压缩引擎。

在 DSH 中打开 **插件 → 添加插件**，粘贴固定版本来源并安装、启用：

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.4
```

Web 版：

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.4'
```

也可从 [Release](https://github.com/Tests4gptplay/dsh-compaction-selector/releases/tag/v1.0.4) 下载预打包 `.tgz`，在「添加插件」中填写安装包路径。使用本地文件安装时，选择 `.tgz` 包。

## 使用

1. 打开 **设置 → 压缩用模型选择**。
2. 在「1. 选择模型」中选择 **Auto** 或具体模型。
3. 在「2. 自动压缩额外次数」中填写非负整数，或使用增减按钮。
4. 设置自动保存，下次压缩读取最新值。

插件通过配置包接入**标准模式**。DSH 已有会话保留创建时的预设版本；安装后新建标准模式会话使用新的引擎配置。首次启用或替换插件代码后，按 DSH 提示重启以加载新模块。

从旧的 `@local/dsh-sol-compaction` 配置包迁移时，启用本插件后停用旧包，将压缩模型和次数统一放在本插件中管理。

## 工作方式

Host 服务保存模型选择与次数；压缩引擎继承 DSH 的 `BasicCompactionEngine`，动态读取这三个设置：`summarizationProvider`、`summarizationModel`、`compactionRetries`。Auto 对应空的 provider/model，沿用官方的对话模型解析逻辑。

配置包包含标准预设声明，并将其中的基础压缩引擎替换为本插件引擎。源码直接使用 JavaScript，安装时无需编译。官方 Host 依赖由 DSH 运行环境提供。

## 版本与反馈

- [更新日志](CHANGELOG.md)
- [问题反馈](https://github.com/Tests4gptplay/dsh-compaction-selector/issues)

## 许可

[MIT](LICENSE)

## 兼容性与验收范围

此正式版本保持已测候选运行代码不变；版本元数据、安装指引与发行说明已更新。插件界面与宿主集成使用 DSH 提供的平台无关 API，不依赖特定系统路径或命令。Linux、Windows、macOS 必须分别在对应系统实际验证，Linux 结果不能代表另外两种系统通过。

## 支持项目 / Support

[GitHub Sponsors](https://github.com/sponsors/Tests4gptplay) · [Ko-fi](https://ko-fi.com/kou392350) · [Patreon](https://www.patreon.com/cw/Kou848) · [爱发电 / Afdian](https://afdian.com/a/kkt_ifd1) · [支付宝 / Alipay](SPONSOR.md)


Windows手动压缩及续聊已采用有效报告；自然压力自动摘要列入实机验证要求，见[验收](docs/testing/ACCEPTANCE.md)。


[查验具体用例、实际结果与公开净化证据](docs/testing/EVIDENCE.md)。
