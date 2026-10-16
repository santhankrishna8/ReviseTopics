# Comprehensive Technical Skills Revision Guide (Beginner to Advanced)

A complete, granular breakdown of every topic on your resume to prepare for interviews, deep-dive revisions, and practical system development.

---

## Table of Contents
1. [Programming Languages](#1-programming-languages)
   - [Java](#11-java)
   - [Python](#12-python)
   - [JavaScript](#13-javascript)
   - [TypeScript](#14-typescript)
   - [Regex (Regular Expressions)](#15-regex-regular-expressions)
2. [Frontend Development](#2-frontend-development)
   - [HTML5 & CSS3](#21-html5--css3)
   - [Angular](#22-angular)
   - [React.js (Basics to Intermediate)](#23-reactjs-basics-to-intermediate)
   - [Next.js (Basics)](#24-nextjs-basics)
   - [Node.js (Basics)](#25-nodejs-basics)
3. [Backend & APIs](#3-backend--apis)
   - [Spring Boot & Microservices](#31-spring-boot--microservices)
   - [REST APIs & JSON](#32-rest-apis--json)
   - [FastAPI](#33-fastapi)
   - [Spring Security, OAuth 2.0 & JWT](#34-spring-security-oauth-20--jwt-authentication)
   - [ORM & Hibernate](#35-orm--hibernate)
   - [Postman & API Testing](#36-postman--api-testing)
4. [GenAI & LLMs](#4-genai--llms)
   - [Prompt Engineering](#41-prompt-engineering)
   - [OpenAI API & Model Ecosystem](#42-openai-api--model-ecosystem)
   - [Embeddings & Semantic Search](#43-embeddings--semantic-search)
   - [Retrieval-Augmented Generation (RAG)](#44-retrieval-augmented-generation-rag)
   - [Claude Code & AI Developer Workflows](#45-claude-code--ai-developer-workflows)
   - [Model Context Protocol (MCP)](#46-model-context-protocol-mcp)
   - [Agentic AI & Multi-Agent Architectures](#47-agentic-ai--multi-agent-architectures)
5. [Databases](#5-databases)
   - [Relational Databases: MySQL & PostgreSQL](#51-relational-databases-mysql--postgresql)
   - [MongoDB](#52-mongodb)
   - [Firebase (Firestore)](#53-firebase-firestore)
6. [DevOps, Cloud, Architecture & Practices](#6-devops-cloud-architecture--practices)
   - [Git & Version Control](#61-git--version-control)
   - [Build Tools: Maven](#62-build-tools-maven)
   - [Containerization: Docker](#63-containerization-docker)
   - [Orchestration: Kubernetes](#64-orchestration-kubernetes)
   - [CI/CD Pipelines: Jenkins, GitHub Actions, Vercel, Render](#65-cicd-pipelines-jenkins-vercel-render)
   - [Cloud: Amazon Web Services (AWS)](#66-cloud-amazon-web-services-aws)
   - [Message Broker: Apache Kafka](#67-message-broker-apache-kafka)
   - [Workflow Automation: n8n](#68-workflow-automation-n8n)
   - [Testing: JUnit, Automated Tests & Unit Testing](#69-testing-junit-automated-testing--code-reviews)
   - [Software Engineering Practices: Agile, Scrum, JIRA, SDLC](#610-software-engineering-practices-agile-scrum-jira-sdlc)
   - [System Design (High-Level & Low-Level)](#611-system-design-hld--lld)

---

## 1. Programming Languages

### 1.1 Java
* **Beginner:**
  * JVM architecture: JVM, JRE, JDK, ClassLoader, JIT Compiler, Bytecode execution.
  * Data types, type casting, primitive wrappers, operators, control flow statements.
  * OOP fundamentals: Encapsulation, Inheritance, Polymorphism (compile-time vs. runtime), Abstraction.
  * Classes, Objects, Constructors, `this` vs. `super`, access modifiers (`public`, `protected`, `default`, `private`).
  * Basic String handling: `String` immutability, `StringBuilder`, `StringBuffer`.
* **Intermediate:**
  * Exception Handling: Checked vs. Unchecked, `try-catch-finally`, `try-with-resources`, custom exceptions.
  * Collections Framework:
    * `List` (`ArrayList`, `LinkedList`, `Vector`)
    * `Set` (`HashSet`, `LinkedHashSet`, `TreeSet`)
    * `Map` (`HashMap`, `LinkedHashMap`, `TreeMap`, `ConcurrentHashMap`)
    * `Queue` and `Deque` (`PriorityQueue`, `ArrayDeque`)
    * Internal mechanics of `HashMap` (hashing, buckets, collision resolution, Java 8 treeification).
    * `equals()` and `hashCode()` contract.
  * Generics: Wildcards (`? extends T`, `? super T`), Type erasure.
  * Java 8+ features:
    * Lambdas, Functional Interfaces (`Function`, `Predicate`, `Consumer`, `Supplier`).
    * Streams API: intermediate vs. terminal operations, parallel streams, Collectors.
    * `Optional<T>` handling and avoiding `NullPointerException`.
    * New Date and Time API (`java.time.*`).
    * Records, Pattern Matching, Sealed Classes, Text Blocks (Java 17/21).
* **Advanced:**
  * Multithreading & Concurrency:
    * Thread lifecycle, `Thread` vs `Runnable` vs `Callable`.
    * Synchronization, locks, monitors, `volatile`, atomic variables (`AtomicInteger`).
    * `java.util.concurrent`: Thread pools, `ExecutorService`, `ForkJoinPool`, `CompletableFuture`.
    * Virtual Threads (Project Loom / Java 21).
  * JVM Memory Management & Garbage Collection:
    * Heap vs. Stack, Metaspace, GC algorithms (G1, ZGC, Parallel GC).
    * Memory leaks analysis, Heap dumps (`jmap`, `jstack`, VisualVM).
  * Reflection API, Custom Annotations, Dynamic Proxies.

---

### 1.2 Python
* **Beginner:**
  * Syntax, indentation, variable scope (LEGB rule), built-in types (`int`, `float`, `str`, `bool`).
  * Collections: Lists, Tuples, Dictionaries, Sets; indexing, slicing.
  * Control structures, loops, functions, `*args`, `**kwargs`, default parameters.
  * File I/O, context managers (`with` statement).
* **Intermediate:**
  * OOP in Python: Classes, `__init__`, dunder methods (`__str__`, `__repr__`, `__len__`, `__call__`), inheritance, multiple inheritance & MRO (Method Resolution Order).
  * Comprehensions: List, Set, Dictionary expressions.
  * Iterators, Iterables, and Generators (`yield`, memory efficiency).
  * Decorators: Function decorators, class decorators, passing arguments to decorators.
  * Modules, Packages, Virtual environments (`venv`, `poetry`, `conda`), `pip`.
  * Exception handling: `try`, `except`, `else`, `finally`, custom exception classes.
* **Advanced:**
  * Asynchronous programming: `asyncio`, event loop, `async/await`, tasks, coroutines.
  * Concurrency vs. Parallelism: GIL (Global Interpreter Lock), `threading` vs. `multiprocessing`.
  * Metaprogramming: Type creation, `type()`, metaclasses.
  * Memory management: Reference counting, cyclic garbage collection, `sys.getrefcount`.
  * Typing system: `typing` module, Type Hints, Pydantic data validation and parsing.

---

### 1.3 JavaScript
* **Beginner:**
  * Data types (primitives vs. reference types), `typeof`, type coercion.
  * Variable declarations: `var`, `let`, `const` (scoping, redeclaration, hoisting).
  * Control flow, loops, functions (declarations, expressions, arrow functions).
  * Arrays and Objects: mutation, access, built-in methods (`map`, `filter`, `reduce`, `find`, `forEach`).
  * DOM Manipulation: selectors, event listeners, bubbling, capturing, event delegation.
* **Intermediate:**
  * Closures and Lexical Scope.
  * `this` keyword binding: default, implicit, explicit (`call`, `apply`, `bind`), arrow function lexical `this`.
  * Prototypal inheritance: prototype chain, `Object.create()`, ES6 Classes.
  * Asynchronous JavaScript:
    * Callbacks and callback hell.
    * Promises: lifecycle (`pending`, `fulfilled`, `rejected`), chaining, `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`.
    * `async/await` syntax and error handling with `try/catch`.
  * ES6+ features: Destructuring, spread/rest operator, template literals, optional chaining (`?.`), nullish coalescing (`??`), ES Modules (`import`/`export`).
* **Advanced:**
  * JavaScript Engine & Runtime:
    * Call stack, heap, Web APIs.
    * Event Loop: Microtasks (Promises, `queueMicrotask`) vs. Macrotasks (`setTimeout`, `setInterval`, I/O).
  * Memory Management: Garbage collection (Mark-and-Sweep), memory leaks (detached DOM nodes, forgotten timers, closures).
  * Web Workers, Service Workers, LocalStorage, SessionStorage, IndexedDB, Cookies (SameSite, HttpOnly).

---

### 1.4 TypeScript
* **Beginner:**
  * Why TypeScript: Static typing vs. Dynamic typing, Transpilation.
  * Basic types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
  * Type annotations, Type inference, `any` vs. `unknown` vs. `never`.
  * Arrays, Tuples, Enums (numeric vs. string enums).
* **Intermediate:**
  * Interfaces vs. Type Aliases: declaration merging, extending, union, and intersection types.
  * Function typing: optional params, rest params, function overloads.
  * Generics: Generic functions, generic interfaces, generic constraints (`T extends object`).
  * Literal types, Type Narrowing, Type Guards (`typeof`, `instanceof`, custom user-defined type guards `is`).
  * Strict mode flags: `noImplicitAny`, `strictNullChecks`.
* **Advanced:**
  * Utility Types: `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`.
  * Advanced Types: Mapped types, Conditional types, `infer` keyword, Template Literal Types.
  * `keyof`, `typeof` operators in type space, Index signatures.
  * `tsconfig.json` optimization, path aliases, declaration files (`.d.ts`), module resolution.

---

### 1.5 Regex (Regular Expressions)
* **Beginner:**
  * Literal characters, special characters, escaping.
  * Character classes: `\d`, `\w`, `\s`, `\D`, `\W`, `\S`, `.` (wildcard).
  * Custom sets: `[abc]`, negated sets: `[^abc]`, ranges: `[a-z0-9]`.
  * Anchors: `^` (start of string/line), `$` (end of string/line), `\b` (word boundary).
* **Intermediate:**
  * Quantifiers: `*` (0+), `+` (1+), `?` (0 or 1), `{n}`, `{n,}`, `{n,m}`.
  * Greedy vs. Lazy (Reluctant) quantifiers (`*?`, `+?`).
  * Capture groups `(...)`, non-capturing groups `(?:...)`, backreferences (`\1`).
  * Regex flags: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotAll), `u` (unicode).
* **Advanced:**
  * Lookahead and Lookbehind assertions:
    * Positive lookahead: `(?=...)`
    * Negative lookahead: `(?!...)`
    * Positive lookbehind: `(?<=...)`
    * Negative lookbehind: `(?<!...)`
  * Named capturing groups: `(?<name>...)`.
  * Catastrophic Backtracking and ReDoS (Regular Expression Denial of Service) prevention.
  * Practical implementations in Java (`java.util.regex.Pattern`/`Matcher`), Python (`re`), and JS (`RegExp`).

---

## 2. Frontend Development

### 2.1 HTML5 & CSS3
* **HTML5:**
  * Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`).
  * Accessibility (a11y): ARIA roles, attributes (`aria-label`, `aria-hidden`), keyboard navigation, screen reader support.
  * Forms: Inputs, validations (`pattern`, `required`), `<form>` submission mechanisms.
  * Meta tags, Viewport configuration, SEO fundamentals.
* **CSS3:**
  * Box model: Content, Padding, Border, Margin, `box-sizing: border-box`.
  * CSS Specificity, Cascade, Inheritance, Specificity calculation.
  * Layout Systems:
    * Flexbox: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `flex-grow`, `flex-shrink`.
    * CSS Grid: `grid-template-columns`, `grid-template-rows`, `grid-area`, `gap`, auto-fit vs. auto-fill.
  * Positioning: `static`, `relative`, `absolute`, `fixed`, `sticky`, Z-index context.
  * Responsive Web Design: Media queries, fluid typography, rem/em vs. px/vh/vw.
  * Transitions, Animations (`@keyframes`), Transform properties.
  * CSS Variables (Custom properties), BEM methodology, CSS Preprocessors (SCSS).

---

### 2.2 Angular
* **Beginner:**
  * Angular Architecture: Modules (`NgModule`), Components, Templates, Metadata.
  * Standalone Components (Angular modern standard).
  * Data Binding: Interpolation `{{}}`, Property binding `[]`, Event binding `()`, Two-way binding `[(ngModel)]`.
  * Directives: Structural (`*ngIf`, `*ngFor`, modern `@if`, `@for` control flow), Attribute directives (`ngClass`, `ngStyle`).
* **Intermediate:**
  * Component Communication: `@Input()`, `@Output()`, `EventEmitter`, `@ViewChild`, `@ContentChild`.
  * Services and Dependency Injection: `@Injectable()`, hierarchical injectors (`root`, component-level, module-level).
  * Routing & Navigation: RouterModule, route parameters, query parameters, lazy loading child routes, Route Guards (`CanActivate`, `CanDeactivate`, functional guards).
  * Forms: Reactive Forms (`FormGroup`, `FormControl`, `FormArray`, `Validators`) vs. Template-driven forms.
  * Pipes: Built-in pipes (`date`, `currency`, `async`), Custom pipes (pure vs. impure).
  * HTTP Client: `HttpClientModule`, interceptors (auth token injection, error handling), handling REST responses.
* **Advanced:**
  * Reactive programming with RxJS in Angular:
    * Observables vs. Promises, Subjects, `BehaviorSubject`, `ReplaySubject`.
    * Operators: `map`, `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`, `catchError`, `debounceTime`, `distinctUntilChanged`.
  * Signals (Angular 16+): `signal()`, `computed()`, `effect()`, Signal-based components.
  * Change Detection Strategy: `Default` vs. `OnPush`, `ChangeDetectorRef` (`markForCheck`, `detectChanges`), NgZone.
  * Angular Lifecycle Hooks: `ngOnInit`, `ngOnChanges`, `ngDoCheck`, `ngAfterViewInit`, `ngOnDestroy`.
  * Performance: Lazy loading, SSR with Angular Universal, bundle optimization, hydration.

---

### 2.3 React.js (Basics to Intermediate)
* **Beginner:**
  * JSX syntax, expressions in JSX, JSX vs. HTML.
  * Components: Functional components vs. Class components.
  * Props vs. State: passing data, immutability of state.
  * Event handling and synthetic events.
  * Conditional rendering (`&&`, ternary), rendering lists using `key` prop.
* **Intermediate:**
  * React Hooks:
    * `useState`: State updates, state batching.
    * `useEffect`: Dependency array, mounting, updating, cleanup functions.
    * `useRef`: DOM references, persisting values without re-rendering.
    * `useContext`: Avoiding prop drilling.
    * `useMemo` and `useCallback`: Performance optimization, referential equality.
    * Custom Hooks: Abstracting reusable component logic.
  * Forms: Controlled vs. Uncontrolled components (`useRef` vs. `useState`).
  * Virtual DOM: Reconciliation algorithm, React Fiber architecture basics, diffing rules.
  * Lifting state up, basic state management patterns.
  * Component lifecycle via hooks.

---

### 2.4 Next.js (Basics)
* **Beginner:**
  * What is Next.js: SSR (Server-Side Rendering) vs. CSR (Client-Side Rendering) vs. SSG (Static Site Generation).
  * Routing: App Router (folders, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) vs. Pages Router (`pages/index.tsx`).
  * Navigation: `<Link>` component, `useRouter`, `usePathname`.
* **Intermediate:**
  * Server Components vs. Client Components (`'use client'` directive).
  * Data Fetching: `fetch` caching options (`force-cache`, `no-store`, `revalidate`), Incremental Static Regeneration (ISR).
  * Route Handlers / API Routes (`route.ts`).
  * Next.js optimizations: Image component (`next/image`), Font optimization (`next/font`), Metadata API for SEO.

---

### 2.5 Node.js (Basics)
* **Beginner:**
  * Node.js runtime, V8 engine, architecture (single-threaded, non-blocking I/O).
  * Global objects: `process`, `__dirname`, `__filename`.
  * CommonJS (`require`/`module.exports`) vs. ES Modules (`import`/`export`).
  * Core Modules: `fs` (file system), `path`, `os`, `http`.
* **Intermediate:**
  * Event Emitter pattern (`events` module).
  * Streams and Buffers: Readable, Writable, Duplex, Transform streams; piping streams.
  * Creating a basic HTTP server with the `http` module.
  * Basic Express.js server: Routing, middleware concept, request/response cycle, error-handling middleware.
  * Package management: `package.json`, `package-lock.json`, semantic versioning (`^`, `~`).

---

## 3. Backend & APIs

### 3.1 Spring Boot & Microservices
* **Beginner:**
  * Inversion of Control (IoC) & Dependency Injection (DI) in Spring.
  * Spring Boot starters, auto-configuration (`@SpringBootApplication`, `@EnableAutoConfiguration`).
  * Core annotations: `@Component`, `@Service`, `@Repository`, `@Controller`, `@RestController`, `@Autowired`, `@Value`.
  * Bean Scopes: Singleton, Prototype, Request, Session.
  * Configuration: `application.properties` vs. `application.yml`, profiles (`@Profile`).
* **Intermediate:**
  * Spring Boot Actuator: Health checks, metrics, info endpoints.
  * Exception handling: `@ControllerAdvice`, `@ExceptionHandler`, standard error structures (`ProblemDetails`).
  * Profiles & Environment variables, externalized configuration.
  * Logging: SLF4J with Logback, log levels, structured logging.
  * Testing in Spring Boot: `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`, Mockito integration (`@MockBean`).
* **Advanced & Microservices Architecture:**
  * Microservices concepts: Decomposition patterns, single responsibility, database per service.
  * Spring Cloud ecosystem:
    * Service Discovery: Netflix Eureka / Consul.
    * API Gateway: Spring Cloud Gateway (routing, filters, rate limiting).
    * Centralized Configuration: Spring Cloud Config Server.
    * Circuit Breaker & Resiliency: Resilience4j (Circuit Breaker, RateLimiter, Retry, Bulkhead).
    * Distributed Tracing: Micrometer Tracing, OpenTelemetry, Zipkin / Jaeger.
  * Inter-service communication: Synchronous (REST, `WebClient`, OpenFeign) vs. Asynchronous (Event-driven via Kafka/RabbitMQ).
  * Distributed Transaction Patterns: Saga Pattern (Choreography vs. Orchestration), Two-Phase Commit (2PC) limitations, Outbox Pattern.

---

### 3.2 REST APIs & JSON
* **REST Principles:**
  * Client-Server, Stateless, Cacheable, Uniform Interface, Layered System.
  * HTTP Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD (idempotency and safety rules).
  * HTTP Status Codes:
    * 2xx: 200 OK, 201 Created, 204 No Content.
    * 3xx: 301 Moved Permanently, 304 Not Modified.
    * 4xx: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests.
    * 5xx: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.
  * Resource naming conventions, URI design, versioning strategies (URI, header, query param).
  * Pagination, Sorting, and Filtering standards.
  * Richardson Maturity Model (Levels 0 to 3, HATEOAS).
* **JSON:**
  * Syntax rules: data structures (objects, arrays, keys, values, valid data types).
  * Serialization and Deserialization:
    * Java: Jackson library (`ObjectMapper`, `@JsonProperty`, `@JsonIgnore`, `@JsonInclude`).
    * Python: `json` module (`loads`, `dumps`), Pydantic serialization.
    * JavaScript: `JSON.parse()`, `JSON.stringify()`.

---

### 3.3 FastAPI
* **Beginner:**
  * Why FastAPI: ASGI vs. WSGI, async performance, auto-generated documentation (Swagger UI / OpenAPI, ReDoc).
  * Path parameters, query parameters, request body handling.
  * Type hints with Python type system.
* **Intermediate:**
  * Pydantic Models: Validation, fields, default values, nested models, `Field()` validator functions.
  * Dependency Injection System: `Depends()`, sub-dependencies, yield dependencies (database sessions).
  * Middleware: CORS middleware, logging middleware, execution timing.
  * Response Models: `response_model`, status codes, custom responses (`JSONResponse`, `StreamingResponse`).
  * Error Handling: `HTTPException`, custom exception handlers.
* **Advanced:**
  * Background tasks (`BackgroundTasks`).
  * Asynchronous database integration (SQLAlchemy AsyncSession, Tortoise-ORM).
  * Authentication & Security integration: `OAuth2PasswordBearer`, security scopes.
  * Production deployment: Uvicorn, Gunicorn worker classes, Docker containerization.

---

### 3.4 Spring Security, OAuth 2.0 & JWT Authentication
* **Spring Security Core:**
  * Filter Chain architecture: `SecurityFilterChain`, `DelegatingFilterProxy`, order of filters.
  * Core interfaces: `Authentication`, `SecurityContext`, `SecurityContextHolder`, `AuthenticationManager`, `UserDetailsService`, `UserDetails`.
  * Password hashing: `PasswordEncoder`, BCrypt, Argon2.
  * Method level security: `@PreAuthorize`, `@PostAuthorize`, `@Secured`.
* **JWT (JSON Web Token):**
  * Structure: Header, Payload (Claims: `iss`, `sub`, `exp`, custom claims), Signature.
  * Signing algorithms: Symmetric (HMAC-SHA256) vs. Asymmetric (RSA/ECDSA public-private key pair).
  * Authentication flow: Login -> Issue Access & Refresh tokens -> Store tokens -> Client bearer token injection -> Backend JWT validation filter.
  * Refresh token rotation and revocation strategies.
* **OAuth 2.0 & OpenID Connect (OIDC):**
  * Roles: Resource Owner, Client, Authorization Server, Resource Server.
  * Grant Types: Authorization Code Flow (with PKCE for SPAs), Client Credentials, Refresh Token.
  * OpenID Connect layer: ID Tokens vs. Access Tokens.
  * Spring Security as an OAuth 2.0 Resource Server: configuring `issuer-uri`, decoding and validating JWTs automatically.

---

### 3.5 ORM & Hibernate
* **Beginner:**
  * What is ORM: Object-Relational Impedance Mismatch.
  * JPA (Java Persistence API) specification vs. Hibernate (Implementation).
  * Basic Annotations: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Transient`.
* **Intermediate:**
  * Entity Relationships:
    * `@OneToOne`, `@OneToMany`, `@ManyToOne`, `@ManyToMany`.
    * Uni-directional vs. Bi-directional mappings, `mappedBy` attribute.
    * Cascade types (`ALL`, `PERSIST`, `MERGE`, `REMOVE`) and `orphanRemoval`.
    * Fetch types: `LAZY` vs. `EAGER` loading and implications.
  * Spring Data JPA:
    * `JpaRepository`, `CrudRepository`.
    * Method name query derivation (`findByEmailAndStatus`).
    * `@Query` annotation (JPQL vs. Native SQL).
  * Hibernate Lifecycle States: Transient, Persistent, Detached, Removed.
* **Advanced:**
  * The N+1 Query Problem: Detection and resolutions (`JOIN FETCH`, `@EntityGraph`, batch fetching).
  * Caching in Hibernate:
    * First-level cache (Session cache, mandatory).
    * Second-level cache (SessionFactory level, Ehcache, Redis).
    * Query cache.
  * Transaction management: `@Transactional`, propagation types (`REQUIRED`, `REQUIRES_NEW`, etc.), isolation levels, rollback rules.
  * Optimistic locking (`@Version`) vs. Pessimistic locking (`LockModeType.PESSIMISTIC_WRITE`).

---

### 3.6 Postman & API Testing
* **Beginner:**
  * Creating collections, folders, and requests.
  * Setting headers, query parameters, URL path variables, and body formats (raw JSON, form-data, x-www-form-urlencoded).
  * Inspecting responses: Status codes, headers, response body, response time, and size.
* **Intermediate:**
  * Environments and Variables: Global, Collection, Environment, and Data variables.
  * Pre-request scripts (e.g., dynamic timestamps, hashing) and Post-request Tests (`pm.test`, `pm.expect`, status checks, schema validation).
  * Automatic token propagation (extracting bearer token from login response and setting collection variable).
* **Advanced:**
  * Collection Runner for automated regression test runs.
  * Mock Servers and API Documentation generation.
  * Newman (CLI runner for Postman) integration into CI/CD pipelines.

---

## 4. GenAI & LLMs

### 4.1 Prompt Engineering
* **Foundational Techniques:**
  * System prompts vs. User prompts vs. Assistant prompts.
  * Zero-shot prompting, Few-shot prompting (in-context examples).
  * Instruction clarity, specificity, and constraints definition.
* **Advanced Techniques:**
  * Chain-of-Thought (CoT) & Zero-shot CoT ("Think step by step").
  * Least-to-Most prompting, Directional Stimulus prompting.
  * ReAct pattern (Reasoning + Acting).
  * Structured Outputs: JSON mode, schema enforcement (OpenAI Structured Outputs / Pydantic schemas).
  * Mitigating Hallucinations, Prompt Injection, and Jailbreaks.

---

### 4.2 OpenAI API & Model Ecosystem
* **Core API Concepts:**
  * Chat Completions API (`v1/chat/completions`).
  * Model families: GPT-4o, GPT-4o-mini, reasoning models (o1, o3-mini).
  * Hyperparameters:
    * `temperature`: Determinism vs. creativity.
    * `top_p` (nucleus sampling): Cumulative probability distribution.
    * `max_tokens` / `max_completion_tokens`.
    * `presence_penalty` and `frequency_penalty`.
    * `stop` sequences.
* **Function Calling / Tool Use:**
  * Defining tools with JSON Schema.
  * Handling tool call invocations, passing responses back to model.
  * Parallel tool calling and forcing tool choices (`tool_choice: "required"` or specific functions).
* **Streaming & Rate Limiting:**
  * Server-Sent Events (SSE) streaming (`stream=True`).
  * Token counting using `tiktoken`.
  * Rate limits (TPM, RPM) handling with exponential backoff and jitter.

---

### 4.3 Embeddings & Semantic Search
* **Embeddings Fundamentals:**
  * What are vector embeddings (high-dimensional latent representations of semantic meaning).
  * Popular embedding models: OpenAI (`text-embedding-3-small`, `text-embedding-3-large`), open-source (Sentence-Transformers/BGE).
  * Vector dimensionality, truncation/reduction (Matryoshka Representation Learning).
* **Similarity Metrics:**
  * Cosine similarity, Dot product, Euclidean distance (L2 norm).
* **Vector Indexing & Databases:**
  * Vector search algorithms: Exact Nearest Neighbor (KNN) vs. Approximate Nearest Neighbors (ANN).
  * Algorithms: HNSW (Hierarchical Navigable Small World), IVF (Inverted File Index).
  * Vector databases and vector extensions: ChromaDB, Pinecone, Qdrant, Milvus, PostgreSQL (`pgvector`).
* **Semantic Search vs. Keyword Search:**
  * Dense retrieval (Vector) vs. Sparse retrieval (BM25, TF-IDF).
  * Hybrid Search: Combining dense and sparse results with Reciprocal Rank Fusion (RRF).

---

### 4.4 Retrieval-Augmented Generation (RAG)
* **Standard RAG Architecture:**
  * Ingestion Pipeline: Document loading, text extraction, cleaning.
  * Chunking strategies: Fixed-size, sliding window with overlap, semantic chunking, recursive character chunking.
  * Indexing: Embedding generation and upserting to vector stores with metadata.
  * Query Pipeline: Query embedding -> Vector similarity retrieval -> Context injection -> Generation.
* **Advanced RAG Patterns:**
  * Pre-retrieval optimizations: Query Rewriting, HyDE (Hypothetical Document Embeddings), Multi-query expansion.
  * Post-retrieval optimizations:
    * Re-ranking using Cross-Encoders (Cohere Rerank, BGE-Reranker).
    * Context compression and context filtering.
  * GraphRAG: Combining knowledge graphs with vector retrieval.
  * RAG Evaluation: Ragas / TruLens metrics (Faithfulness, Answer Relevance, Context Precision, Context Recall).

---

### 4.5 Claude Code & AI Developer Workflows
* **Claude Code Fundamentals:**
  * Understanding agentic CLI tools for code generation, debugging, and terminal automation.
  * Context gathering within local codebases: project exploration, symbol search, file dependency mapping.
  * Terminal command execution, safety boundary management, and permission models.
* **Engineering Workflows:**
  * Generating test suites from existing code.
  * Refactoring legacy modules using step-by-step diff reviews.
  * Multi-file editing and tracking dependencies across large codebases.
  * Effective prompt prompting for CLI coding agents (providing clear specifications, invariants, and constraints).

---

### 4.6 Model Context Protocol (MCP)
* **Architecture & Concepts:**
  * Why MCP: Standardized protocol created by Anthropic to decouple LLMs from client tools and data sources.
  * Client-Server Architecture: Host application (e.g., Claude Desktop, IDE extensions) -> MCP Client -> MCP Server -> Resources/Tools.
* **Core Primitives:**
  * **Resources:** Reading data/files (REST-like data fetching for context).
  * **Tools:** Executable functions that perform side effects or computations (callable by the model).
  * **Prompts:** Reusable pre-defined prompt templates and workflows provided by the server.
* **Transport Mechanisms:**
  * `stdio`: Standard input/output for local processes.
  * `SSE` (Server-Sent Events) over HTTP: For remote servers and network-accessible services.
* **Building MCP Servers:**
  * Building custom servers in TypeScript or Python (using official MCP SDKs).
  * Implementing security, authorization, and input validation for exposed MCP tools.

---

### 4.7 Agentic AI & Multi-Agent Architectures
* **Core Components of an AI Agent:**
  * LLM brain, Memory (Short-term context, Long-term episodic/semantic memory), Tools, Planning module.
* **Agent Patterns:**
  * ReAct (Reason + Act loop).
  * Plan-and-Solve / Plan-and-Execute.
  * Reflection and Self-Correction (Critic-Actor loops).
* **Multi-Agent Systems:**
  * Hierarchical agent architectures (Supervisor/Router distributing to specialized worker agents).
  * Collaborative / Peer-to-peer agent patterns.
  * Agent frameworks landscape: LangGraph, CrewAI, AutoGen, LlamaIndex Workflows.
  * State management, thread checkpoints, and human-in-the-loop (HITL) approval gates.

---

## 5. Databases

### 5.1 Relational Databases: MySQL & PostgreSQL
* **Beginner:**
  * Relational Model: Tables, Rows, Columns, Primary Keys, Foreign Keys, Unique Keys.
  * SQL Basics: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `GROUP BY`, `HAVING`.
  * Joins: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, `CROSS JOIN`.
  * DDL (Data Definition Language) vs. DML (Data Manipulation Language).
* **Intermediate:**
  * Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.
  * Subqueries, Correlated Subqueries, Common Table Expressions (CTEs - `WITH` clause).
  * Window Functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()`, `OVER (PARTITION BY ... ORDER BY ...)`.
  * Database Normalization: 1NF, 2NF, 3NF, BCNF, and intentional Denormalization.
  * Constraints, Triggers, Stored Procedures, Views.
* **Advanced:**
  * ACID Properties: Atomicity, Consistency, Isolation, Durability.
  * Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable; Phenomena (Dirty reads, Non-repeatable reads, Phantom reads).
  * Indexing Deep Dive:
    * B-Tree / B+Tree indexes vs. Hash indexes.
    * Clustered vs. Non-Clustered indexes.
    * Composite indexes and the Leftmost Prefix Rule.
    * PostgreSQL specific: GIN, GiST, BRIN indexes, `pgvector` for vector similarity.
  * Performance Tuning:
    * Reading `EXPLAIN` and `EXPLAIN ANALYZE` plans.
    * Identifying Table Scans vs. Index Scans vs. Index Only Scans.
    * Connection pooling (HikariCP, PgBouncer).
    * Partitioning (Range, List, Hash) and Sharding strategies.
    * Replication: Master-Slave (Read replicas), synchronous vs. asynchronous replication.

---

### 5.2 MongoDB
* **Beginner:**
  * Document-oriented model: JSON/BSON format, Collections, Documents.
  * CRUD operations: `insertOne`, `insertMany`, `find`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`.
  * Query selectors (`$eq`, `$gt`, `$in`, `$and`, `$or`, `$regex`).
* **Intermediate:**
  * Schema Design: Embedding vs. Referencing documents (1:1, 1:N, N:N modeling).
  * Updating operators: `$set`, `$unset`, `$push`, `$addToSet`, `$pull`, `$inc`.
  * Aggregation Pipeline: `$match`, `$project`, `$group`, `$sort`, `$unwind`, `$lookup` (joining collections), `$facet`.
  * Indexing: Single field, Compound index, Multikey index (arrays), TTL indexes, Text indexes.
* **Advanced:**
  * Replica Sets: Primary, Secondary, Arbiter nodes; election process, automatic failover.
  * Write Concern (`w: 1`, `w: "majority"`) and Read Concern (`local`, `majority`, `linearizable`).
  * Sharding: Shard keys, mongos router, config servers, chunk splitting and balancing.
  * Change Streams for real-time event-driven reactive architectures.

---

### 5.3 Firebase (Firestore)
* **Beginner:**
  * Cloud Firestore data model: Documents, Collections, Subcollections.
  * Basic CRUD: `addDoc`, `setDoc`, `getDoc`, `updateDoc`, `deleteDoc`.
  * Real-time listeners: `onSnapshot` for live client updates.
* **Intermediate:**
  * Querying: compound queries, ordering, limits, and array-contains.
  * Indexing in Firestore: Single-field indexes vs. Composite indexes.
  * Firestore Security Rules: Writing rules for authentication and authorization (`request.auth`, `resource.data`).
* **Advanced:**
  * Offline persistence and local caching behavior.
  * Batched writes and Transactions (`runTransaction`).
  * Firestore scaling limits, read/write cost optimization, distributed counter patterns.

---

## 6. DevOps, Cloud, Architecture & Practices

### 6.1 Git & Version Control
* **Beginner:**
  * Working directory, Staging area, Local repository, Remote repository.
  * Commands: `init`, `clone`, `status`, `add`, `commit`, `push`, `pull`, `fetch`.
  * Branching basics: `branch`, `checkout`, `switch`, `merge`.
* **Intermediate:**
  * Git Log and Diffs: `log --oneline --graph`, `diff`.
  * Stashing: `git stash`, `stash pop`, `stash apply`, `stash drop`.
  * Resolving merge conflicts cleanly.
  * Undoing changes: `git checkout -- <file>`, `git restore`, `git reset` (soft, mixed, hard), `git revert`.
  * Rebasing: `git rebase <target>` vs. `git merge`, Interactive rebase (`git rebase -i` squash, reword, drop).
* **Advanced:**
  * Advanced commands: `git cherry-pick`, `git bisect` (binary search for bug introduction), `git reflog` (recovering "lost" commits).
  * Git workflows: GitFlow, Trunk-Based Development, Feature Branching.
  * Git hooks: Pre-commit, pre-push (Husky in JS ecosystem).

---

### 6.1b GitHub (added on request)
* **Beginner:**
  * Git vs GitHub; repositories (public, private, internal), README, LICENSE, `.gitignore`.
  * Authentication: HTTPS with personal access tokens (fine-grained vs classic), SSH keys, two-factor authentication, signed commits.
  * Forks vs clones vs branches; Pull Requests (draft, review, merge methods: merge commit, squash, rebase).
  * Issues, labels, milestones, Projects, Markdown (GitHub Flavored Markdown).
* **Intermediate:**
  * Code review: approvals, requested changes, suggested changes, `CODEOWNERS`.
  * Branch protection rules and repository rulesets, required status checks, merge queue.
  * GitHub Actions: workflows, events, jobs, steps, runners, actions, secrets and variables, matrix builds, caching, artifacts.
* **Advanced:**
  * Actions for deployment: environments and approvals, OIDC to cloud providers, `GITHUB_TOKEN` permissions, reusable workflows, composite actions, self-hosted runners, Actions security.
  * Security features: Dependabot, dependency graph, code scanning (CodeQL), secret scanning and push protection, security advisories.
  * GitHub CLI (`gh`), REST and GraphQL APIs, webhooks, GitHub Apps; Packages (ghcr.io), Releases, Pages.
  * GitHub Flow and release practices; GitHub Copilot.

---

### 6.2 Build Tools: Maven
* **Beginner:**
  * What is Maven: Build automation and dependency management.
  * Project structure: Standard Directory Layout (`src/main/java`, `src/test/java`, `pom.xml`).
  * Coordinates: `groupId`, `artifactId`, `version` (GAV).
* **Intermediate:**
  * Maven Lifecycle & Phases: `clean`, `validate`, `compile`, `test`, `package`, `verify`, `install`, `deploy`.
  * Dependency Scopes: `compile`, `provided`, `runtime`, `test`, `system`.
  * Managing Plugins: `maven-compiler-plugin`, `maven-surefire-plugin` (running unit tests), `spring-boot-maven-plugin`.
* **Advanced:**
  * Multi-module Maven projects (`<modules>`, parent `pom.xml`).
  * Dependency Mediation: Transitive dependencies, conflict resolution, `<dependencyManagement>`, `<exclusions>`.
  * Maven profiles: Environment-specific builds.

---

### 6.3 Containerization: Docker
* **Beginner:**
  * Containers vs. Virtual Machines.
  * Core concepts: Image, Container, Dockerfile, Docker Hub / Registry.
  * Basic CLI: `docker run`, `docker ps`, `docker stop`, `docker rm`, `docker rmi`, `docker logs`, `docker exec -it`.
* **Intermediate:**
  * Writing Dockerfiles: `FROM`, `WORKDIR`, `COPY`, `ADD`, `RUN`, `CMD`, `ENTRYPOINT`, `EXPOSE`, `ENV`, `ARG`.
  * `CMD` vs. `ENTRYPOINT`.
  * Port forwarding (`-p 8080:8080`) and Volume mapping (`-v /local:/container`).
  * Docker Networking: bridge, host, none, custom networks.
  * Docker Compose: Defining multi-container services, networks, volumes in `docker-compose.yml`.
* **Advanced:**
  * Multi-stage builds for minimal image size (e.g., build with Maven, run with JRE alpine).
  * Caching layers optimization and reducing image build times.
  * Security: Running as non-root user, scanning for vulnerabilities (`docker scout`, Trivy), `.dockerignore`.

---

### 6.4 Orchestration: Kubernetes
* **Beginner:**
  * Why Kubernetes (K8s): Container orchestration, self-healing, scaling.
  * Cluster Architecture:
    * Control Plane: `kube-apiserver`, `etcd`, `kube-scheduler`, `kube-controller-manager`.
    * Worker Nodes: `kubelet`, `kube-proxy`, Container Runtime (containerd).
  * Basic Objects: Pod, Namespace.
  * Basic `kubectl` commands: `get`, `describe`, `logs`, `apply -f`, `delete`.
* **Intermediate:**
  * Deployments and ReplicaSets: Rollouts, rollbacks, scaling replicas.
  * Services: Networking inside cluster (`ClusterIP`, `NodePort`, `LoadBalancer`, `ExternalName`).
  * Configuration: `ConfigMap` (plain text) and `Secret` (base64 encoded credentials).
  * Volumes: PersistentVolume (PV), PersistentVolumeClaim (PVC), StorageClasses.
* **Advanced:**
  * Ingress Controllers (NGINX, Traefik) and Ingress rules for SSL termination and path-based routing.
  * Health Checks: Liveness Probes, Readiness Probes, Startup Probes.
  * Resource Management: Requests and Limits (CPU, Memory), OOMKilled troubleshooting.
  * Horizontal Pod Autoscaler (HPA) based on metrics.

---

### 6.5 CI/CD Pipelines: Jenkins, Vercel & Render
* **CI/CD Core Concepts:**
  * Continuous Integration: Automated builds, linting, testing, packaging on code push.
  * Continuous Delivery vs. Continuous Deployment: Manual approval gate vs. automated deployment to production.
* **Jenkins:**
  * Jenkins architecture: Master-Agent (Controller-Node) model.
  * Declarative Pipeline vs. Scripted Pipeline.
  * Writing `Jenkinsfile`: stages, steps, post actions (`always`, `success`, `failure`), environment variables, credentials handling.
  * Triggers: Webhooks (GitHub/GitLab push events), polling, scheduled cron triggers.
  * Automated testing and artifact archiving in Jenkins.
* **Modern Deployment Platforms:**
  * **Vercel:**
    * Git-driven automated previews and production deployments.
    * Edge Network, Serverless functions, routing configuration (`vercel.json`), environment variables.
  * **Render:**
    * Deploying Web Services, Background Workers, Static Sites, Cron Jobs.
    * Connecting Git repositories, configuring build commands, start commands, health checks, environment variables.

---

### 6.6 Cloud: Amazon Web Services (AWS)
* **Compute:**
  * EC2: Instance types, AMIs, Key pairs, Security Groups (inbound/outbound rules).
  * AWS Lambda: Serverless computing, triggers, execution limits, cold starts.
* **Storage & Content Delivery:**
  * S3 (Simple Storage Service): Buckets, objects, access policies, CORS, static website hosting.
  * CloudFront: CDN, edge locations, caching policies.
* **Networking:**
  * VPC (Virtual Private Cloud): Public vs. Private Subnets, Internet Gateways, NAT Gateways, Route Tables.
* **Databases & Messaging:**
  * RDS (Relational Database Service): Managed PostgreSQL/MySQL, automated backups, multi-AZ deployments.
  * SQS (Simple Queue Service) vs. SNS (Simple Notification Service).
* **Security & Management:**
  * IAM (Identity and Access Management): Users, Groups, Roles, Policies (Least Privilege Principle).
  * CloudWatch: Log groups, metrics, alarms.

---

### 6.7 Message Broker: Apache Kafka
* **Beginner:**
  * Event-driven architecture: Publishers, Subscribers, Message brokers.
  * Core concepts: Messages/Records, Topics, Partitions, Offsets.
  * Producers and Consumers.
* **Intermediate:**
  * Consumer Groups and Partition rebalancing.
  * Partition Keys and message ordering guarantees (ordering within a single partition).
  * Offset commit strategies: Auto-commit vs. Manual sync/async commit.
  * Retention policies: time-based, size-based retention, log compaction.
* **Advanced:**
  * Delivery semantics: At-most-once, At-least-once, Exactly-once processing (Idempotent producer, transactional messaging).
  * Kafka Cluster Architecture: Brokers, KRaft (Kafka Raft metadata mode) vs. ZooKeeper.
  * Spring Boot Kafka Integration: `KafkaTemplate`, `@KafkaListener`, handling poison pills, Dead Letter Queues (DLQ).

---

### 6.8 Workflow Automation: n8n
* **Beginner:**
  * Core concepts: Workflows, Nodes, Triggers (Webhook, Schedule, Event-based), Connections.
  * Inspecting execution data, JSON payload flow between nodes.
* **Intermediate:**
  * Data Transformation: Code node (JavaScript/Python), filtering, merging data streams, item lists mapping.
  * Error Handling: Error trigger nodes, retry on fail, conditional branching (`If`, `Switch` nodes).
  * Integrating REST APIs: HTTP Request node, OAuth 2.0 / API Key authentication credential management.
* **Advanced:**
  * Custom webhook listeners and handling bidirectional API integrations.
  * AI Agent integration within n8n (using LangChain-powered nodes, LLM chains, and vector memory).
  * Self-hosting n8n using Docker and managing execution data retention.

---

### 6.9 Testing: JUnit, Automated Testing & Code Reviews
* **JUnit (Java Testing):**
  * JUnit 5 architecture: Jupiter, Vintage, Platform.
  * Annotations: `@Test`, `@BeforeEach`, `@AfterEach`, `@BeforeAll`, `@AfterAll`, `@Disabled`.
  * Assertions: `assertEquals`, `assertTrue`, `assertThrows`, `assertAll`.
  * Parameterized Tests: `@ParameterizedTest`, `@ValueSource`, `@CsvSource`, `@MethodSource`.
  * Mocking with Mockito: `@Mock`, `@InjectMocks`, `when().thenReturn()`, `verify()`, `ArgumentCaptor`.
* **Automated Testing Strategy:**
  * The Test Pyramid: Unit Tests, Integration Tests, End-to-End (E2E) Tests.
  * Code Coverage: Line coverage vs. Branch coverage (JaCoCo).
  * Contract testing basics (Pact) and regression test automation.
* **Code Reviews & Code Quality:**
  * Static Analysis: SonarQube, SpotBugs, ESLint, Prettier.
  * Code review best practices: Readability, maintainability, performance, security vulnerabilities, edge-case coverage.
  * Constructive code review feedback and PR etiquette.

---

### 6.10 Software Engineering Practices: Agile, Scrum, JIRA, SDLC
* **SDLC (Software Development Life Cycle):**
  * Phases: Requirements analysis, Design/Architecture, Implementation (Coding), Testing, Deployment, Maintenance.
  * Waterfall vs. Agile comparison.
* **Agile & Scrum Framework:**
  * Agile Manifesto: Core values and 12 principles.
  * Scrum Roles: Product Owner, Scrum Master, Development Team.
  * Scrum Artifacts: Product Backlog, Sprint Backlog, Increment, Definition of Done (DoD), Definition of Ready (DoR).
  * Scrum Ceremonies: Sprint Planning, Daily Standup, Sprint Review / Demo, Sprint Retrospective.
  * Estimation: Story Points, Planning Poker, Velocity, Burn-down charts.
* **JIRA:**
  * Issue types: Epic, Story, Task, Bug, Sub-task.
  * Workflows: To Do, In Progress, Code Review, QA, Done.
  * Kanban boards vs. Scrum boards, sprint backlog tracking, filtering with JQL (Jira Query Language).

---

### 6.11 System Design (HLD & LLD)
* **High-Level Design (HLD):**
  * Scalability: Vertical scaling vs. Horizontal scaling.
  * Load Balancing: Layer 4 vs. Layer 7, algorithms (Round Robin, Least Connections, Consistent Hashing).
  * Caching: Cache-Aside, Write-Through, Write-Behind, Refresh-Ahead; Eviction policies (LRU, LFU).
  * CAP Theorem (Consistency, Availability, Partition Tolerance) & PACELC Theorem.
  * Monolith to Microservices transition strategies (Strangler Fig Pattern).
  * Rate Limiting algorithms: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log.
  * Common HLD questions to practice: URL Shortener, Notification Service, Chat System, Rate Limiter.
* **Low-Level Design (LLD) & Object-Oriented Design:**
  * **SOLID Principles:**
    * Single Responsibility Principle (SRP)
    * Open/Closed Principle (OCP)
    * Liskov Substitution Principle (LSP)
    * Interface Segregation Principle (ISP)
    * Dependency Inversion Principle (DIP)
  * **Design Patterns:**
    * Creational: Singleton, Factory Method, Abstract Factory, Builder, Prototype.
    * Structural: Adapter, Decorator, Facade, Proxy, Composite.
    * Behavioral: Strategy, Observer, Command, Iterator, Template Method, State.
  * Database Schema Design and Clean Architecture / Hexagonal Architecture layers.