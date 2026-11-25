# ReviseNotes

Interview revision notes for three roles (Java Full Stack, Angular Frontend, AI Engineer), as an Angular app.
Pick your role at the top of the sidebar to see only its topics.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # output in dist/revise-notes/browser
```

## How to study a topic

1. **Interview Basics** (the first sheet, marked with a star): the questions every interview opens with. Turn on
   Quiz mode and answer each one out loud before you reveal it.
2. **Cheat sheet**: the one-page version, linked under the topic in the sidebar.
3. **Detailed sheets**: only for what an interviewer digs into.

Do step 1 for every topic in your track before going deeper. After each interview, add what you could not
answer to `public/notes/missed.txt` and read it first next time.

## Adding a topic

1. Write `public/notes/<id>.txt` in the notes format described at the top of `src/app/notes.ts`.
   Give the Interview Basics sheet the id `b` (`# b | Interview Basics | ... | ★ Interview Basics`).
2. List it in a group in `src/app/topics.ts`.

Progress ("Mark complete", Shaky/OK/Solid ratings) is saved in the browser (localStorage), per device.
