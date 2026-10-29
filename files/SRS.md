# Software Requirements Specification (SRS) — JiraClone (iconScrum)

**Version:** 1.0
**Author:** Pawan Suthar
**Last Updated:** October 29, 2026
**Status:** Draft for Review

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed specification of the JiraClone (iconScrum) software system, including architecture, data models, APIs, functional and non-functional requirements, security considerations, and known issues. It serves as a reference for developers, testers, and stakeholders.

### 1.2 Scope
JiraClone is a web-based Agile project management application built with Next.js 15, Prisma ORM, PostgreSQL, and Clerk authentication. The system enables teams to:
- Create and manage organizations (workspaces)
- Create projects within organizations
- Plan and manage sprints
- Track issues on a Kanban-style board
- Filter and search issues
- View personal issue assignments

### 1.3 Definitions & Acronyms

| Term | Definition |
|------|------------|
| **Org/Admin** | Organization administrator with elevated permissions |
| **Sprint** | Time-boxed development iteration (PLANNED, ACTIVE, COMPLETED) |
| **Issue** | Work item (task, bug, story) within a project |
| **Kanban Board** | Visual task management interface with columns |
| **Clerk** | Third-party authentication provider |
| **Prisma** | TypeScript ORM for database operations |
| **Next.js 15** | React framework with App Router and Server Components |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Next.js 15 App (React 19, Server Components)       │    │
│  │  - Tailwind CSS + shadcn/ui components             │    │
│  │  - @hello-pangea/dnd (drag-and-drop)               │    │
│  │  - react-hook-form + Zod validation                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Next.js Server Actions (actions/*.js)              │    │
│  │  - issues.js (createIssue, updateIssue, etc.)       │    │
│  │  - projects.js (createProject, getProject, etc.)    │    │
│  │  - sprints.js (createSprint, updateSprintStatus)    │    │
│  │  - organizations.js (getOrganization, getUsers)     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Middleware Layer                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Clerk Middleware (middleware.js)                   │    │
│  │  - Route protection                                 │    │
│  │  - Auth state redirection                           │    │
│  │  - Organization context                             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Prisma ORM (lib/prisma.js)                         │    │
│  │  - schema.prisma (User, Project, Sprint, Issue)     │    │
│  │  - Migrations managed via Prisma Migrate            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Neon PostgreSQL (Serverless)                       │    │
│  │  - Managed, connection-pooled                       │    │
│  │  - SSL required                                     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | Next.js (App Router) | 15.0.2 |
| **UI Framework** | React | 19.0.0-rc |
| **Styling** | Tailwind CSS | 3.4.1 |
| **UI Components** | shadcn/ui (Radix UI primitives) | Latest |
| **Drag-and-Drop** | @hello-pangea/dnd | 17.0.0 |
| **Forms** | react-hook-form | 7.53.1 |
| **Validation** | Zod | 3.23.8 |
| **Markdown** | @uiw/react-md-editor | 4.0.4 |
| **Auth** | Clerk (Next.js SDK) | 5.7.1 |
| **Theme** | next-themes | 0.4.3 |
| **ORM** | Prisma | 5.22.0 |
| **Database** | PostgreSQL (Neon) | Latest |
| **Deployment** | Vercel | Latest |

---

## 3. Data Model

### 3.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐
│     User     │       │   Project    │
├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │
│ clerkUserId  │       │ name         │
│ email        │       │ key          │
│ name         │       │ description  │
│ imageUrl     │       │ organizationId│
│ CreatedAt    │       │ CreatedAt    │
│ UpdatedAt    │       │ UpdatedAt    │
└──────────────┘       └──────────────┘
       │                       │
       │  ┌──────────────┐     │
       │  │    Sprint    │     │
       │  ├──────────────┤     │
       │  │ id (PK)      │     │
       │  │ name (UNIQUE)│     │
       │  │ startDate    │     │
       │  │ endDate      │     │
       │  │ status       │     │
       │  │ projectId (FK)─────┤
       │  │ CreatedAt    │     │
       │  │ UpdatedAt    │     │
       │  └──────────────┘     │
       │              │        │
       ▼              ▼        ▼
┌──────────────────────────────────┐
│            Issue                 │
├──────────────────────────────────┤
│ id (PK)                          │
│ title                            │
│ description                      │
│ status (TODO/IN_PROGRESS/...)    │
│ order                            │
│ priority (LOW/MEDIUM/HIGH/...)   │
│ assigneeId (FK → User.id)        │
│ reporterId (FK → User.id)        │
│ projectId (FK → Project.id)      │
│ sprintId (FK → Sprint.id)        │
│ CreatedAt                        │
│ UpdatedAt                        │
└──────────────────────────────────┘
```

### 3.2 Schema Definition (Prisma)

```prisma
model User {
  id             String     @id @default(cuid())
  clerkUserId    String     @unique
  email          String     @unique
  name           String?
  imageUrl       String?
  createdIssues  Issue[]    @relation("Reporter")
  assignedIssues Issue[]    @relation("Assignee")
  CreatedAt      DateTime   @default(now())
  UpdatedAt      DateTime   @updatedAt
}

model Project {
  id             String     @id @default(cuid())
  name           String
  key            String
  description    String?
  organizationId String
  sprints        Sprint[]
  issues         Issue[]
  CreatedAt      DateTime   @default(now())
  UpdatedAt      DateTime   @updatedAt

  @@unique([organizationId, key])
}

model Sprint {
  id        String        @id @default(cuid())
  name      String        @unique  // ⚠️ BUG: Should be scoped to project
  startDate DateTime
  endDate   DateTime
  status    SprintStatus  @default(PLANNED)
  project   Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  issues    Issue[]
  CreatedAt DateTime      @default(now())
  UpdatedAt DateTime      @updatedAt
}

enum SprintStatus {
  PLANNED
  ACTIVE
  COMPLETED
}

model Issue {
  id         String         @id @default(cuid())
  title      String
  description String?
  status     IssueStatus
  order      Int
  priority   IssuePriority
  assignee   User?          @relation("Assignee", fields: [assigneeId], references: [id])
  assigneeId String?
  reporter   User           @relation("Reporter", fields: [reporterId], references: [id])
  reporterId String
  project    Project        @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId  String
  sprint     Sprint?        @relation(fields: [sprintId], references: [id], onDelete: SetNull)
  sprintId   String?
  CreatedAt  DateTime       @default(now())
  UpdatedAt  DateTime       @updatedAt

  @@index([status, order])
}

enum IssueStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
}

enum IssuePriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

### 3.3 Database Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| Issue | `Issue_status_order_idx` | status, order | Optimize Kanban column queries |
| User | `User_clerkUserId_key` | clerkUserId | Unique lookup by Clerk ID |
| User | `User_email_key` | email | Unique email constraint |
| Project | `Project_organizationId_key_key` | organizationId, key | Unique project key per org |
| Sprint | `Sprint_name_key` | name | ⚠️ Global unique (BUG) |

### 3.4 Missing Indexes (Performance Gaps)

| Table | Missing Index | Impact |
|-------|---------------|--------|
| Issue | sprintId | Slow sprint board loads |
| Issue | projectId | Slow project-level queries |
| Issue | reporterId | Slow "reported by me" queries |
| Issue | assigneeId | Slow "assigned to me" queries |
| Sprint | projectId | Slow project sprint list |

---

## 4. API Specification

### 4.1 Server Actions Overview

All API operations are implemented as Next.js Server Actions in the `actions/` directory. Server actions are invoked from client components using `useFetch` hook or called directly from server components.

### 4.2 Authentication Middleware

**File:** `middleware.js`

```javascript
// Protected routes
const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organization(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

// Middleware logic:
// 1. Redirect unauthenticated users to /sign-in on protected routes
// 2. Redirect authenticated users from /sign-in to /onboarding
// 3. Redirect users without org context to /onboarding
```

### 4.3 User Sync

**File:** `lib/checkuser.js`

```javascript
export const CheckUser = async () => {
  const user = await currentUser(); // Clerk
  
  // Find or create local User record
  const loginuser = await db?.user.findUnique({
    where: { clerkUserId: user.id },
  });
  
  if (loginuser) return loginuser;
  
  // Create new user
  const newuser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  
  return newuser;
};
```

---

### 4.4 Organization Actions

#### 4.4.1 getOrganization

**File:** `actions/organizations.js`

```javascript
export async function getOrganization(slug)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| slug | string | Yes | Organization slug from URL |

**Returns:** Organization object from Clerk API

**Authorization:**
- User must be authenticated
- User must be a member of the organization

**Logic:**
1. Get current user's Clerk ID
2. Lookup local User record
3. Fetch organization from Clerk by slug
4. Verify user membership in organization
5. Return organization or null

---

#### 4.4.2 getOrganizationUsers

**File:** `actions/organizations.js`

```javascript
export async function getOrganizationUsers(orgId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orgId | string | Yes | Organization ID |

**Returns:** Array of User objects (local DB) who are members of the organization

**Authorization:**
- User must be authenticated

**⚠️ BUG:** Clerk membership API returns max 10 members by default (no pagination)

**Logic:**
1. Get current user's Clerk ID
2. Fetch organization membership list from Clerk
3. Extract all member userIds
4. Query local User table for matching clerkUserIds
5. Return user array

---

### 4.5 Project Actions

#### 4.5.1 createProject

**File:** `actions/projects.js`

```javascript
export async function createProject(data)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| data.name | string | Yes | Project name (1-50 chars) |
| data.key | string | Yes | Project key (2-10 chars, e.g., "RHCY") |
| data.description | string | No | Project description (max 500 chars) |

**Returns:** Created Project object

**Authorization:**
- User must be authenticated
- User must have `org:admin` role in selected organization

**Validation:**
- Zod schema: `projectSchema`

**Logic:**
1. Verify auth and org context
2. Check user has admin role via Clerk membership
3. Create project in database
4. Return project

---

#### 4.5.2 getProjects

**File:** `actions/projects.js`

```javascript
export async function getProjects(orgId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orgId | string | Yes | Organization ID |

**Returns:** Array of Project objects

**Authorization:**
- User must be authenticated

**⚠️ BUG:** Does NOT verify user is member of orgId (any authenticated user can view any org's projects)

**Logic:**
1. Get current user's Clerk ID
2. Lookup local User record
3. Query all projects for orgId
4. Return project array

---

#### 4.5.3 getProject

**File:** `actions/projects.js`

```javascript
export async function getProject(projectId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project ID |

**Returns:** Project object with sprints array, or null

**Authorization:**
- User must be authenticated
- User must have org context matching project's organizationId

**Logic:**
1. Verify auth and org context
2. Lookup local User record
3. Query project by ID with sprints included
4. Verify project.organizationId === orgId
5. Return project or null

---

#### 4.5.4 deleteProject

**File:** `actions/projects.js`

```javascript
export async function deleteProject(projectId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project ID |

**Returns:** `{ success: true }`

**Authorization:**
- User must have `org:admin` role

**Logic:**
1. Verify auth and org context
2. Check user has admin role
3. Verify project exists and belongs to org
4. Delete project (cascade deletes sprints and issues)
5. Return success

---

### 4.6 Sprint Actions

#### 4.6.1 createSprint

**File:** `actions/sprints.js`

```javascript
export async function createSprint(projectId, data)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project ID |
| data.name | string | Yes | Sprint name (auto-generated: KEY-N) |
| data.startDate | Date | Yes | Sprint start date |
| data.endDate | Date | Yes | Sprint end date |

**Returns:** Created Sprint object

**Authorization:**
- User must be authenticated
- Project must belong to user's organization

**Validation:**
- Zod schema: `sprintSchema`

**Logic:**
1. Verify auth and org context
2. Verify project exists and belongs to org
3. Create sprint with status "PLANNED"
4. Return sprint

---

#### 4.6.2 updateSprintStatus

**File:** `actions/sprints.js`

```javascript
export async function updateSprintStatus(sprintId, newStatus)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| sprintId | string | Yes | Sprint ID |
| newStatus | "PLANNED" \| "ACTIVE" \| "COMPLETED" | Yes | New sprint status |

**Returns:** `{ success: true, sprint: Sprint }`

**Authorization:**
- User must be authenticated
- User must have `org:admin` role

**⚠️ BUG:** No check preventing multiple ACTIVE sprints in same project

**Validation Rules:**
- `ACTIVE`: Current date must be within sprint start/end dates
- `COMPLETED`: Sprint must currently be `ACTIVE`

**Logic:**
1. Verify auth and org context
2. Check admin role
3. Fetch sprint with project relation
4. Validate status transition rules
5. Update sprint status
6. Return success with sprint

---

### 4.7 Issue Actions

#### 4.7.1 createIssue

**File:** `actions/issues.js`

```javascript
export async function createIssue(projectId, data)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project ID |
| data.title | string | Yes | Issue title |
| data.description | string | No | Markdown description |
| data.status | IssueStatus | Yes | Initial status (TODO, etc.) |
| data.priority | IssuePriority | Yes | Priority level |
| data.assigneeId | string | No | Assignee user ID |
| data.sprintId | string | No | Sprint ID |

**Returns:** Created Issue with reporter and assignee relations

**Authorization:**
- User must be authenticated
- User must exist in local database

**⚠️ BUG:** If user doesn't exist in local DB, `user.id` throws TypeError

**Logic:**
1. Verify auth and org context
2. Lookup local User record
3. Calculate next `order` value for status column
4. Create issue with auto-calculated order
5. Return issue with relations

---

#### 4.7.2 getIssuesForSprint

**File:** `actions/issues.js`

```javascript
export async function getIssuesForSprint(sprintId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| sprintId | string | Yes | Sprint ID |

**Returns:** Array of Issue objects with reporter and assignee relations, ordered by status then order

**Authorization:**
- User must be authenticated

**Logic:**
1. Verify auth and org context
2. Query issues by sprintId
3. Order by status ASC, order ASC
4. Include reporter and assignee
5. Return issues array

---

#### 4.7.3 updateIssueOrder

**File:** `actions/issues.js`

```javascript
export async function updateIssueOrder(updateIssues)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| updateIssues | Array<{ id, order, status }> | Yes | Issues with new order and status |

**Returns:** `{ success: true }`

**Authorization:**
- User must be authenticated

**Logic:**
1. Verify auth and org context
2. Run Prisma transaction
3. For each issue, update order and status
4. Return success

---

#### 4.7.4 deleteIssue

**File:** `actions/issues.js`

```javascript
export async function deleteIssue(issueId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| issueId | string | Yes | Issue ID |

**Returns:** `{ success: true }`

**Authorization:**
- User must be authenticated
- User must be the reporter OR project admin

**⚠️ BUG:** `issue.project.adminIds` is undefined (field doesn't exist in schema)
**⚠️ BUG:** Uses `.include()` instead of `.includes()` (TypeError)
**⚠️ BUG:** Logic is inverted (throws if user IS admin)

**Logic:**
1. Verify auth and org context
2. Lookup local User record
3. Fetch issue with project relation
4. Check if user is reporter or admin
5. Delete issue
6. Return success

---

#### 4.7.5 updateIssue

**File:** `actions/issues.js`

```javascript
export async function updateIssue(issueId, data)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| issueId | string | Yes | Issue ID |
| data.status | IssueStatus | No | New status |
| data.priority | IssuePriority | No | New priority |

**Returns:** Updated Issue with reporter and assignee relations

**Authorization:**
- User must be authenticated
- Issue must belong to user's organization

**Logic:**
1. Verify auth and org context
2. Fetch issue with project relation
3. Verify org match
4. Update issue with provided fields
5. Return updated issue

---

#### 4.7.6 getUsersIssues

**File:** `actions/issues.js`

```javascript
export async function getUsersIssues(userId)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | Clerk user ID |

**Returns:** Array of issues where user is reporter OR assignee, with project, reporter, assignee relations

**Authorization:**
- User must be authenticated
- User must have org context

**Logic:**
1. Get org context
2. Lookup local User record
3. Query issues where reporterId OR assigneeId matches
4. Filter by orgId via project relation
5. Include project, reporter, assignee
6. Order by UpdatedAt DESC
7. Return issues array

---

## 5. Frontend Components

### 5.1 Page Structure

```
app/
├── (auth)/                    # Auth routes (public)
│   ├── sign-in/[[...sign-in]]/page.jsx
│   └── sign-up/[[...sign-up]]/page.jsx
├── (main)/                    # Protected routes
│   ├── layout.js              # Container layout
│   ├── onboarding/[[...onboarding]]/page.jsx
│   ├── organization/[orgid]/page.jsx
│   │   └── _components/
│   │       └── user-issues.jsx
│   └── project/
│       ├── create/page.jsx
│       └── [projectId]/
│           ├── layout.js
│           ├── page.jsx
│           └── _components/
│               ├── BoardFilters.jsx
│               ├── create-issue.jsx
│               ├── DeleteProject.jsx
│               ├── IssueCard.jsx
│               ├── issuedetailsDilaog.jsx
│               ├── ProjectsList.jsx
│               ├── SprintBoard.jsx
│               ├── SprintCreationForm.jsx
│               └── SprintManager.jsx
├── layout.js                  # Root layout + Clerk provider
└── page.js                    # Landing page
```

### 5.2 Key Components

#### 5.2.1 SprintBoard

**File:** `app/(main)/project/_components/SprintBoard.jsx`

**Props:**
- sprints: Sprint[]
- projectId: string
- orgId: string

**State:**
- currSprint: Sprint
- isdraweropen: boolean
- selectedstatus: string | null
- issues: Issue[]
- filteredissue: Issue[]

**⚠️ BUGS:**
1. `onUpdate` handler in IssueCard callback doesn't return mapped array (line 183-188)
2. Uses `Router` from lucide-react instead of `useRouter()` (imported but not used correctly)

**Features:**
- DragDropContext for Kanban board
- Column-based droppable zones
- IssueCard rendering
- BoardFilters integration
- IssueCreateDrawer integration

---

#### 5.2.2 SprintManager

**File:** `app/(main)/project/_components/SprintManager.jsx`

**Props:**
- sprint: Sprint
- sprints: Sprint[]
- setSprint: function
- projectId: string

**⚠️ BUGS:**
1. Line 71: `Router.replace()` uses wrong import (lucide icon instead of next/router)

**Features:**
- Sprint selector dropdown
- Start Sprint button (when current date within sprint dates)
- End Sprint button (when sprint is ACTIVE)
- Sprint status badge (overdue, starts in, ended)

---

#### 5.2.3 IssueCard

**File:** `app/(main)/project/_components/IssueCard.jsx`

**Props:**
- issue: Issue
- showstatus: boolean (default: false)
- onDelete: function
- onUpdate: function

**⚠️ BUGS:**
1. Lines 36, 41: Uses `window.location.reload()` (anti-pattern)

**Features:**
- Color-coded priority border
- Status and priority badges
- Assignee avatar
- Created timestamp
- Click to open detail dialog

---

#### 5.2.4 IssueCreateDrawer

**File:** `app/(main)/project/_components/create-issue.jsx`

**Props:**
- isopen: boolean
- onclose: function
- sprintId: string
- status: IssueStatus
- projectId: string
- onIssueCreated: function
- orgId: string

**Features:**
- react-hook-form with Zod validation
- Assignee dropdown (org users)
- Markdown editor for description
- Priority selection

---

#### 5.2.5 IssueDetailsDialog

**File:** `app/(main)/project/_components/issuedetailsDilaog.jsx`

**Props:**
- issue: Issue
- isOpen: boolean
- onClose: function
- onUpdate: function
- onDelete: function
- bordercol: string

**⚠️ BUGS:**
1. Lines 44, 49: Uses `window.location.reload()` (anti-pattern)

**Features:**
- Status and priority dropdowns
- Markdown description viewer
- Assignee and reporter display
- Delete button (reporter/admin only)
- "View in project" link (when opened from org page)

---

#### 5.2.6 BoardFilters

**File:** `app/(main)/project/_components/BoardFilters.jsx`

**Props:**
- issues: Issue[]
- onFilterChange: function

**Features:**
- Search by title
- Assignee filter (clickable avatars)
- Priority dropdown filter
- Clear filters button

---

#### 5.2.7 ProjectsList

**File:** `app/(main)/project/_components/ProjectsList.jsx`

**Props:**
- orgId: string

**Features:**
- Grid of project cards
- DeleteProject button (admin only)
- "View Project" link
- "Create New" link if empty

---

#### 5.2.8 UsersIssues

**File:** `app/(main)/organization/[orgid]/_components/user-issues.jsx`

**Props:**
- userId: string (Clerk ID)

**⚠️ BUGS:**
1. Line 10: `issues.legth` typo (should be `length`)

**Features:**
- Tabs: "Assigned to you" / "Reported by you"
- Issue grid with IssueCard components

---

### 5.3 Hooks

#### 5.3.1 useFetch

**File:** `hooks/use-fetch.js`

```javascript
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fn, setData };
};
```

**Usage:** Wraps server actions for client-side invocation with loading state and toast error handling.

---

## 6. Security Requirements

### 6.1 Authentication

| Requirement | Implementation |
|-------------|----------------|
| User authentication | Clerk Next.js SDK |
| Session management | Clerk cookies + middleware |
| Protected routes | `clerkMiddleware` with route matchers |
| User sync | `CheckUser()` function on every page load |

### 6.2 Authorization

| Resource | Create | Read | Update | Delete |
|----------|--------|------|--------|--------|
| Project | org:admin only | Org members | org:admin | org:admin |
| Sprint | org:admin | Org members | org:admin | Cascade (project delete) |
| Issue | Org members | Org members | Reporter or assignee | Reporter or org:admin |

### 6.3 ⚠️ Security Vulnerabilities

| ID | Vulnerability | Severity | Location | Fix Required |
|----|---------------|----------|----------|--------------|
| SEC-01 | Missing org membership check on `getProjects` | HIGH | `actions/projects.js:46-73` | Verify user is member of orgId before returning projects |
| SEC-02 | Hardcoded secrets in `.env` file | CRITICAL | `.env` | Remove from repo; use environment variable injection |
| SEC-03 | TypeError in `deleteIssue` allows bypass | MEDIUM | `actions/issues.js:129` | Fix `.include()` to `.includes()` and add proper admin check |
| SEC-04 | User not found check missing in `createIssue` | MEDIUM | `actions/issues.js:13-18` | Add error handling if user doesn't exist in local DB |
| SEC-05 | Clerk membership pagination (10 member limit) | LOW | `actions/organizations.js:69-70` | Add pagination or limit parameter |

---

## 7. Known Bugs & Issues

### 7.1 Critical Bugs

| ID | Bug | Location | Impact | Fix |
|----|-----|----------|--------|-----|
| BUG-01 | `Router.replace()` uses wrong import | `SprintManager.jsx:71` | Sprint selector dropdown crashes | Import `useRouter` from `next/navigation` and use `router.replace()` |
| BUG-02 | `deleteIssue` throws TypeError | `actions/issues.js:129` | Cannot delete issues; crashes on delete attempt | Fix `issue.project.adminIds.include` → check admin role via Clerk API |
| BUG-03 | `setissues` callback doesn't return | `SprintBoard.jsx:183-188` | Issue updates don't reflect on board | Return mapped array from callback |
| BUG-04 | `issues.legth` typo | `UsersIssues.jsx:10` | Empty state doesn't render correctly | Fix typo to `length` |
| BUG-05 | Sprint name globally unique | `schema.prisma:44` | Cannot create same sprint name in different projects | Change to `@@unique([projectId, name])` |
| BUG-06 | Multiple ACTIVE sprints allowed | `actions/sprints.js` | Data integrity issue | Add check for existing ACTIVE sprint before starting new one |
| BUG-07 | `window.location.reload()` anti-pattern | Multiple components | Breaks SPA navigation; loses state | Replace with React state updates + router.refresh() |
| BUG-08 | `Userloading.jsx` syntax anomaly | `components/user-loading.jsx:13` | Potential runtime warning | Remove `else <></>;` or wrap properly |
| BUG-09 | Missing org membership check | `getProjects()` | Security vulnerability | Add org membership verification |
| BUG-10 | User not found in `createIssue` | `actions/issues.js:13-18` | TypeError if user not in local DB | Add user existence check and create if missing |

### 7.2 UX Issues

| ID | Issue | Impact |
|----|-------|--------|
| UX-01 | No backlog view | Cannot manage unassigned issues |
| UX-02 | No comments on issues | Limited collaboration |
| UX-03 | No theme toggle in UI | Dark mode forced (no light mode option) |
| UX-04 | No issue attachments | Cannot share files |
| UX-05 | No activity history | Cannot track issue changes |
| UX-06 | Hard page reloads on every update | Jarring UX; loses scroll position |
| UX-07 | No sprint date validation on create | Can create sprints with past dates |

### 7.3 Performance Issues

| ID | Issue | Impact |
|----|-------|--------|
| PERF-01 | Missing DB indexes on Issue table | Slow queries as data grows |
| PERF-02 | No pagination on organization users | Slow load for large orgs |
| PERF-03 | Full board reload on issue create | Unnecessary network traffic |
| PERF-04 | No caching of Clerk membership calls | Repeated API calls |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Metric | Target |
|--------|--------|
| Page load time (LCP) | <2.5s |
| Time to interactive (TTI) | <3.5s |
| Sprint board render time | <500ms for 100 issues |
| API response time (p95) | <500ms |
| Database query time | <100ms per query |

### 8.2 Scalability

| Component | Current | Target |
|-----------|---------|--------|
| Max users per org | Unlimited (Clerk) | 50 free, 500 paid |
| Max projects per org | Unlimited | 10 free, 100 paid |
| Max issues per sprint | Unlimited | 200 recommended |
| Max sprints per project | Unlimited | 50 recommended |

### 8.3 Reliability

| Metric | Target |
|--------|--------|
| Uptime | 99.9% |
| Data durability | 99.999% (PostgreSQL) |
| Backup frequency | Daily (Neon) |
| RTO (Recovery Time Objective) | 4 hours |
| RPO (Recovery Point Objective) | 24 hours |

### 8.4 Accessibility

| Requirement | Status |
|-------------|--------|
| WCAG 2.1 AA color contrast | Partial (dark theme only) |
| Keyboard navigation | Supported (Radix UI) |
| Screen reader compatibility | Not tested |
| Focus indicators | Supported (Radix UI) |

---

## 9. Deployment & DevOps

### 9.1 Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Database
DATABASE_URL="postgresql://..."
```

### 9.2 Build Commands

```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:studio": "npx prisma studio",
  "prisma:migrate": "npx prisma migrate dev",
  "prisma:generate": "npx prisma generate",
  "prisma:db:push": "npx prisma db push"
}
```

### 9.3 Deployment Checklist

- [ ] Generate Prisma Client (`prisma generate`)
- [ ] Run database migrations (`prisma migrate deploy`)
- [ ] Set environment variables on Vercel
- [ ] Configure Clerk webhook URLs
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up custom domain (optional)

---

## 10. Testing Strategy

### 10.1 Current State

**No automated tests exist.** The codebase relies on manual testing.

### 10.2 Recommended Test Coverage

| Test Type | Tool | Target Coverage |
|-----------|------|-----------------|
| Unit Tests | Jest + React Testing Library | 80% of components |
| Integration Tests | Playwright | All server actions |
| E2E Tests | Playwright | Critical user journeys |
| API Tests | Jest + Prisma mock | All server actions |

### 10.3 Critical Test Scenarios

1. User signup → onboarding → create org → create project
2. Create sprint → start sprint → create issue → drag issue → end sprint
3. Delete project (verify cascade)
4. Admin vs non-admin permissions
5. Sprint date validation
6. Issue assignment and filtering

---

## 11. Future Enhancements

### 11.1 Phase 2 Features

| Feature | Priority | Effort |
|---------|----------|--------|
| Issue comments | High | Medium |
| Issue activity timeline | High | Medium |
| Backlog view | High | Low |
| Sub-tasks | Medium | High |
| Issue labels/tags | Medium | Low |
| Sprint burndown chart | Medium | Medium |
| Email notifications | Low | High |
| Light/dark theme toggle | High | Low |

### 11.2 Phase 3 Features

| Feature | Priority | Effort |
|---------|----------|--------|
| GitHub integration | Medium | High |
| Time tracking | Low | Medium |
| File attachments | Medium | Medium |
| Advanced reporting | Low | High |
| Team workload view | Low | High |
| Custom workflows | Low | High |
| API for integrations | Medium | High |

---

## 12. Appendix

### 12.1 File Structure

```
jiraclone/
├── actions/
│   ├── issues.js
│   ├── organizations.js
│   ├── projects.js
│   └── sprints.js
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.jsx
│   │   └── sign-up/[[...sign-up]]/page.jsx
│   ├── (main)/
│   │   ├── layout.js
│   │   ├── onboarding/[[...onboarding]]/page.jsx
│   │   ├── organization/[orgid]/page.jsx
│   │   │   └── _components/user-issues.jsx
│   │   └── project/
│   │       ├── create/page.jsx
│   │       └── [projectId]/
│   │           ├── layout.js
│   │           ├── page.jsx
│   │           └── _components/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── ui/
│   ├── Companycarousel.jsx
│   ├── Header.jsx
│   ├── iuser-avatar.jsx
│   ├── OrgSwitcher.jsx
│   ├── theme-provider.jsx
│   ├── User-menu.jsx
│   └── user-loading.jsx
├── data/
│   ├── companies.json
│   ├── faqs.json
│   └── status.json
├── hooks/
│   └── use-fetch.js
├── lib/
│   ├── checkuser.js
│   ├── prisma.js
│   ├── utils.js
│   └── validators.js
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
├── .env
├── .eslintrc.json
├── .gitignore
├── components.json
├── jsconfig.json
├── middleware.js
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tailwind.config.js
```

### 12.2 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-29 | Initial SRS document |

---

## 13. Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | Pawan Suthar | TBD | - |
| Lead Developer | TBD | TBD | - |
| QA Lead | TBD | TBD | - |
