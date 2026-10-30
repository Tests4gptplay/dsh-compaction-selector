# 候选安装与本机验收

## 增量交接原则

已通过项采用原证据，不交给下一执行者整套重跑。先核本机已完成结果，划掉重复工作，当前轮适度收尾。23项组件及Linux实际Host的13次合成调用结果直接采用，包括手动、extra0/1/3、错误及Stop恢复。Windows安装、设置保存、真实手动压缩及随后续聊/技能已采用本机报告；只剩自然压力自动摘要与实际新异常对应恢复，不重复既有组合。

修复仅复验受影响调用链及必要相邻恢复；无变化runtime的有效结果继续采用。报告分 `adopted_evidence` 与 `delta_cases`，不要把引用旧证据冒称本次重测。

版本 `1.0.4-uiqa.20261029.2`。下载本目录 [dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz](dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz)；大小14279字节，SHA256 `1b9684bb492f966e6d8d66ab20a945b2d6291fd3b3439e7c4527e390e959a2f9`。完整清单见[copyclarity-manifest.json](copyclarity-manifest.json)。原包仍保留用于追溯，当前介绍版选择文件名带copyclarity的包。

Windows PowerShell：

```powershell
Get-FileHash .\dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz -Algorithm SHA256
```

通过DSH正常插件管理入口安装本地TGZ，按宿主提示重载，再核插件版本与设置。沿用宿主官方安装方式，不凭文档猜测机器路径或启动参数。已有使用说明见[项目README](../README.md)。

## 实机验证要求

23项组件及Linux实际Host的13次合成调用结果直接采用，包括手动、extra0/1/3、错误及Stop恢复。Windows安装、设置保存、真实手动压缩及随后续聊/技能已采用本机报告；只剩自然压力自动摘要与实际新异常对应恢复，不重复既有组合。

具体既有覆盖见[验收报告](../docs/testing/ACCEPTANCE.md)。仅做原生平台或真实服务尚缺的项，记录新增结果和当前已完成的本机证据，不重新盘点所有入口、全量双语矩阵或模拟后端。
