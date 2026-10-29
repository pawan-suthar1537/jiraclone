# Product Requirements Document (PRD) — JiraClone (iconScrum)

**Version:** 1.0
**Author:** Pawan Suthar
**Last Updated:** October 29, 2026
**Status:** Draft for Review

---

## 1. Product Vision

JiraClone (branded as **iconScrum**) is a project management platform inspired by Jira, designed to help teams plan, track, and manage software development projects using Agile and Scrum methodologies. The product provides a Kanban-style board interface, sprint management, issue tracking, and team collaboration tools within an organization-based workspace.

The goal is to deliver a lightweight, user-friendly alternative to Jira for small-to-medium development teams that need core Agile tooling without enterprise complexity.

---

## 2. Problem Statement

Small and mid-size development teams face challenges in:
- **Project visibility:** Without structured tracking, it is difficult to see task progress, assign responsibilities, and identify blockers.
- **Sprint management:** Many open-source or free project management tools lack proper sprint-based planning for Scrum teams.
- **Cost barriers:** Enterprise tools like Jira offer robust features but come with high licensing costs and steep learning curves for small teams.
- **Collaboration gaps:** Teams using spreadsheets, email, or chat-based task tracking lose context when tasks move between people.

iconScrum addresses these gaps by providing an always-free (MVP), feature-complete Agile project management platform.

---

## 3. Goals & Objectives

| Goal | Description |
|------|-------------|
| **G1: Core Issue Tracking** | Enable teams to create, assign, prioritize, and update issues across multiple statuses |
| **G2: Sprint-Based Planning** | Allow projects to be organized into time-boxed sprints with start/end dates |
| **G3: Kanban Board Experience** | Provide a drag-and-drop Kanban board for visual task management |
| **G4: Multi-Organization Support** | Support multiple users across different organizations (workspaces) |
| **G5: Responsive UI** | Deliver a mobile-friendly, dark-themed interface with accessibility |

---

## 4. Target Users (Personas)

### 4.1 Product Owner / Organization Admin
- Creates and manages projects
- Defines sprints and their timelines
- Assigns work items and monitors team progress
- Has administrative permissions (create/delete projects, sprints)

### 4.2 Developer / Team Member
- Views issues assigned to them
- Updates issue status (TODO, In Progress, In Review, Done)
- Adds issues to sprint boards
- Filters and searches issues by priority, assignee, and title

### 4.3 Stakeholder / Viewer
- Observes sprint progress and project health
- Does not modify issues or sprints
- Gains visibility through shared dashboards (future)

---

## 5. User Stories

### 5.1 Authentication & Onboarding
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-01 | As a new user, I want to sign up so I can access the platform | Email/password or OAuth signup via Clerk; user record created in database |
| US-02 | As a new user, I want to join or create an organization onboarding | After signup, redirected to onboarding; can create or select existing org |
| US-03 | As a returning user, I want to sign in to my account | Clerk sign-in with redirect to org dashboard |

### 5.2 Organization Management
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-04 | As an admin, I want to switch between organizations | Organization switcher in header; Clerk-based org management |
| US-05 | As an admin, I want to invite members to my organization | Clerk membership API handles invitations |

### 5.3 Project Management
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-06 | As an admin, I want to create a new project | Form with name, key, description; only org admins can create |
| US-07 | As a member, I want to view all projects in my organization | Grid of project cards with name, description, "View Project" link |
| US-08 | As an admin, I want to delete a project | Confirmation prompt; cascade deletes related sprints/issues |
| US-09 | As a member, I want to navigate to a specific project | Clicking "View Project" opens project board page |

### 5.4 Sprint Management
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-10 | As an admin, I want to create a new sprint | Auto-generated name (KEY-N), configurable date range; stored with PLANNED status |
| US-11 | As an admin, I want to start a sprint | "Start Sprint" button appears when current date falls within sprint dates; status becomes ACTIVE |
| US-12 | As an admin, I want to end a sprint | "End Sprint" button on active sprints; status becomes COMPLETED; board becomes read-only |
| US-13 | As a member, I want to switch between sprints | Dropdown selector showing all sprints in the project |

### 5.5 Issue Management
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-14 | As a member, I want to create a new issue | Drawer form with title, assignee, description (Markdown), and priority |
| US-15 | As a member, I want to view issue details | Dialog/modal showing title, status, priority, description, assignee, reporter |
| US-16 | As a member, I want to update issue status and priority | Select dropdowns in detail dialog; updates reflected on board |
| US-17 | As a reporter or admin, I want to delete an issue | Delete button with confirmation; cascades correctly |
| US-18 | As a member, I want to drag issues between columns | Drag-and-drop on Kanban board; issue status updates server-side |
| US-19 | As a member, I want to reorder issues within a column | Drag-and-drop within same column; order value updates |

### 5.6 Filtering & Searching
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-20 | As a member, I want to search issues by title | Text input filters issues in real-time |
| US-21 | As a member, I want to filter by assignee | Clickable avatar chips toggle assignee filter |
| US-22 | As a member, I want to filter by priority | Dropdown selector for LOW/MEDIUM/HIGH/URGENT |
| US-23 | As a member, I want to clear all filters | "Clear Filters" button resets all active filters |

