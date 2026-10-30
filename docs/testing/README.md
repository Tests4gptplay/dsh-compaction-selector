> Release 1.0.4 preserves the tested candidate runtime. Candidate versions and checksums below identify historical evidence, not the formal release asset. See [release notes](../releases/v1.0.4.md).

# 候选测试文档

## 增量交接原则

已通过项采用原证据，不交给下一执行者整套重跑。先核本机已完成结果，划掉重复工作，当前轮适度收尾。23项组件及Linux实际Host的13次合成调用结果直接采用，包括手动、extra0/1/3、错误及Stop恢复。Windows安装、设置保存、真实手动压缩及随后续聊/技能已采用本机报告；只剩自然压力自动摘要与实际新异常对应恢复，不重复既有组合。

修复仅复验受影响调用链及必要相邻恢复；无变化runtime的有效结果继续采用。报告分 `adopted_evidence` 与 `delta_cases`，不要把引用旧证据冒称本次重测。

- [安装与本机验收](../../test-artifacts/INSTALL.md)
- [包清单](../../test-artifacts/copyclarity-manifest.json)
- [实际验收范围](ACCEPTANCE.md)
- [变更依据](CHANGES.md)

与其他插件一致使用test-artifacts保存包与校验信息、docs/testing保存验收与变更。每个包的结果独立记录。


[查验具体用例、实际结果与公开净化证据](EVIDENCE.md)。
