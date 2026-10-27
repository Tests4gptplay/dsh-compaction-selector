import { BasicCompactionEngine } from '@deepseek-ai/dsh-compaction-basic';

// Keep the official compaction implementation, including Auto's routed-model fallback.
export default class SelectedCompactionEngine extends BasicCompactionEngine {
  static inject = [...BasicCompactionEngine.inject, 'compactionSelector'];
  constructor(ctx, config = {}) {
    super(ctx, config);
    this.config = { ...this.config };
    for (const key of ['summarizationProvider', 'summarizationModel', 'compactionRetries']) {
      Object.defineProperty(this.config, key, {
        enumerable: true,
        configurable: true,
        get: () => ctx.compactionSelector.current()[key],
      });
    }
  }
}