### 5.7 Personal Dashboard
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-24 | As a member, I want to see my assigned issues | "My Issues" section on org page with "Assigned to you" tab |
| US-25 | As a member, I want to see my reported issues | "My Issues" section with "Reported by you" tab |

---

## 6. Functional Requirements Summary

| # | Feature | Description |
|---|---------|-------------|
| FR-1 | User Authentication | Clerk-based sign-up, sign-in, session management |
| FR-2 | Organization Onboarding | Create/select organization post-signup |
| FR-3 | Multi-Organization Support | Switch between organizations; Clerk org memberships |
| FR-4 | Project CRUD | Create, read, delete projects (admin-only for create/delete) |
| FR-5 | Sprint Lifecycle | Create (PLANNED), Start (ACTIVE), End (COMPLETED) |
| FR-6 | Issue CRUD | Create, read, update, delete issues with validation |
| FR-7 | Kanban Board | Four-column drag-and-drop board (TODO, In Progress, In Review, Done) |
| FR-8 | Issue Prioritization | LOW, MEDIUM, HIGH, URGENT with color-coded badges |
| FR-9 | Issue Assignment | Assign to any org member via dropdown |
| FR-10 | Issue Description (Markdown) | Rich Markdown descriptions rendered in detail dialog |
| FR-11 | Board Filtering | Search, assignee filter, priority filter with clear |
| FR-12 | Personal Issue List | Assigned and reported issues on organization dashboard |
| FR-13 | Admin Role Checks | Only org admins can create/delete projects, start/end sprints |

---

## 7. Non-Functional Requirements

| # | Category | Requirement |
|---|----------|-------------|
| NFR-1 | Performance | Board should load sprint issues in <2s for up to 200 issues |
| NFR-2 | Usability | Fully responsive layout for desktop, tablet, and mobile |
| NFR-3 | Accessibility | WCAG 2.1 AA compliance for color contrast and keyboard navigation |
| NFR-4 | Security | Server-side authorization checks on all mutations |
| NFR-5 | Data Integrity | Cascade deletes (Project delete -> Sprint delete -> Issue delete) |
| NFR-6 | Availability | 99.9% uptime target (Vercel hosting) |
| NFR-7 | Theme | Dark mode default with light mode toggle support |

---

## 8. Success Metrics (KPIs)

| Metric | Target |
|--------|--------|
| User Sign-up Conversion Rate | >40% of visitors create an account |
| Organization Creation Rate | >80% of sign-ups create/join an org within 5 minutes |
| Project Creation per Org | >3 projects per organization in first week |
| Issue Creation per Sprint | >10 issues per sprint on average |
| Monthly Active Users (MAU) | 100 MAU at launch; 1,000 MAU at 6 months |
| Board Session Duration | >5 minutes average session on Kanban board |

---

## 9. Roadmap

### Phase 1 — MVP (Current State)
- Authentication via Clerk
- Organization onboarding and switching
- Project CRUD with admin permissions
- Sprint lifecycle (PLANNED → ACTIVE → COMPLETED)
- Kanban board with drag-and-drop
- Issue CRUD (title, description, assignee, priority, status)
- Board filters (search, assignee, priority)
- Personal dashboard (assigned/reported issues)

### Phase 2 — Core Enhancements
- [ ] Issue comments and activity timeline
- [ ] Sub-tasks and issue hierarchy
- [ ] Issue labels/tags
- [ ] Backlog view (unassigned issues)
- [ ] Sprint burndown chart
- [ ] User notifications (email + in-app)
- [ ] Bulk issue operations
- [ ] Light/dark theme toggle in UI

### Phase 3 — Advanced Features
- [ ] Project templates (pre-defined workflows)
- [ ] Time tracking per issue
- [ ] File attachments on issues
- [ ] API for third-party integrations
- [ ] GitHub/GitLab webhook integration
- [ ] Advanced reporting and analytics
- [ ] Team workload view
- [ ] SSO and SCIM for enterprise

### Phase 4 — Scale & Monetization
- [ ] Usage-based rate limiting (free/paid tiers)
- [ ] Team analytics dashboards
- [ ] Custom fields and workflows
- [ ] Audit logs
- [ ] Multi-region deployment
- [ ] Mobile app (React Native)

---

## 10. Dependencies

| Dependency | Purpose | Status |
|------------|---------|--------|
| **Clerk** | Authentication, organizations, sessions | Integrated |
| **Prisma ORM** | Database access layer | Integrated |
| **PostgreSQL (Neon)** | Relational database | Integrated |
| **Next.js 15** | Full-stack framework | Integrated |
| **Tailwind CSS + shadcn/ui** | UI component library | Integrated |
| **@hello-pangea/dnd** | Drag-and-drop for Kanban board | Integrated |
| **Zod** | Server/client-side validation | Integrated |
| **react-hook-form** | Form management | Integrated |

---

## 11. Open Questions

| # | Question | Owner |
|---|----------|-------|
| OQ-1 | Should we support personal workspaces (no organization)? | Product |
| OQ-2 | What is the maximum number of members per free organization? | Product |
| OQ-3 | Should non-admins be able to delete issues they created? | Product |
| OQ-4 | What data export formats are needed (CSV, JSON, PDF)? | Product |
| OQ-5 | Should we support guest observers in organizations? | Product |
