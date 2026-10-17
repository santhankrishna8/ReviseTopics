export type Topic = { id: string; name: string; ready?: boolean; poster?: boolean };   // poster: one sheet rendered as a card grid

// Groups and order follow TOPICS.md. To add a topic: write public/notes/<id>.txt in the
// notes format (see notes.ts), then set ready: true here.
export const GROUPS: { name: string; topics: Topic[] }[] = [
  { name: 'Languages', topics: [
    { id: 'java', name: 'Java', ready: true },
    { id: 'python', name: 'Python', ready: true },
    { id: 'javascript', name: 'JavaScript', ready: true },
    { id: 'typescript', name: 'TypeScript', ready: true },
    { id: 'regex', name: 'Regex', ready: true },
  ] },
  { name: 'Frontend', topics: [
    { id: 'html-css', name: 'HTML & CSS', ready: true },
    { id: 'angular', name: 'Angular', ready: true },
    { id: 'react', name: 'React', ready: true },
    { id: 'nextjs', name: 'Next.js', ready: true },
    { id: 'nodejs', name: 'Node.js', ready: true },
  ] },
  { name: 'Backend & APIs', topics: [
    { id: 'spring-boot', name: 'Spring Boot & Microservices', ready: true },
    { id: 'rest', name: 'REST & JSON', ready: true },
    { id: 'fastapi', name: 'FastAPI', ready: true },
    { id: 'security', name: 'Spring Security, OAuth & JWT', ready: true },
    { id: 'hibernate', name: 'ORM & Hibernate', ready: true },
    { id: 'postman', name: 'Postman', ready: true },
  ] },
  { name: 'GenAI & LLMs', topics: [
    { id: 'llm-apis', name: 'Prompting & LLM APIs', ready: true },
    { id: 'rag', name: 'Embeddings & RAG', ready: true },
    { id: 'agents', name: 'Claude Code, MCP & Agents', ready: true },
  ] },
  { name: 'Databases', topics: [
    { id: 'sql', name: 'SQL & RDBMS', ready: true },
    { id: 'mongodb', name: 'MongoDB', ready: true },
    { id: 'firestore', name: 'Firestore', ready: true },
  ] },
  { name: 'DevOps & Practices', topics: [
    { id: 'git', name: 'Git' },
    { id: 'github', name: 'GitHub', ready: true },
    { id: 'maven', name: 'Maven' },
    { id: 'docker', name: 'Docker' },
    { id: 'kubernetes', name: 'Kubernetes' },
    { id: 'cicd', name: 'CI/CD' },
    { id: 'aws', name: 'AWS' },
    { id: 'kafka', name: 'Kafka', ready: true },
    { id: 'n8n', name: 'n8n', ready: true },
    { id: 'testing', name: 'Testing & JUnit', ready: true },
    { id: 'agile', name: 'Agile & SDLC', ready: true },
    { id: 'system-design', name: 'System Design', ready: true },
    { id: 'buzzwords', name: 'Engineering Buzzwords', ready: true },
  ] },
  { name: 'Cheat Sheets', topics: [
    { id: 'cheat-java', name: 'Java', ready: true, poster: true },
    { id: 'cheat-angular', name: 'Angular', ready: true, poster: true },
    { id: 'cheat-typescript', name: 'TypeScript', ready: true, poster: true },
    { id: 'cheat-sql', name: 'SQL', ready: true, poster: true },
    { id: 'cheat-spring-boot', name: 'Spring Boot', ready: true, poster: true },
  ] },
];
export const READY = GROUPS.flatMap(g => g.topics).filter(t => t.ready);
