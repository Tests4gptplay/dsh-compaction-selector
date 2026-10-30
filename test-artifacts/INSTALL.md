# 候选安装与本机验收

版本 `1.0.4-uiqa.20261029.2`。下载本目录 [dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz](dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz)；大小14279字节，SHA256 `1b9684bb492f966e6d8d66ab20a945b2d6291fd3b3439e7c4527e390e959a2f9`。完整清单见[manifest.json](manifest.json)。原包仍保留用于追溯，当前介绍版选择文件名带copyclarity的包。

Windows PowerShell：

```powershell
Get-FileHash .\dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz -Algorithm SHA256
```

通过DSH正常插件管理入口安装本地TGZ，按宿主提示重载，再核插件版本与设置。沿用宿主官方安装方式，不凭文档猜测机器路径或启动参数。已有使用说明见[项目README](../README.md)。

## 本机验收

先用独立测试工作区，检查安装、主入口、中英文、明暗/窄窗、关键功能成功与失败恢复、关闭重开和完整宿主重启。具体已有结果与待验证链路见[验收报告](../docs/testing/ACCEPTANCE.md)。真实账号登录由用户正常操作；涉及文件替换、修复或进程停止的专用工具应先明确目标及恢复方式。记录实际系统/宿主版本、包SHA和结果，报告去除账号、令牌与私人路径。
