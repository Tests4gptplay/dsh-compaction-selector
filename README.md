# 压缩选择器 · Compaction Selector

为 DeepSeek Harness 的标准模式选择压缩摘要模型，并设置自动压缩的额外次数。

## 安装

在 DeepSeek Harness 的「插件 → 添加插件」中，将以下来源填入「包名或地址」，安装并启用：

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.7
```

**npm 安装：** 也可在 **包名或地址** 中填入 `@tests4gptplay/dsh-compaction-selector@1.0.7`。

也可安装预打包文件，无需解压或编译：

```text
https://github.com/Tests4gptplay/dsh-compaction-selector/releases/download/v1.0.7/dsh-compaction-selector-1.0.7.tgz
```

如下载到本地，将安装包的完整绝对路径填入同一个输入框即可。该文件应位于运行 DSH 的电脑上。

## 使用

1. 在「设置 → 压缩选择器」中选择 Auto，或选择独立的摘要模型。
2. 按需设置自动压缩的额外次数，设置会自动保存。
3. 启用后新建标准模式会话；已有会话保留创建时的预设。

Auto 跟随对话模型。额外次数仅用于自动压力压缩，手动 `/compact` 只尝试一次有用压缩。

## 升级

通过插件市场提供的安装入口或上述新版来源更新并启用，保留现有设置和用户文件。
如 DSH 提示必须先卸载，只移除插件条目，不清除 DSH 数据或手工删除插件目录。
是否重启以 DSH 提示为准；需要时完全退出，包括托盘，再重新打开。

[English](README.en.md)
