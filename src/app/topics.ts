export type Topic = { id: string; name: string; poster?: boolean; cheat?: boolean };
// poster: one sheet rendered as a card grid. cheat: a topic's one-page cheat sheet. All of them sit together in the
// "Cheat Sheets" group, are titled "<name> Cheat Sheet", and are also linked from their topic (see CHEATS).

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
    { id: 'llm-architecture', name: 'LLM Architecture & Inference' },
    { id: 'fine-tuning', name: 'Fine-Tuning & When to Train' },
    { id: 'rag', name: 'RAG 1: Embeddings & Search' },
    { id: 'rag-2', name: 'RAG 2: Architecture & Production' },
    { id: 'agents', name: 'Agents & MCP' },
    { id: 'evals', name: 'LLM Evals' },
    { id: 'ml-basics', name: 'ML Basics & Metrics' },
    { id: 'python', name: 'Python' },
    { id: 'fastapi', name: 'FastAPI' },
  ] },
  { name: 'Security & Caching', topics: [
    { id: 'security', name: 'Authentication, Authorization & JWT' },
    { id: 'caching', name: 'Caching' },
  ] },
  { name: 'DSA', topics: [
    { id: 'dsa', name: 'DSA 1: Arrays to Sorting' },
    { id: 'dsa-2', name: 'DSA 2: Trees, Heaps, Graphs' },
    { id: 'dsa-3', name: 'DSA 3: DP & Advanced' },
  ] },
  // Every one-page cheat sheet, in one place. Those that summarise a topic are also linked from it (see CHEATS).
  { name: 'Cheat Sheets', topics: [
    { id: 'cheat-system-design', name: 'System Design', poster: true, cheat: true },
    { id: 'cheat-lld', name: 'Low-Level Design', poster: true, cheat: true },
    { id: 'cheat-ai-system-design', name: 'AI System Design', poster: true, cheat: true },
    { id: 'cheat-kafka', name: 'Kafka', poster: true, cheat: true },
    { id: 'devops', name: 'DevOps', poster: true, cheat: true },
    { id: 'cheat-llm', name: 'LLMs, Prompting & Fine-Tuning', poster: true, cheat: true },
    { id: 'cheat-rag', name: 'RAG', poster: true, cheat: true },
    { id: 'cheat-agents', name: 'Agents & MCP', poster: true, cheat: true },
    { id: 'cheat-evals', name: 'LLM Evals', poster: true, cheat: true },
    { id: 'cheat-ml', name: 'ML Basics & Metrics', poster: true, cheat: true },
    { id: 'cheat-java', name: 'Java', poster: true, cheat: true },
    { id: 'cheat-spring-boot', name: 'Spring Boot', poster: true, cheat: true },
    { id: 'cheat-hibernate', name: 'Hibernate & JPA', poster: true, cheat: true },
    { id: 'cheat-junit-mockito', name: 'JUnit & Mockito', poster: true, cheat: true },
    { id: 'cheat-sql', name: 'SQL', poster: true, cheat: true },
    { id: 'cheat-angular', name: 'Angular', poster: true, cheat: true },
    { id: 'cheat-typescript', name: 'TypeScript', poster: true, cheat: true },
    { id: 'cheat-javascript', name: 'JavaScript', poster: true, cheat: true },
    { id: 'cheat-python', name: 'Python', poster: true, cheat: true },
    { id: 'cheat-spring-security', name: 'Spring Security & JWT', poster: true, cheat: true },
    { id: 'cheat-dsa', name: 'DSA', poster: true, cheat: true },
  ] },
];
export const READY = GROUPS.flatMap(g => g.topics);

// topic id -> its one-page cheat sheet
export const CHEATS: Record<string, string> = { java: 'cheat-java', 'spring-boot': 'cheat-spring-boot', hibernate: 'cheat-hibernate', testing: 'cheat-junit-mockito', sql: 'cheat-sql', angular: 'cheat-angular', typescript: 'cheat-typescript', javascript: 'cheat-javascript', python: 'cheat-python', security: 'cheat-spring-security', dsa: 'cheat-dsa', 'dsa-2': 'cheat-dsa', 'dsa-3': 'cheat-dsa',
  'llm-apis': 'cheat-llm', 'llm-architecture': 'cheat-llm', 'fine-tuning': 'cheat-llm', rag: 'cheat-rag', 'rag-2': 'cheat-rag',
  agents: 'cheat-agents', evals: 'cheat-evals', 'ml-basics': 'cheat-ml' };
