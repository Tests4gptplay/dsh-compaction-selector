# 压缩选择器 / Compaction Selector 1.0.6

## 变化 / Changes

设置菜单入口与页面标题现在都显示“压缩选择器”，英文为“Compaction Selector”，与插件名称一致。模型选择、自动压力压缩额外次数、手动压缩及已有设置保持不变。

The settings entry and page are now consistently named “Compaction Selector”. Model selection, extra automatic pressure-compaction passes, manual compaction and saved settings are unchanged.

## 安装与升级

当前版本：**1.0.6**。安装包与固定标签均已包含运行文件，无需编译。

**首次安装（Desktop）：** 打开侧栏 **插件 → 添加插件**（箭头菜单的 **安装第三方插件** 也可进入），把下面一整行填入 **包名或地址**，点击 **安装**，核对版本后点击 **立即启用**。

```text
github:Tests4gptplay/dsh-compaction-selector#v1.0.6
```

**升级已有插件：** 同样填写上面的新版来源，成功后核对版本并启用；已有设置与用户文件保留。若宿主提示已安装或要求先卸载，再按提示仅卸载该插件条目并安装新版，不清除 DSH 数据或手工删除插件目录。是否需要重启以 DSH 提示为准；需要时完全退出并重新打开（Desktop 包括托盘）。

启用后新建**标准模式会话**再使用压缩选择器；已有会话仍保留创建时的预设。

**备用安装包：** 将下面的 `.tgz` 直链填入同一个 **包名或地址**；也可下载后填写文件的完整绝对路径，无需解压。该路径应属于运行 DSH 的电脑。

```text
https://github.com/Tests4gptplay/dsh-compaction-selector/releases/download/v1.0.6/dsh-compaction-selector-1.0.6.tgz
```

**Web：** 在运行服务的环境中执行。升级前停止对应 Web profile，成功后重新启动；Web 与 Desktop 分别安装。

```sh
dsh plugin --profile web add 'github:Tests4gptplay/dsh-compaction-selector#v1.0.6'
```

备用时将命令中的来源换成上面的 `.tgz` 直链或下载文件的完整绝对路径。

## 验证 / Verification

23项组件检查通过，包括中文/英文设置入口和页面标题。安装包链接闭合；与1.0.5相比，client.js仅两个标题文字变化，其他功能运行文件不变。没有将此标题修正宣称为新的实机压缩验证。
