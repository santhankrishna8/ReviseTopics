# ReviseNotes

Interview revision notes for Java Full Stack, Angular Frontend and AI Engineer roles, as an Angular app.
Every topic is always listed in the sidebar.

```bash
npm install
npm start          # http://localhost:4200
npm run build      # output in dist/revise-notes/browser
```

## How to study a topic

1. **Interview Basics** (the first sheet, marked with a star): the questions every interview opens with. Turn on
   Quiz mode and answer each one out loud before you reveal it.
2. **Cheat sheet**: the one-page version, linked under the topic. All cheat sheets are also listed together in
   the **Cheat Sheets** group at the bottom of the sidebar.
3. **Detailed sheets**: only for what an interviewer digs into.

Do step 1 for every topic before going deeper. Start each session with **Most Asked Questions**
(`public/notes/missed.txt`); add new tricky questions there as they come up.

## Eval harness

`examples/eval-harness/` is a runnable Python LLM eval (OpenAI SDK) that the **LLM Evals** topic walks through:
tagged datasets, code graders, an LLM judge, baselines and a CI gate. See its README; `--mock` runs it with no API key.

## Adding a topic

1. Write `public/notes/<id>.txt` in the notes format described at the top of `src/app/notes.ts`.
   Give the Interview Basics sheet the id `b` (`# b | Interview Basics | ... | ★ Interview Basics`).
2. List it in a group in `src/app/topics.ts`.

Progress ("Mark complete", Shaky/OK/Solid ratings) is saved in the browser (localStorage), per device.
