# ReviseNotes

Interview revision notes for every topic in [TOPICS.md](TOPICS.md), as an Angular app.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # output in dist/revise-notes/browser
```

## Adding a topic

1. Write `public/notes/<id>.txt` in the notes format described at the top of `src/app/notes.ts`.
2. Set `ready: true` for that id in `src/app/topics.ts`.

"Mark complete" progress is saved in the browser (localStorage), per device.
