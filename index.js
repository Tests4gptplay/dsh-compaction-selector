import { Service } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'

const EMPTY = Object.freeze({ provider: '', model: '' })

/**
 * Host half of the compaction selector.
 *
 * The service exposes the live selection to the replacement compaction engine
 * (`./engine.js`), which keeps the official BasicCompactionEngine behavior but
 * reads its summarization target and retry count from this service.
 */
export default class CompactionSelector extends Service {
  static Config = z.object({
    selection: z
      .object({
        provider: z.string().default(''),
        model: z.string().default(''),
      })
      .default({ provider: '', model: '' })
      .volatile(),
    extraPasses: z.number().step(1).min(0).default(1).volatile(),
  })

  constructor(ctx, config) {
    super(ctx, 'compactionSelector')
    this.preferences = config
    // A dedicated settings page owns this entry; suppress the generic form.
    ctx.inject(['settings'], child => {
      child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
    })
  }

  current() {
    const selection = this.preferences.selection.get() ?? EMPTY
    const extraPasses = this.preferences.extraPasses.get()
    return {
      summarizationProvider: selection.provider ?? '',
      summarizationModel: selection.model ?? '',
      compactionRetries: Number.isSafeInteger(extraPasses) && extraPasses >= 0 ? extraPasses : 1,
    }
  }
}
