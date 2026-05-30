-- 12 high-frequency behavioral interview questions, formatted as quiz cards.
-- Each card: the question + what's tested + STAR outline + pitfalls + self-rate rubric.
-- Users read, optionally edit their own notes, then self-rate PASS/PARTIAL/FAIL.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

(
  'Behavioral · Lead a project from idea to launch',
$content$
### The Question
> *"Tell me about a project you led from idea to launch. Walk me through how it started and how it ended."*

### What They're Testing
- Can you scope ambiguity into shippable deliverables?
- Did you own the **outcome** or just the code?
- Did you bring others along, or operate solo?

### STAR Outline — Fill In Your Story
- **Situation** — State of the world. Why did this project need to exist? Constraints (timeline, team, business pressure).
- **Task** — What were *you personally* accountable for? Resist saying *we*.
- **Action** — 2–3 concrete decisions where *you* made the call. Show the moment you said *"we're doing X, not Y."*
- **Result** — Quantified. Adoption %, revenue, latency, headcount saved.

### Common Pitfalls
- Saying *"we"* throughout — interviewer can't tell what you did
- Skipping the mid-project setback (every real project has one)
- No numbers in the result
- Story > 3 minutes

### Self-Eval Rubric
- **PASS** — < 3 min, clear personal accountability, 1 quantified result, 1 mid-project setback recovered from
- **PARTIAL** — Story good but no numbers, OR "we" dominant, OR > 4 minutes
- **FAIL** — Can't recall a real project, OR can't isolate your role
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','leadership','ownership'],
  NULL
),

(
  'Behavioral · Disagree with your manager or tech lead',
$content$
### The Question
> *"Tell me about a time you strongly disagreed with your manager or tech lead. How did it play out?"*

### What They're Testing
- Backbone — will you push back when you think leadership is wrong?
- Judgment — do you pick the right battles?
- Disagree-and-commit — can you execute someone else's call after losing?

### STAR Outline
- **Situation** — The decision on the table. Why did you disagree?
- **Task** — What was at stake (cost / risk / user impact)?
- **Action** — How you raised it. Did you bring data? Talk 1:1 first? Escalate? **Did you ever back down?**
- **Result** — Whose call won? **And what did you do after?**

### Common Pitfalls
- Picking a trivial disagreement (font size, naming) — signals no judgment
- "I told them they were wrong and they listened" — too clean, doesn't ring true
- Skipping the aftermath — interviewer cares as much about disagree-and-commit as about pushback
- Throwing the manager under the bus

### Self-Eval Rubric
- **PASS** — Disagreement was meaningful, you brought evidence, story includes what happened *after* the call
- **PARTIAL** — Real disagreement but missing aftermath, OR you got your way too easily
- **FAIL** — Disagreement was minor, OR you "always won," OR resentful tone
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','conflict','influence'],
  NULL
),

(
  'Behavioral · Your biggest professional failure',
$content$
### The Question
> *"Tell me about your biggest professional failure. What happened and what did you learn?"*

### What They're Testing
- Self-awareness — can you name a real failure without spinning it?
- Accountability — do you own it or blame circumstances?
- Learning — did it change how you operate?

### STAR Outline
- **Situation** — Set up the context honestly. Don't pre-justify.
- **Task** — What you were trying to do.
- **Action** — What *you specifically* did wrong. Be precise. *"I underestimated X"* / *"I didn't validate Y"* / *"I trusted Z without checking."*
- **Result** — The actual damage (cost, time, trust, churn). Then: **the lesson, with proof it stuck** — a later situation where you behaved differently.

### Common Pitfalls
- The "humble-brag failure" — *"I worked too hard"* / *"I cared too much about quality"*
- Blaming the team / market / leadership
- Stopping before the lesson — say what you'd do differently AND when you actually did
- Picking something too small ("I missed a typo")

### Self-Eval Rubric
- **PASS** — Real failure, honest ownership, concrete lesson with a follow-up moment proving the lesson stuck
- **PARTIAL** — Real failure but defensive framing, OR no proof the lesson was applied
- **FAIL** — Fake/humble-brag failure, OR blames others, OR no learning extracted
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','failure','self-awareness'],
  NULL
),

