import { useEffect, useRef, useState, type FormEvent } from 'react'

type PoolLogEntry = {
  id: string
  timestamp: string
  ph: number
  chlorinePpm: number
  saltPpm: number
  temperature: number
  totalAlkalinity: number | null
}

type PoolLogFormValues = {
  ph: string
  chlorinePpm: string
  saltPpm: string
  temperature: string
  totalAlkalinity: string
}

const initialFormValues: PoolLogFormValues = {
  ph: '',
  chlorinePpm: '',
  saltPpm: '',
  temperature: '',
  totalAlkalinity: '',
}

const formatNumber = (value: number, digits = 1) => value.toFixed(digits)

function App() {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')
  const [entries, setEntries] = useState<PoolLogEntry[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [formValues, setFormValues] = useState<PoolLogFormValues>(initialFormValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/pool-logs`, {
          headers: {
            Accept: 'application/json',
          },
        })

        if (response.status === 401) {
          setIsAuthenticated(false)
          setEntries([])
          return
        }

        if (!response.ok) {
          throw new Error('Request failed')
        }

        setIsAuthenticated(true)
        const data = (await response.json()) as PoolLogEntry[]
        setEntries(Array.isArray(data) ? data : [])
      } catch {
        setEntries([])
      }
    }

    loadEntries()
  }, [])

  useEffect(() => {
    if (isFormOpen) {
      firstFieldRef.current?.focus()
    }
  }, [isFormOpen])

  const latestEntry = entries[0]
  const chemistry = latestEntry
    ? [
        { label: 'pH', value: `${formatNumber(latestEntry.ph, 2)}`, note: 'Last test' },
        {
          label: 'Chlorine',
          value: `${formatNumber(latestEntry.chlorinePpm)} ppm`,
          note: 'Last test',
        },
        {
          label: 'Alkalinity',
          value: latestEntry.totalAlkalinity === null ? 'N/A' : `${formatNumber(latestEntry.totalAlkalinity)}`,
          note: 'Last test',
        },
      ]
    : [
        { label: 'pH', value: '—', note: 'Log your first reading' },
        { label: 'Chlorine', value: '—', note: 'Log your first reading' },
        { label: 'Alkalinity', value: '—', note: 'Log your first reading' },
      ]

  const handleChange = (field: keyof PoolLogFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/pool-logs`, {
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.status === 401) {
        setIsAuthenticated(false)
        return
      }

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setIsAuthenticated(true)
      const data = (await response.json()) as PoolLogEntry[]
      setEntries(Array.isArray(data) ? data : [])
    } catch {
      setIsAuthenticated(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}
    const numericValues = {
      ph: Number(formValues.ph),
      chlorinePpm: Number(formValues.chlorinePpm),
      saltPpm: Number(formValues.saltPpm),
      temperature: Number(formValues.temperature),
      totalAlkalinity: formValues.totalAlkalinity.trim() === '' ? null : Number(formValues.totalAlkalinity),
    }

    Object.entries(numericValues).forEach(([field, value]) => {
      if (field === 'totalAlkalinity' && value === null) {
        return
      }

      if (!Number.isFinite(value)) {
        nextErrors[field] = 'Required'
      }
    })

    if (!nextErrors.ph && (numericValues.ph < 0 || numericValues.ph > 14)) {
      nextErrors.ph = 'pH must be between 0 and 14'
    }

    if (!nextErrors.chlorinePpm && numericValues.chlorinePpm < 0) {
      nextErrors.chlorinePpm = 'Must be 0 or greater'
    }

    if (!nextErrors.saltPpm && numericValues.saltPpm < 0) {
      nextErrors.saltPpm = 'Must be 0 or greater'
    }

    if (!nextErrors.temperature && numericValues.temperature < 0) {
      nextErrors.temperature = 'Must be 0 or greater'
    }

    if (
      !nextErrors.totalAlkalinity &&
      numericValues.totalAlkalinity !== null &&
      numericValues.totalAlkalinity < 0
    ) {
      nextErrors.totalAlkalinity = 'Must be 0 or greater'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const newEntry: PoolLogEntry = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      ph: numericValues.ph,
      chlorinePpm: numericValues.chlorinePpm,
      saltPpm: numericValues.saltPpm,
      temperature: numericValues.temperature,
      totalAlkalinity: numericValues.totalAlkalinity,
    }

    fetch(`${apiBaseUrl}/pool-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed')
        }

        return response.json() as Promise<PoolLogEntry>
      })
      .then((savedEntry) => {
        setEntries((current) => [savedEntry, ...current].slice(0, 8))
        setFormValues(initialFormValues)
        setErrors({})
        setIsFormOpen(false)
      })
      .catch(() => {
        setErrors({ form: 'Unable to save right now' })
      })
  }

  return (
    <div className="screen-shell">
      <div className="backdrop backdrop-top" />
      <div className="backdrop backdrop-bottom" />

      <main className="app-frame">
        <header className="hero-card">
          <div className="hero-copy">
            <h1>PoolLog</h1>
            <p className="hero-text">Track the chemistry that matters most.</p>
          </div>
        </header>

        <section className="panel">
          {isAuthenticated ? (
            <>
              <div className="section-heading">
                <div>
                  <p className="section-label">Chemistry</p>
                  <h2>Quick readings</h2>
                </div>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => setIsFormOpen((current) => !current)}
                >
                  {isFormOpen ? 'Close form' : 'Log test'}
                </button>
              </div>

              {!isFormOpen ? (
                <div className="stat-list">
                  {chemistry.map((item) => (
                    <article key={item.label} className="stat-card">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <small>{item.note}</small>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="entry-helper">Enter your latest reading below.</p>
              )}

              {isFormOpen ? (
                <form className="log-form" onSubmit={handleSubmit}>
                  <div className="field-grid">
                    <label className="field">
                      <span>pH</span>
                      <input
                        ref={firstFieldRef}
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        value={formValues.ph}
                        onChange={(event) => handleChange('ph', event.target.value)}
                      />
                      {errors.ph ? <small className="field-error">{errors.ph}</small> : null}
                    </label>
                    <label className="field">
                      <span>Chlorine PPM</span>
                      <input
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        value={formValues.chlorinePpm}
                        onChange={(event) => handleChange('chlorinePpm', event.target.value)}
                      />
                      {errors.chlorinePpm ? <small className="field-error">{errors.chlorinePpm}</small> : null}
                    </label>
                    <label className="field">
                      <span>Salt PPM</span>
                      <input
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        value={formValues.saltPpm}
                        onChange={(event) => handleChange('saltPpm', event.target.value)}
                      />
                      {errors.saltPpm ? <small className="field-error">{errors.saltPpm}</small> : null}
                    </label>
                    <label className="field">
                      <span>Temperature</span>
                      <input
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        value={formValues.temperature}
                        onChange={(event) => handleChange('temperature', event.target.value)}
                      />
                      {errors.temperature ? <small className="field-error">{errors.temperature}</small> : null}
                    </label>
                    <label className="field">
                      <span>Total Alkalinity</span>
                      <input
                        inputMode="decimal"
                        type="number"
                        step="0.01"
                        value={formValues.totalAlkalinity}
                        onChange={(event) => handleChange('totalAlkalinity', event.target.value)}
                      />
                      {errors.totalAlkalinity ? <small className="field-error">{errors.totalAlkalinity}</small> : null}
                    </label>
                  </div>
                  <button className="submit-button" type="submit">
                    Save reading
                  </button>
                </form>
              ) : null}

              <div className="history-card">
                <div className="section-heading compact-heading">
                  <div>
                    <p className="section-label">History</p>
                    <h2>Recent log</h2>
                  </div>
                </div>

                {entries.length === 0 ? (
                  <p className="empty-state">No readings saved yet. Add your first pool test.</p>
                ) : (
                  <div className="history-list">
                    {entries.map((entry) => (
                      <article key={entry.id} className="history-item">
                        <div className="history-meta">
                          <strong>{entry.timestamp}</strong>
                          <span>pH {formatNumber(entry.ph, 2)}</span>
                        </div>
                        <div className="history-values">
                          <span>Cl {formatNumber(entry.chlorinePpm)} ppm</span>
                          <span>Salt {formatNumber(entry.saltPpm)} ppm</span>
                          <span>{formatNumber(entry.temperature)}°F</span>
                          <span>TA {entry.totalAlkalinity === null ? 'N/A' : formatNumber(entry.totalAlkalinity)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-card">
              <p className="section-label">Access required</p>
              <h2>Sign in to view your pool log</h2>
              <p className="auth-copy">Use the browser’s sign-in prompt to enter your credentials.</p>
              <button className="submit-button" type="button" onClick={handleLogin}>
                Log in
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

export default App