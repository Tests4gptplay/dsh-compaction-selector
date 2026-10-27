# 压缩选择器 · Compaction Selector

为 DeepSeek Harness 添加「设置 → 压缩用模型选择」，集中管理标准模式的摘要模型和额外按需压缩次数。

[English](README.en.md)

**Support / 赞助：** [Ko-fi](https://ko-fi.com/kou392350) · [Patreon](https://www.patreon.com/cw/Kou848) · [爱发电 / Afdian](https://afdian.com/a/kkt_ifd1) · [支付宝 / Alipay](SPONSOR.md)

## 功能

- **独立选择压缩模型**：从 DSH 已配置的模型目录中按供应商浏览、搜索和选择。
- **Auto 跟随对话**：模型列表顶部提供 Auto，压缩时使用当前对话的模型路由。
- **额外按需压缩次数**：默认 **1**。首次压缩后仍超过阈值时，最多再执行指定次数；设为 **0** 时仅执行首次压缩。
- **即时保存**：通过 DSH 设置系统保存选择，供下一次压缩读取。
- **中英文界面**：适配 DSH 主题，支持键盘选择和次数增减按钮。

## 安装

适用环境：DeepSeek Harness **0.2.1-rc.3**，使用其标准模式和官方基础压缩引擎。

在 DSH 中打开 **插件 → 添加插件**，粘贴固定版本来源并安装、启用：

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.3
```

Web 版：

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.3'
```

也可从 [Release](https://github.com/Tests4gptplay/dsh-compaction-selector/releases/tag/v1.0.3) 下载预打包 `.tgz`，在「添加插件」中填写安装包路径。使用本地文件安装时，选择 `.tgz` 包。

## 使用

1. 打开 **设置 → 压缩用模型选择**。
2. 在「1. 选择模型」中选择 **Auto** 或具体模型。
3. 在「2. 额外按需压缩次数」中填写非负整数，或使用增减按钮。
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
