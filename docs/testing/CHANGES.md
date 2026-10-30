# 变更与依据

- 实际Host目录返回failures时，旧UI误显示无模型；修复消费官方failures并呈现原有错误/Retry。
- 部分目录失败保留健康组与Auto，回归覆盖迟到结果顺序。
- 明确手动单次压缩与自动额外0/1/3轮的区别；文案重包只改说明文字，不改压缩引擎。

本次仅整理分支文档，没有改运行代码或重新打包。介绍修订对应的copyclarity包及其原功能包映射保留在[manifest](../../test-artifacts/manifest.json)。
