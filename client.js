window.__ModuleLoader__.load({
  id: 'dsh-compaction-selector',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef, useSyncExternalStore } = React
    const NS = 'compaction.selector'
    const NAMESPACE = 'compaction-selector'
    const zh = {
      title: '压缩选择器',
      model: '1. 选择模型',
      passes: '2. 自动压缩额外次数',
      auto: 'Auto',
      autoHint: '跟随当前对话选择的模型',
      help: '仅自动压力压缩：0/1/3 最多共 1/2/4 轮，仍超阈值才继续。默认 1。手动压缩只尝试一次。',
      search: '搜索模型…',
      empty: '没有匹配的模型',
      loading: '正在加载…',
      failed: '保存失败，请重试',
      loadFailed: '模型列表加载失败',
      retry: '重试',
      saved: '已保存，下次压缩时生效',
      invalid: '请输入大于或等于 0 的整数',
      unavailable: '压缩选择器尚未加载，暂时无法修改。',
      readOnly: '当前部署的设置为只读。',
      account: 'DeepSeek 账号',
      increase: '增加',
      decrease: '减少',
      clear: '清除搜索',
    }
    const en = {
      title: 'Compaction Selector',
      model: '1. Select model',
      passes: '2. Extra automatic passes',
      auto: 'Auto',
      autoHint: 'Follow the current conversation model',
      help: 'Automatic pressure compaction only: 0/1/3 allow at most 1/2/4 total passes while still above threshold. Default: 1. Manual compaction attempts one pass.',
      search: 'Search models…',
      empty: 'No matching models',
      loading: 'Loading…',
      failed: 'Save failed. Please retry.',
      loadFailed: 'Could not load models',
      retry: 'Retry',
      saved: 'Saved. Applies to the next compaction.',
      invalid: 'Enter an integer of 0 or more',
      unavailable: 'The compaction selector is not loaded yet, so it cannot be changed.',
      readOnly: 'This deployment stores settings read-only.',
      account: 'DeepSeek Account',
      increase: 'Increase',
      decrease: 'Decrease',
      clear: 'Clear search',
    }
    const css = `
.dcs-page{color:var(--dsw-alias-label-primary);padding:24px;max-width:760px;font-size:13px;line-height:1.5}
.dcs-page h2{font-size:20px;font-weight:600;margin:0 0 28px}
.dcs-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--dsw-alias-border-l3)}
.dcs-title{font-size:14px;font-weight:500}
.dcs-help{font-size:12px;color:var(--dsw-alias-label-tertiary);max-width:450px;margin:6px 0 0}
.dcs-picker{position:relative;flex:none}
.dcs-trigger{font:inherit;color:var(--dsw-alias-label-secondary);background:transparent;border:0;border-radius:var(--dsw-radius-sm,6px);cursor:pointer;max-width:280px;padding:6px 8px;display:flex;gap:8px;align-items:center}
.dcs-trigger:hover,.dcs-option:hover,.dcs-option[data-active=true]{background:var(--dsw-alias-interactive-bg-hover)}
.dcs-trigger:focus-visible,.dcs-option:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary)}
.dcs-trigger:disabled{opacity:.55;cursor:default}
.dcs-trigger span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dcs-menu{position:absolute;right:0;top:calc(100% + 6px);z-index:1100;width:300px;max-width:calc(100vw - 48px);max-height:360px;display:flex;flex-direction:column;padding:4px;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-elevation-prominent);color:var(--dsw-alias-label-primary)}
.dcs-searchrow{display:flex;align-items:center;padding:4px}
.dcs-search{min-width:0;width:100%;font:inherit;color:inherit;background:transparent;border:0;outline:0;padding:6px 8px}
.dcs-search::placeholder{color:var(--dsw-alias-label-caption)}
.dcs-clear{border:0;background:transparent;color:var(--dsw-alias-label-caption);cursor:pointer;padding:4px 8px}
.dcs-groups{overflow:auto;min-height:0}
.dcs-provider{position:sticky;top:0;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);font-size:12px;padding:8px 8px 4px;z-index:1}
.dcs-option{width:100%;display:flex;align-items:center;gap:10px;justify-content:space-between;font:inherit;color:inherit;background:transparent;border:0;border-radius:var(--dsw-radius-sm,6px);cursor:pointer;padding:7px 8px;text-align:left}
.dcs-option:disabled{opacity:.55;cursor:default}
.dcs-copy{min-width:0;display:flex;flex-direction:column;gap:2px}
.dcs-copy span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dcs-sub{color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:400}
.dcs-auto{border-bottom:1px solid var(--dsw-alias-border-l3);margin-bottom:2px;padding-bottom:2px}
.dcs-status{font-size:12px;color:var(--dsw-alias-label-tertiary);padding:12px 8px}
.dcs-error{color:var(--dsw-alias-state-error-primary)}
.dcs-counter{display:inline-flex;align-items:center;gap:4px;flex:none;margin-right:-22px}
.dcs-count{width:88px;font:inherit;color:inherit;background:transparent;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-sm,6px);padding:6px 8px;text-align:right}
.dcs-stepper{display:flex;flex-direction:column;gap:1px;flex:none}
.dcs-step{box-sizing:border-box;width:18px;height:15px;padding:0;border:1px solid var(--dsw-alias-border-l1);border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center}
.dcs-step:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dcs-step:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dcs-step:disabled{opacity:.45;cursor:default}
.dcs-count:disabled{opacity:.55}
`
    function StepArrow(props) {
      const up = Boolean(props.up)
      return h(
        'svg',
        { width: 8, height: 5, viewBox: '0 0 8 5', 'aria-hidden': true },
        h('path', {
          d: up ? 'M0.75 4.25L4 1L7.25 4.25' : 'M0.75 0.75L4 4L7.25 0.75',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }
    function score(name, query) {
      const s = String(name ?? '').toLowerCase()
      const q = query.trim().toLowerCase()
      if (!q) return 0
      if (s.startsWith(q)) return -1000 + s.length
      let pos = -1
      let total = 0
      for (const c of q) {
        pos = s.indexOf(c, pos + 1)
        if (pos < 0) return Infinity
        total += pos
      }
      return total
    }
    const EMPTY = { provider: '', model: '' }
    function Page(props) {
      const { form, t } = props
      const snapshot = useSyncExternalStore(
        fn => form.subscribe(fn),
        () => form.getSnapshot(),
      )
      const value = snapshot.value
      const current = (value && value.selection) || EMPTY
      const [groups, setGroups] = useState([])
      const [loadState, setLoadState] = useState('idle')
      const [open, setOpen] = useState(false)
      const [query, setQuery] = useState('')
      const [active, setActive] = useState(0)
      const [busy, setBusy] = useState(false)
      const [message, setMessage] = useState('')
      const [error, setError] = useState(false)
      const [count, setCount] = useState(String((value && value.extraPasses) ?? 1))
      const root = useRef(null)
      const trigger = useRef(null)
      const search = useRef(null)
      const items = useRef([])
      const generation = useRef(0)
      const saving = useRef(false)
      const id = React.useId()
      const writable = Boolean(snapshot.writable) && snapshot.status === 'ready'
      const unavailable = snapshot.status === 'unavailable'

      useEffect(() => {
        setCount(String((value && value.extraPasses) ?? 1))
      }, [value && value.extraPasses])

      async function load() {
        const gen = ++generation.current
        setLoadState('loading')
        try {
          const r = await props.ctx.remote.session.modelCatalog()
          if (gen !== generation.current) return
          if (!r || !r.ok) {
            setLoadState('error')
            return
          }
          const list = Array.isArray(r.value && r.value.groups) ? r.value.groups : []
          const rank = g =>
            g.id === 'deepseek-account' ? 0 : g.id === 'deepseek-official' ? 1 : 2
          setGroups(list.slice().sort((a, b) => rank(a) - rank(b)))
          // The official catalog isolates provider errors in a successful response.
          // Keep usable groups visible, but do not mislabel failed providers as an empty search.
          const failures = Array.isArray(r.value && r.value.failures) ? r.value.failures : []
          setLoadState(failures.length ? 'error' : 'ready')
        } catch {
          if (gen === generation.current) setLoadState('error')
        }
      }

      useEffect(() => {
        load()
        return () => {
          generation.current++
        }
      }, [])

      useEffect(() => {
        if (!open) return
        search.current?.focus()
        const outside = e => {
          if (!root.current?.contains(e.target)) setOpen(false)
        }
        document.addEventListener('pointerdown', outside)
        return () => document.removeEventListener('pointerdown', outside)
      }, [open])

      const visible = groups
        .map(g => ({
          ...g,
          models: (Array.isArray(g.models) ? g.models : [])
            .map(m => ({ m, rank: score(m.name, query) }))
            .filter(x => Number.isFinite(x.rank))
            .sort((a, b) => a.rank - b.rank)
            .map(x => x.m),
        }))
        .filter(g => g.models.length)
      const choices = [
        EMPTY,
        ...visible.flatMap(g => g.models.map(m => ({ provider: g.id, model: m.id }))),
      ]
      const isSelected = s => s.provider === current.provider && s.model === current.model
      const selected = groups
        .flatMap(g => (Array.isArray(g.models) ? g.models : []).map(m => ({ ...m, provider: g.id })))
        .find(m => m.provider === current.provider && m.id === current.model)
      const label = !current.provider ? t('auto') : (selected && selected.name) || current.model

      async function save(ops) {
        if (saving.current) return false
        saving.current = true
        setBusy(true)
        setMessage('')
        setError(false)
        try {
          const ok = await form.mutate(ops)
          setError(!ok)
          setMessage(ok ? 'saved' : 'failed')
          return ok
        } catch {
          setError(true)
          setMessage('failed')
          return false
        } finally {
          saving.current = false
          setBusy(false)
        }
      }

      async function choose(selection) {
        if (busy || saving.current || !writable) return
        if (await save([{ op: 'set', path: ['selection'], value: selection }])) {
          setOpen(false)
          trigger.current?.focus()
        }
      }

      async function saveCount() {
        if (!writable || busy || saving.current) return
        if (!/^\d+$/.test(count) || !Number.isSafeInteger(Number(count))) {
          setError(true)
          setMessage('invalid')
          return
        }
        if (Number(count) !== (value && value.extraPasses)) {
          await save([{ op: 'set', path: ['extraPasses'], value: Number(count) }])
        }
      }

      async function stepCount(delta) {
        if (!writable || busy || saving.current) return
        const parsed = /^\d+$/.test(count) ? Number(count) : NaN
        const base = Number.isSafeInteger(parsed) ? parsed : (value && value.extraPasses) || 0
        const next = Math.max(0, base + delta)
        if (!Number.isSafeInteger(next)) {
          setError(true)
          setMessage('invalid')
          return
        }
        setCount(String(next))
        if (next !== (value && value.extraPasses)) {
          await save([{ op: 'set', path: ['extraPasses'], value: next }])
        }
      }

      function key(e) {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          setOpen(false)
          trigger.current?.focus()
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault()
          const i =
            (active + (e.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length
          setActive(i)
          items.current[i]?.scrollIntoView({ block: 'nearest' })
        } else if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
          e.preventDefault()
          choose(choices[active] || choices[0])
        } else if (e.key === 'Tab' && e.shiftKey) {
          setOpen(false)
        }
      }

      let optionIndex = 1
      function option(selection, name, sub, i) {
        return h(
          'button',
          {
            key: selection.provider + '|' + selection.model,
            id: id + '-' + i,
            ref: el => {
              items.current[i] = el
            },
            type: 'button',
            className: 'dcs-option',
            role: 'option',
            'aria-selected': isSelected(selection),
            'data-active': active === i,
            tabIndex: -1,
            disabled: busy || !writable,
            onMouseMove: () => setActive(i),
            onClick: () => choose(selection),
          },
          h(
            'span',
            { className: 'dcs-copy' },
            h('span', null, name),
            sub && h('small', { className: 'dcs-sub' }, sub),
          ),
          isSelected(selection) && h('span', { 'aria-hidden': true }, '✓'),
        )
      }

      const statusLine = unavailable
        ? t('unavailable')
        : !snapshot.writable && snapshot.status === 'ready'
          ? t('readOnly')
          : ''

      return h(
        'section',
        { className: 'dcs-page' },
        h('style', null, css),
        h('h2', null, t('title')),
        statusLine && h('div', { className: 'dcs-status' }, statusLine),
        h(
          'div',
          { className: 'dcs-row' },
          h(
            'div',
            null,
            h('div', { className: 'dcs-title' }, t('model')),
            h(
              'p',
              { className: 'dcs-help' },
              !current.provider ? t('autoHint') : (selected && selected.name) || current.model,
            ),
          ),
          h(
            'div',
            { className: 'dcs-picker', ref: root },
            h(
              'button',
              {
                className: 'dcs-trigger',
                ref: trigger,
                type: 'button',
                'aria-label': t('model') + ': ' + label,
                'aria-haspopup': 'listbox',
                'aria-expanded': open,
                disabled: !writable || busy,
                onClick: () => {
                  setQuery('')
                  setActive(0)
                  setOpen(!open)
                  if (!open) load()
                },
              },
              h('span', null, label),
              h('span', { 'aria-hidden': true }, '⌄'),
            ),
            open &&
              h(
                'div',
                { className: 'dcs-menu', onKeyDown: key },
                h(
                  'div',
                  { className: 'dcs-searchrow' },
                  h('input', {
                    ref: search,
                    className: 'dcs-search',
                    placeholder: t('search'),
                    'aria-label': t('search'),
                    role: 'combobox',
                    'aria-expanded': true,
                    'aria-controls': id,
                    'aria-activedescendant': id + '-' + active,
                    value: query,
                    onChange: e => {
                      setQuery(e.target.value)
                      setActive(0)
                    },
                  }),
                  query &&
                    h(
                      'button',
                      {
                        className: 'dcs-clear',
                        'aria-label': t('clear'),
                        type: 'button',
                        onClick: () => {
                          setQuery('')
                          setActive(0)
                          search.current?.focus()
                        },
                      },
                      '×',
                    ),
                ),
                h(
                  'div',
                  { className: 'dcs-groups', role: 'listbox', id, 'aria-label': t('model') },
                  h('div', { className: 'dcs-auto' }, option(EMPTY, t('auto'), t('autoHint'), 0)),
                  ...visible.map(g =>
                    h(
                      'div',
                      { key: g.id, role: 'group', 'aria-label': g.id === 'deepseek-account' ? t('account') : g.name },
                      h(
                        'div',
                        { className: 'dcs-provider' },
                        g.id === 'deepseek-account' ? t('account') : g.name,
                      ),
                      ...g.models.map(m =>
                        option(
                          { provider: g.id, model: m.id },
                          m.name,
                          null,
                          optionIndex++,
                        ),
                      ),
                    ),
                  ),
                  loadState === 'loading' && h('div', { role: 'status', className: 'dcs-status' }, t('loading')),
                  loadState === 'error' &&
                    h(
                      'button',
                      { className: 'dcs-option', type: 'button', onClick: load },
                      t('loadFailed') + ' · ' + t('retry'),
                    ),
                  loadState === 'ready' &&
                    !visible.length &&
                    h('div', { role: 'status', className: 'dcs-status' }, t('empty')),
                ),
              ),
          ),
        ),
        h(
          'div',
          { className: 'dcs-row' },
          h(
            'div',
            null,
            h('label', { htmlFor: id + '-count', className: 'dcs-title' }, t('passes')),
            h('p', { className: 'dcs-help' }, t('help')),
          ),
          h(
            'div',
            { className: 'dcs-counter' },
            h('input', {
              id: id + '-count',
              className: 'dcs-count',
              type: 'text',
              inputMode: 'numeric',
              value: count,
              disabled: !writable || busy,
              onChange: e => {
                setCount(e.target.value)
                setMessage('')
                setError(false)
              },
              onBlur: saveCount,
              onKeyDown: e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  saveCount()
                }
              },
            }),
            h(
              'div',
              { className: 'dcs-stepper' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dcs-step',
                  'aria-label': t('increase'),
                  title: t('increase'),
                  disabled: !writable || busy,
                  onMouseDown: e => e.preventDefault(),
                  onClick: () => stepCount(1),
                },
                h(StepArrow, { up: true }),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dcs-step',
                  'aria-label': t('decrease'),
                  title: t('decrease'),
                  disabled: !writable || busy || Number(count) <= 0,
                  onMouseDown: e => e.preventDefault(),
                  onClick: () => stepCount(-1),
                },
                h(StepArrow, { up: false }),
              ),
            ),
          ),
        ),
        message &&
          h(
            'div',
            { role: error ? 'alert' : 'status', className: 'dcs-status' + (error ? ' dcs-error' : '') },
            t(message),
          ),
      )
    }
    return {
      inject: ['slots', 'locale', 'configForms', 'remote', 'remote.session'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }))
        const t = ctx.locale.bind(NS)
        const form = ctx.configForms.get(NAMESPACE)
        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: NAMESPACE,
              order: 45,
              label: () => t('title'),
              locale: NS,
              inject: () => ({ ctx, form, t }),
            },
            Page,
          ),
        )
      },
    }
  },
})
