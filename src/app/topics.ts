export type Topic = { id: string; name: string; poster?: boolean; hidden?: boolean };
// poster: one sheet rendered as a card grid. hidden: routable and searchable, but reached through its topic
// (the "Cheat sheet" link) instead of its own sidebar row.

// How to study a topic: 1. its "Interview Basics" sheet (say every answer out loud), 2. its one-page
// cheat sheet, 3. the detailed sheets, only for what an interviewer digs into.
// To add a topic: write public/notes/<id>.txt in the notes format (see notes.ts) and list it here.
export const GROUPS: { name: string; topics: Topic[] }[] = [
  { name: 'Start Here', topics: [
    { id: 'missed', name: 'Most Asked Questions', poster: true },
    { id: 'cheat-scenarios', name: 'Project & Scenario Answers', poster: true },
  ] },
  { name: 'Java', topics: [
    { id: 'java', name: 'Java Core' },
    { id: 'java-streams', name: 'Java Streams & Lambdas' },
    { id: 'cheat-collections', name: 'Collections & HashMap', poster: true },
    { id: 'cheat-java-coding', name: 'Java Coding Questions', poster: true },
    { id: 'cheat-java-output', name: 'Java Output Questions', poster: true },
  ] },
  { name: 'Spring Boot & Backend', topics: [
    { id: 'spring-boot', name: 'Spring Boot & Microservices' },
    { id: 'rest', name: 'REST APIs & JSON' },
    { id: 'hibernate', name: 'JPA & Hibernate' },
    { id: 'testing', name: 'JUnit & Mockito' },
    { id: 'cheat-kafka', name: 'Kafka', poster: true },
  ] },
  { name: 'SQL', topics: [
    { id: 'sql', name: 'SQL' },
    { id: 'cheat-sql-queries', name: 'SQL Query Questions', poster: true },
  ] },
  { name: 'Frontend', topics: [
    { id: 'angular', name: 'Angular' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'html-css', name: 'HTML & CSS' },
  ] },
  { name: 'AI Engineering', topics: [
    { id: 'llm-apis', name: 'LLMs, Prompting & APIs' },
    { id: 'rag', name: 'Embeddings & RAG' },
    { id: 'agents', name: 'Agents & MCP' },
    { id: 'evals', name: 'LLM Evals' },
    { id: 'python', name: 'Python' },
    { id: 'fastapi', name: 'FastAPI' },
  ] },
  { name: 'Security, Caching & Design', topics: [
    { id: 'security', name: 'Authentication, Authorization & JWT' },
    { id: 'caching', name: 'Caching' },
    { id: 'cheat-system-design', name: 'System Design', poster: true },
    { id: 'cheat-lld', name: 'Low-Level Design', poster: true },
    { id: 'devops', name: 'DevOps Essentials', poster: true },
  ] },
  { name: 'DSA', topics: [
    { id: 'dsa', name: 'DSA 1: Arrays to Sorting' },
    { id: 'dsa-2', name: 'DSA 2: Trees, Heaps, Graphs' },
    { id: 'dsa-3', name: 'DSA 3: DP & Advanced' },
  ] },
  // One-page cheat sheets, opened from their topic (see CHEATS).
  { name: 'Cheat Sheets', topics: [
    { id: 'cheat-java', name: 'Java', poster: true, hidden: true },
    { id: 'cheat-spring-boot', name: 'Spring Boot', poster: true, hidden: true },
    { id: 'cheat-hibernate', name: 'Hibernate & JPA', poster: true, hidden: true },
    { id: 'cheat-junit-mockito', name: 'JUnit & Mockito', poster: true, hidden: true },
    { id: 'cheat-sql', name: 'SQL', poster: true, hidden: true },
    { id: 'cheat-angular', name: 'Angular', poster: true, hidden: true },
    { id: 'cheat-typescript', name: 'TypeScript', poster: true, hidden: true },
    { id: 'cheat-javascript', name: 'JavaScript', poster: true, hidden: true },
    { id: 'cheat-python', name: 'Python', poster: true, hidden: true },
    { id: 'cheat-spring-security', name: 'Spring Security & JWT', poster: true, hidden: true },
    { id: 'cheat-dsa', name: 'DSA', poster: true, hidden: true },
  ] },
];
export const READY = GROUPS.flatMap(g => g.topics);

// topic id -> its one-page cheat sheet
export const CHEATS: Record<string, string> = { java: 'cheat-java', 'spring-boot': 'cheat-spring-boot', hibernate: 'cheat-hibernate', testing: 'cheat-junit-mockito', sql: 'cheat-sql', angular: 'cheat-angular', typescript: 'cheat-typescript', javascript: 'cheat-javascript', python: 'cheat-python', security: 'cheat-spring-security', dsa: 'cheat-dsa', 'dsa-2': 'cheat-dsa', 'dsa-3': 'cheat-dsa' };
