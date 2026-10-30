# 候选安装包与增量验收

当前安装入口：[INSTALL.md](INSTALL.md)。已有测试采用与剩余缺口：[验收记录](../docs/testing/ACCEPTANCE.md)。

已完成且适用于相同运行字节的云端或本机结果直接采用；无需重新安装或重复完整矩阵。仅执行尚未覆盖的平台／真实服务差异，修复后仅复验受影响路径。已开始的本机测试可适度收尾，提交已完成结果和剩余缺口。

当前文案包身份使用 [copyclarity-manifest.json](copyclarity-manifest.json)；原始包与 [manifest.json](manifest.json) 保留作为历史验收身份，两者不要混用 SHA。

## 介绍文案更新包 / Copy clarification package

新增独立文案包 [dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz](dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz)（14279 bytes），SHA256 `1b9684bb492f966e6d8d66ab20a945b2d6291fd3b3439e7c4527e390e959a2f9`。它更新 README、插件简介和界面说明；client.js 仅替换中英说明字符串，engine.js/index.js 字节不变。原始验收包和原清单保留，不使用旧 SHA 标识新文件。功能未变，本次仅做文案/包内容一致性核验。逐文件校验见 [copyclarity-manifest.json](copyclarity-manifest.json)。

Separate documentation-only package; the original acceptance archive and manifest remain unchanged. This is not a new functional test run or a Release.


