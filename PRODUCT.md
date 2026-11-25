# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People preparing for software interviews for three roles: Java Full Stack, Angular Frontend and AI Engineer. The owner uses it for their own prep and shares it with friends and the public who prepare for the same roles. Sessions happen in every scene: desk sessions on a laptop in daylight, late-night study, and short phone sessions on the go or just before an interview.

## Product Purpose

Interview revision notes as an installable web app. A learner opens a topic, says each Interview Basics answer out loud, then goes deeper only where interviewers dig. Success: the learner can answer the common questions for every topic out loud, and knows which topics are still shaky.

## Positioning

Not a course and not a question bank. A fixed study order per topic (Interview Basics first, then a one-page cheat sheet, then detailed sheets only where interviewers dig), with self-testing built into the reading (Quiz mode, Must-know only, Self-test on cheat cards) and spaced revision from the learner's own Shaky / OK / Solid ratings.

## Operating Context

- Content lives in plain-text notes files (`public/notes/<id>.txt`) parsed by `src/app/notes.ts`; topics and groups are listed in `src/app/topics.ts`.
- Three sheet kinds: Interview Basics (Q&A list, starred must-know questions), detailed sheets (sections with lists, definitions, "Remember" tips, code blocks, Q&A), and posters (cheat sheets rendered as a grid of numbered cards with group headings).
- Hash routing `#/<topic>/<sheet>/<section>`; keyboard shortcuts: Ctrl/⌘K search, j/k next/previous sheet, r random question (weighted to shaky sheets).
- Progress, ratings, theme and UI toggles are stored in localStorage per device, with Export/Import of progress as JSON.
- PWA: manifest and service worker; works offline once loaded.

## Capabilities and Constraints

- Angular 22, standalone components and signals, one global stylesheet (`src/styles.css`), no UI framework. Fonts self-hosted via Fontsource. anime.js is the one motion library.
- Every topic is always listed; cheat sheets are reached from their topic.
- Features that must keep working: search over sheets, sections and questions; Quick revise; Quiz mode; Must-know only; Self-test; Mark complete; Shaky/OK/Solid ratings with due-for-revision list; random question; Interview Basics progress and "Up next"; resizable sidebar on desktop and drawer on phones; light and dark theme; print styles; skip link and live announcements.

## Brand Commitments

- Name: ReviseNotes. Existing icon `public/icon.svg`.
- Voice: plain, direct, second person ("say it out loud", "Remember"). No hype.

## Evidence on Hand

- Real content: 30+ topics of notes in `public/notes/`. No user counts, testimonials or ratings exist; none may be invented.

## Product Principles

1. Revision order beats coverage: Interview Basics first, depth only where interviewers dig.
2. Testing yourself is the default reading mode, not an extra.
3. Progress must be visible and honest: what is revised, what is shaky, what is due.
4. Fast to resume: one tap back to where you were or to the next thing to revise.
5. Works the same at a desk, at night and on a phone.

## Accessibility & Inclusion

WCAG 2.2 AA: full keyboard path, visible focus, 44px touch targets, reduced-motion support, forced-colors support, screen-reader announcements on navigation.
