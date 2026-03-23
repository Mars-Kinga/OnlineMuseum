# 拉取主分支保存为对比 git tree - 实施计划

## [x] 任务 1: 拉取并保存 main 分支状态
- **优先级**: P0
- **依赖项**: 无
- **描述**: 
  - 检查并拉取最新的 main 分支代码
  - 使用 git worktree 将 main 分支保存到本地目录，用于后续对比
  - 最终切换回当前 yanghui 分支
- **成功标准**:
  - main 分支成功拉取到本地
  - main 分支的 git tree 被正确保存
  - 当前分支保持为 yanghui
- **测试要求**:
  - `programmatic` TR-1.1: 验证 main 分支工作目录存在且包含完整代码
  - `programmatic` TR-1.2: 验证当前分支是 yanghui
- **备注**: 使用 git worktree 是为了避免频繁切换分支，同时保留两个分支的状态便于对比
