# Project overview

## The product idea

MiKi is an AI team inside a physical store. Each store manager gets one personal agent (MiKi).
Behind it work digital co-workers: Security, Operations and Customer Care. The agents connect to
the CCTV cameras the store already has, learn what normal looks like, notice anomalies and
follow open tasks through to the end. They reach the manager through channels the manager already
uses: an alert, a text, a WhatsApp message or a call. The manager always decides what happens next.

The direction moved from "dashboard first" to intelligence and summaries delivered through the
personal agent, with self-learning (habits) added over time. The company sells an outcome, not
"it connects to CCTV".

## Who it is for

- **Anchor user:** the store manager.
- **Buyers:** Operations and IT management at retail organisations.
- **Participants:** other staff such as security (who use walkie-talkies). They are not the anchor.
- **Market:** retail businesses and organisations in Kenya. Retail only for now. Buyers beyond
  Kenya are a bonus, not the plan.

## Three daily moments for a manager

1. Start-of-shift brief (top three items).
2. One useful alert during the day.
3. End-of-shift handover with open tasks.

The goal is a daily habit. The website demo (`components/site/DemoChat.tsx`) scripts these three.

## Principles

- Built to support the team, not watch them. Works by role and zone, not individual performance.
- Privacy controls (retention limits, audit trails) are part of the plan, and the store stays in
  control of its footage.
- Honesty about status. MiKi is in development. Visuals are concept. Demo data is illustrative.

## Brand

Mascot: a lavender hooded floating robot with a navy screen face and lemon eyes. Colours:
lavender, lemon (`#ebd777`), ink (`#18181b`) and fog (`#f4f4f5`). Font: Geist.

## Status

Early development. The website and the internal console exist. The store product (camera
ingestion, agents, WhatsApp delivery) does not. See `docs/ROADMAP.md`.

## Scope of this repository

Business planning (fundraising, partner conversations, marketing plans) is deliberately kept out
of this repository. If you need that context, ask the owner.
