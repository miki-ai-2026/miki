# Project overview

## The idea

MiKi is an AI team inside a physical store. Each store manager gets one personal agent (MiKi).
Behind it work digital co-workers: Security, Operations and Customer Care. They connect to the
CCTV cameras the store already has, learn what normal looks like, notice anomalies and follow open
tasks to the end. They reach the manager through channels already in use: an alert, a text, a
WhatsApp message or a call. The manager always decides what happens next.

Direction: intelligence and summaries delivered through the personal agent, not a dashboard-first
product, with self-learning (habits) added over time. The company sells an outcome, not "it
connects to CCTV".

## Who it is for

- **Anchor user:** the store manager.
- **Buyers:** Operations and IT management at retail organisations.
- **Participants:** other staff, such as security staff who use walkie-talkies.
- **Market:** retail businesses and organisations in Kenya, retail only for now. Buyers elsewhere
  are a bonus, not the plan.

## Three daily moments

1. Start-of-shift brief (top three items).
2. One useful alert during the day.
3. End-of-shift handover with open tasks.

The aim is a daily habit. `components/site/DemoChat.tsx` scripts these three moments.

## Principles

- Support the team, not watch it. Work by role and zone, not individual performance.
- Privacy controls (retention limits, audit trails) are part of the plan; the store stays in control
  of its footage.
- Be honest about status: MiKi is in development, visuals are concept, demo data is illustrative.

## Brand

Mascot: a lavender hooded floating robot with a navy screen face and lemon eyes. Colours: lavender,
lemon (`#ebd777`), ink (`#18181b`), fog (`#f4f4f5`). Font: Geist.

## What exists and what does not

| Exists | Does not exist yet |
|--------|--------------------|
| Public website with scripted demo | The store product |
| Early-access form saving to a database | Camera ingestion |
| Private console with sign-in and leads list | Agents, WhatsApp delivery |
| Draft privacy page | Multi-store data model |

## Scope of this repository

Business planning (fundraising, partner conversations, marketing plans) is deliberately kept out
of the repository. Ask the owner if you need that context.