(
  'Behavioral · Took ownership of something outside your role',
$content$
### The Question
> *"Tell me about a time you took on something that wasn't your responsibility."*

### What They're Testing
- Ownership — do you spot problems and fix them, or watch them rot?
- Calibration — did you check before assuming, or barge in?
- Sustainability — did you create lasting change or just heroics?

### STAR Outline
- **Situation** — A problem you noticed that wasn't in your lane.
- **Task** — Why you decided to engage (cost of inaction).
- **Action** — Steps: did you talk to the owner first? Did you scope it or balloon it? Did you set it up to *not* require you forever?
- **Result** — Concrete impact. Bonus: did the org adopt your fix as the new default?

### Common Pitfalls
- Story where you "saved the day" but stepped on the owner's toes
- Heroics with no sustainability — the system fell apart when you stopped
- Scope that ballooned because you didn't draw a line
- Tone that signals you think your job description is beneath you

### Self-Eval Rubric
- **PASS** — Concrete problem, you checked with the owner, lasting fix, you didn't drop your day job
- **PARTIAL** — Real ownership but messy execution (toes / scope), OR temporary fix
- **FAIL** — Vague example, OR you were doing it for visibility, OR ignored existing owners
$content$,
  'quiz', 'easy',
  ARRAY['behavioral','ownership','proactivity'],
  NULL
),

