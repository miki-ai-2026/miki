'use client'

import { useRef, useState } from 'react'
import Reveal from './Reveal'

const ROWS = [
  'Friday evenings: warn about queues 10 minutes earlier',
  'Aisle 4: check after the 10:00 delivery',
  'Morning brief: top three items only',
  'Alerts: WhatsApp first, then a call',
]

type LearnedRow = { text: string; default: boolean }

export default function LearnedPanel() {
  const ROWS: LearnedRow[] = [
    { text: 'Friday evenings: warn about queues 10 minutes earlier', default: true },
    { text: 'Aisle 4: check after the 10:00 delivery', default: true },
    { text: 'Morning brief: top three items only', default: true },
    { text: 'Alerts: WhatsApp first, then a call', default: true },
  ]

  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState<boolean[]>(ROWS.map((r) => r.default))
  const firstRef = useRef<HTMLInputElement | null>(null)

  const toggleEdit = () => {
    const next = !editing
    setEditing(next)
    if (next) firstRef.current?.focus()
  }

  const resetAll = () => setValues(ROWS.map((r) => r.default))

  return (
    <Reveal className={`learned-panel${editing ? ' is-editing' : ''}`} delay={1}>
      <div className="panel-heading">
        <h3>What MiKi has learned</h3>
      </div>
      <div className="learned-rows">
        {ROWS.map((row, i) => (
          <label className="learned-row" key={row.text}>
            <span>{row.text}</span>
            <input
              ref={i === 0 ? firstRef : undefined}
              type="checkbox"
              checked={values[i]}
              onChange={(event) =>
                setValues((prev) =>
                  prev.map((v, j) => (j === i ? event.target.checked : v))
                )
              }
            />
            <span className="toggle" aria-hidden="true"></span>
          </label>
        ))}
      </div>
      <div className="panel-actions">
        <button type="button" onClick={toggleEdit}>
          {editing ? 'Done' : 'Edit'}
        </button>
        <button type="button" onClick={resetAll}>
          Reset all
        </button>
      </div>
    </Reveal>
  )
}
