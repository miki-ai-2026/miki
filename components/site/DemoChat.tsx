'use client'

import { useEffect, useRef, useState } from 'react'

type FlowKey = 'brief' | 'alert' | 'handover'
type Message = { who: 'miki' | 'user'; text: string }
type Flow = { label: string; say: string[]; options: Record<string, string> }

// Scripted concept preview with illustrative data. No backend is involved.
const FLOWS: Record<FlowKey, Flow> = {
  brief: {
    label: 'Start-of-shift brief',
    say: [
      'Good morning. Here is your brief, top three items only.',
      '1. Aisle 4: check after the 10:00 delivery.',
      '2. Friday evening: I will warn you about queues 10 minutes earlier.',
      '3. Two open tasks from yesterday’s handover.',
    ],
    options: {
      'Got it': 'Done. I will keep your brief to three items.',
      'Remind me at 10:00':
        'Reminder set for 10:00. I will use WhatsApp first, then call if you do not reply.',
    },
  },
  alert: {
    label: 'Midday alert',
    say: [
      'Unusual activity near the Aisle 4 exit camera. I have a short clip ready.',
      'You decide what happens next.',
    ],
    options: {
      'Notify security': 'Security has been told by text. You stay in the loop.',
      'Call me': 'Calling you now.',
      Dismiss: 'Dismissed. I will note it so I learn what is normal here.',
    },
  },
  handover: {
    label: 'End-of-shift handover',
    say: ['End of shift. Handover for the next manager:', 'Open tasks: 2. Alerts today: 1, handled by you.'],
    options: {
      'Send handover': 'Handover sent to the next manager.',
      'Add note: re-check Aisle 4 shelf': 'Added to the handover. Send it when you are ready.',
    },
  },
}

const FLOW_KEYS = Object.keys(FLOWS) as FlowKey[]

function schedule(store: { current: ReturnType<typeof setTimeout>[] }, fn: () => void, ms: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) fn()
  else store.current.push(setTimeout(fn, ms))
}

export default function DemoChat() {
  const [flow, setFlow] = useState<FlowKey>('brief')
  const [run, setRun] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [options, setOptions] = useState<string[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const logRef = useRef<HTMLDivElement | null>(null)

  // Play the selected moment from the start (also when the same chip is clicked again).
  useEffect(() => {
    const data = FLOWS[flow]
    const store = timers
    setMessages([])
    setOptions([])
    data.say.forEach((text, i) =>
      schedule(store, () => setMessages((prev) => [...prev, { who: 'miki', text }]), 500 + i * 900)
    )
    schedule(store, () => setOptions(Object.keys(data.options)), 500 + data.say.length * 900)
    return () => {
      store.current.forEach(clearTimeout)
      store.current = []
    }
  }, [flow, run])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const choose = (label: string) => {
    setOptions([])
    setMessages((prev) => [...prev, { who: 'user', text: label }])
    schedule(
      timers,
      () => setMessages((prev) => [...prev, { who: 'miki', text: FLOWS[flow].options[label] }]),
      500
    )
  }

  return (
    <div className="demo-shell">
      <div className="demo-moments" role="group" aria-label="Moments in the day">
        {FLOW_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="chip"
            aria-pressed={flow === key}
            onClick={() => {
              setFlow(key)
              setRun((n) => n + 1)
            }}
          >
            {FLOWS[key].label}
          </button>
        ))}
      </div>
      <div className="chat">
        <div className="chat-head">
          <img src="/assets/miki-12100366.jpg" alt="" width="36" height="36" />
          <div>
            <strong>MiKi</strong>
            <span>Concept preview</span>
          </div>
        </div>
        <div ref={logRef} className="chat-log" role="log" aria-live="polite">
          {messages.map((message, i) => (
            <div key={i} className={`msg msg-${message.who}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-actions">
          {options.map((label) => (
            <button key={label} type="button" onClick={() => choose(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
