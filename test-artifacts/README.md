# dsh-compaction-selector test candidate

Version: `1.0.4-uiqa.20261029.2`. This is an installable test candidate, not a formal release. Windows native acceptance is pending.

1. Download `dsh-compaction-selector-1.0.4-uiqa.20261029.2.tgz` from this directory at the same pinned commit as this document.
2. Verify SHA-256: `a88d493183f0c66b4d801cf3c0f04978125ebb7102088a9b47ab52c44b403850` (13749 bytes).
3. Back up the DSH profile using supported methods and use a disposable test profile where available.
4. In DSH Desktop, open **Plugins → Add plugin** and select the downloaded local TGZ. Do not substitute the older official-release links in the package README. Record the installed plugin version and Host version.
5. Validate native UI, normal operations, cancellation/error recovery, persistence after restart, and disable/re-enable behavior. Record PASS, FAIL, BLOCKED, and NOT RUN separately with sanitized evidence.

The archive is byte-for-byte the frozen candidate. Root README changes clarify test installation and preserve current repository support links; they do not change archive bytes. `manifest.json` contains installed payload identities. Do not run optional Host archive patching, binary repair, or account actions without separate approval. Existing source tests include synthetic fixtures; their results do not certify actual native services, account login, or other operating systems.

## 介绍文案更新包 / Copy clarification package

新增独立文案包 [dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz](dsh-compaction-selector-1.0.4-uiqa.20261029.2-copyclarity.tgz)（14279 bytes），SHA256 `1b9684bb492f966e6d8d66ab20a945b2d6291fd3b3439e7c4527e390e959a2f9`。它更新 README、插件简介和界面说明；client.js 仅替换中英说明字符串，engine.js/index.js 字节不变。原始验收包和原清单保留，不使用旧 SHA 标识新文件。功能未变，本次仅做文案/包内容一致性核验。逐文件校验见 [copyclarity-manifest.json](copyclarity-manifest.json)。

Separate documentation-only package; the original acceptance archive and manifest remain unchanged. This is not a new functional test run or a Release.