(
  'Behavioral · Deliver under significant ambiguity',
$content$
### The Question
> *"Describe a time you had to deliver on something where the requirements were unclear or constantly changing."*

### What They're Testing
- Judgment — can you make calls without complete information?
- Reduction — can you cut a fuzzy problem into shippable pieces?
- Communication — did you keep stakeholders aligned as scope shifted?

### STAR Outline
- **Situation** — Why was it ambiguous? (New product / unclear customer / shifting business priorities.)
- **Task** — What was the minimum someone needed to deploy.
- **Action** — How you operated. Did you write a one-pager? Time-box exploration? Ship an MVP and iterate? **Name the assumptions you made and how you re-validated them.**
- **Result** — What shipped, who used it, what you learned about the ambiguity.

### Common Pitfalls
- Frame as "I was given a vague task and figured it out" — too generic
- No mention of which assumptions you made (means you didn't think them through)
- Saying you waited for clarity — interviewer wants signal you can move without it
- All exploration, no shipping

### Self-Eval Rubric
- **PASS** — Named the ambiguity precisely, listed 2+ assumptions, scoped to MVP, shipped + iterated
- **PARTIAL** — Showed comfort with ambiguity but didn't articulate the *technique*
- **FAIL** — Waited for spec to come down, OR built everything before validating
$content$,
  'quiz', 'hard',
  ARRAY['behavioral','ambiguity','judgment'],
  NULL
),

(
  'Behavioral · Advocate for the user against internal pushback',
$content$
### The Question
> *"Tell me about a time you pushed back on internal pressure on behalf of users or customers."*

### What They're Testing
- Whose interests do you weight when they conflict?
- Are you a *product engineer* or a ticket executor?
- Can you carry a user-focused argument in a money-focused room?

### STAR Outline
- **Situation** — The internal pressure (deadline / cost / political). The user impact you saw.
- **Task** — Why you couldn't let it ship the way it was scoped.
- **Action** — How you raised it. Data you brought (support tickets, session recordings, churn cohort). Who you persuaded and how.
- **Result** — The change made. Quantify user impact if you can. Note any concessions you made to land the change.

### Common Pitfalls
- Hero framing ("I single-handedly saved the user")
- No quantified user data — just gut feeling
- No concession — real wins involve trade-offs
- Picking too sympathetic a case (no one disagreed it was bad)

### Self-Eval Rubric
- **PASS** — Real conflict, brought data, persuaded a skeptic, measurable user-side win, named the trade-off
- **PARTIAL** — Right instincts but data was thin, OR you didn't have to convince anyone
- **FAIL** — Self-righteous tone, OR no internal opposition to begin with
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','customer-obsession','influence'],
  NULL
),

(
  'Behavioral · Raise the bar or mentor someone',
$content$
### The Question
> *"Tell me about a time you raised the technical bar on your team, or mentored someone to do significantly better work."*

### What They're Testing
- Are you a force multiplier, or a single contributor?
- Can you teach without being condescending?
- Did the bar stay raised after you left the situation?

### STAR Outline
- **Situation** — The standard before. (Was it a code review culture issue? A testing gap? A junior who was struggling?)
- **Task** — What you wanted the new standard / outcome to be.
- **Action** — Specifically: writing docs / running brown-bag / 1:1s / setting up CI checks / pairing. Pick *concrete* actions, not vibes.
- **Result** — Outcome. If a person — what *they* shipped on their own afterward. If process — did the bar stick after you stopped pushing?

### Common Pitfalls
- "I just always tried to do good work and people followed" — passive, not actionable
- Talking about *your* output instead of *theirs*
- No durability — the bar dropped back after you left
- Painting the mentee as helpless to make yourself look good

### Self-Eval Rubric
- **PASS** — Concrete actions, mentee/team shipped without you, change stuck
- **PARTIAL** — Real mentorship but didn't outlast you, OR you took too much credit
- **FAIL** — Vague "leading by example," OR mentee never gained independence
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','mentorship','leverage'],
  NULL
),

(
  'Behavioral · Cross-functional project that nearly failed',
$content$
### The Question
> *"Tell me about a cross-functional project (with PM, design, data, etc.) that almost went off the rails. What did you do?"*

### What They're Testing
- Can you operate across function lines, not just within engineering?
- Do you recognize the failure pattern early?
- Do you take action, or wait for someone else to call the meeting?

### STAR Outline
- **Situation** — Cross-functional setup. Who was involved. What was at stake.
- **Task** — The signal that the project was off track. (Missed dates? Conflicting interpretations? Silent disengagement from one function?)
- **Action** — What you *specifically* did. Called the meeting? Wrote the doc that aligned everyone? Cut scope? Escalated?
- **Result** — Did it land? What you'd do differently next time.

### Common Pitfalls
- The failure was actually somebody else's fault and you were a spectator
- "I called a meeting" — what was *in* the meeting?
- No mention of how the other functions reacted to your intervention
- Storybook ending — real saves leave bruises

### Self-Eval Rubric
- **PASS** — You spotted it early, took non-obvious action, included other functions in the recovery, project shipped (even reduced)
- **PARTIAL** — You participated in the save but didn't drive it, OR didn't articulate what you saw early
- **FAIL** — Were a victim of others' decisions, OR project still failed and you didn't extract a lesson
$content$,
  'quiz', 'hard',
  ARRAY['behavioral','collaboration','recovery'],
  NULL
),

(
  'Behavioral · A hard technical trade-off you made',
$content$
### The Question
> *"Tell me about a hard technical trade-off you had to make. How did you decide?"*

### What They're Testing
- Do you reason about trade-offs explicitly, or default to the trendy option?
- Can you name the alternatives you *rejected* and why?
- Did you revisit the decision after seeing real data?

### STAR Outline
- **Situation** — The technical context (scale, team size, SLA, deadline).
- **Task** — The choice. Frame it as "X vs Y vs Z" not "I chose X."
- **Action** — Decision criteria you weighed (cost, latency, complexity, reversibility, ops burden). Why you weighted them that way. Who you consulted.
- **Result** — What happened. **Was the trade-off correct in hindsight?** Bonus: revisit signal — at what point would you have reversed?

### Common Pitfalls
- Trade-off was actually a no-brainer (one option was obviously better)
- No mention of rejected alternatives
- Resume-driven decision (you picked it because it was trendy)
- No retrospective — refused to admit the call may have been wrong

### Self-Eval Rubric
- **PASS** — Real trade-off, 2+ rejected alternatives with reasons, retrospective with at least one thing you'd weigh differently
- **PARTIAL** — Decent reasoning but no honest retrospective
- **FAIL** — Trade-off wasn't real, OR you can't name what you rejected, OR no learning
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','tradeoffs','technical-judgment'],
  NULL
),

(
  'Behavioral · Give difficult feedback to a peer',
$content$
### The Question
> *"Tell me about a time you had to give difficult feedback to a peer or someone who didn't report to you."*

### What They're Testing
- Will you have the hard conversation, or duck it?
- Can you give critical feedback without damaging the relationship?
- Did you check that the feedback landed and changed behavior?

### STAR Outline
- **Situation** — The behavior or output that needed to change. Why it mattered (impact on team / users / project).
- **Task** — Why *you* were the right person to say something. (Closest collaborator? Direct impact?)
- **Action** — How you set up the conversation. Private, in-person, specific examples, made it about behavior not character. **What you offered to do to support them.**
- **Result** — How they reacted. Whether the behavior changed. What you'd do differently.

### Common Pitfalls
- Feedback was trivial (a typo in a doc)
- You delivered it in Slack or in a group setting
- No follow-up — did the behavior actually change?
- Saintly framing — peer thanked you and changed instantly

### Self-Eval Rubric
- **PASS** — Real stakes, 1:1 delivery, specific examples not vibes, offered support, follow-up evidence of change
- **PARTIAL** — Conversation happened but landing was awkward, OR no follow-up check
- **FAIL** — Feedback was through a channel (Slack / passive-aggressive), OR didn't actually happen, OR no behavior change
$content$,
  'quiz', 'medium',
  ARRAY['behavioral','feedback','difficult-conversation'],
  NULL
),

(
  'Behavioral · Changed your mind based on new data',
$content$
### The Question
> *"Tell me about a time you changed your mind on something significant after seeing new information."*

### What They're Testing
- Are you intellectually honest, or do you defend positions for the sake of consistency?
- Do you actually engage with evidence that contradicts you?
- Can you reverse cleanly without losing credibility?

### STAR Outline
- **Situation** — The position you held and why you held it. (Don't make the original position sound dumb — that defeats the test.)
- **Task** — The new data / argument that came in. Where it came from. Why you took it seriously.
- **Action** — How you reconciled it. Did you consult others to pressure-test? **How did you communicate the reversal to people who were aligned with your prior position?**
- **Result** — Outcome. Did the reversal land? What it cost (credibility, time, redo work).

### Common Pitfalls
- The "mind change" was trivial
- You frame your prior self as dumb — interviewer wants to see good-faith reasoning on both sides
- Skipped the communication step — reversing internally is half the work
- No cost mentioned — real mind-changes have a price tag

### Self-Eval Rubric
- **PASS** — Original position was reasonable, evidence was clear, you reversed publicly, named the cost
- **PARTIAL** — Mind change was real but you minimized the social cost of reversing
- **FAIL** — Change was trivial, OR you secretly switched without telling stakeholders
$content$,
  'quiz', 'easy',
  ARRAY['behavioral','intellectual-honesty','adaptability'],
  NULL
),

(
  'Behavioral · Most ambitious proposal at work',
$content$
### The Question
> *"What's the most ambitious thing you've ever proposed at work? What happened to it?"*

### What They're Testing
- Do you have a vision beyond ticket execution?
- Can you make a case that wins resources?
- Are you accountable for the outcome — including failure to land?

### STAR Outline
- **Situation** — What you saw that others didn't. Why the status quo was inadequate.
- **Task** — What you proposed. Scope it concretely — "rewrite the auth stack" not "improve auth."
- **Action** — How you sold it. Doc? Prototype? 1:1s with each stakeholder? Numbers / risk analysis?
- **Result** — Did it land? Was it scoped down? Was it killed? **Either way, what did you do next?** (Re-pitch? Park it? Quit?)

### Common Pitfalls
- The proposal was risk-free (a refactor with obvious value)
- You proposed it and "leadership wouldn't listen" — passive framing
- Killed proposal → no follow-up action
- Story stops at the pitch instead of the outcome

### Self-Eval Rubric
- **PASS** — Real ambition, strong case (doc + numbers), clear outcome (landed / scoped / killed) with what you did next
- **PARTIAL** — Ambitious idea but you stopped at the pitch, OR no traction strategy
- **FAIL** — Proposal was incremental, OR you blame leadership for not biting
$content$,
  'quiz', 'hard',
  ARRAY['behavioral','vision','influence'],
  NULL
);
