# Firebase – Intuere (jobs4) data structure

Project: **Jovloo**  
App: jobs4 (Intuere)  
Backend: Firebase (Firestore + Auth)

---

## Firestore collections

### jobs (top-level)

**Document ID:** job id (string)  
**Access:** read — public or authenticated; write — admin only

| Field | Type | Notes |
|-------|------|--------|
| title | string | |
| company | string | |
| location | string | |
| salary | string | |
| type | string | |
| description | string | |
| benefits | string[] | Array of strings |
| logoImage | string | URL |
| bgImage | string | URL |
| compatibilityScore | number | |
| experience | string | |
| schedule | string | |
| workType | string | |
| gradient | string[] | Array of 2 hex strings, e.g. `["#DC2626", "#D97706"]` |
| createdAt | Timestamp | Optional; for ordering/admin |
| updatedAt | Timestamp | Optional |

---

### users (top-level)

**Document ID:** Firebase Auth `uid`  
**Access:** user can read/write only their own document

| Field | Type | Notes |
|-------|------|--------|
| initials | string | |
| name | string | |
| tagline | string | |
| email | string | |
| location | string | |
| experience | string | |
| skills | string[] | Array of strings |
| createdAt | Timestamp | |
| updatedAt | Timestamp | |

---

### users/{uid}/savedJobs (subcollection)

**Document ID:** jobId (same as job id)  
**Access:** user can read/write only their own subcollection

| Field | Type | Notes |
|-------|------|--------|
| jobId | string | Same as document ID; useful for queries |
| savedAt | Timestamp | For ordering "saved" list |

---

### users/{uid}/chats (subcollection, phase 2)

**Document ID:** chat id (e.g. employer or conversation id)  
**Subcollection:** `messages`

**Chat document fields:**

| Field | Type | Notes |
|-------|------|--------|
| employerId | string | Or use employerName |
| employerName | string | |
| lastMessage | string | Preview text |
| lastMessageAt | Timestamp | |
| unreadCount | number | Optional |

**messages subcollection (per message):**

| Field | Type | Notes |
|-------|------|--------|
| sender | string | |
| text | string | |
| timestamp | Timestamp | |
| unread | boolean | Optional |

---

## Auth

- Firebase Auth: Anonymous or Email/Google.
- `uid` is used as user doc id and for paths: `users/{uid}/savedJobs`, `users/{uid}/chats`.

---

## App integration

- Config from env (`EXPO_PUBLIC_FIREBASE_*`); init in `src/lib/firebase.ts`.
- AuthProvider wraps app; SavedJobsContext uses Firestore for `users/{uid}/savedJobs`; jobs from Firestore or static until migration; profile from `users/{uid}`.

---

## Implementation phases (summary)

| Phase | What |
|-------|------|
| 1. Setup | Firebase JS SDK, `src/lib/firebase.ts`, Firestore rules |
| 2. Auth | AuthProvider, wrap app in App.tsx |
| 3. Saved jobs | Migrate SavedJobsContext from AsyncStorage to Firestore |
| 4. Jobs from Firestore | (Optional) useJobs(), seed jobs collection |
| 5. Profile from Firestore | useProfile(uid), create user doc on first login |
| 6. Chats | (Later) users/{uid}/chats + messages subcollection |

---

## Security note

Do not commit Firebase config with real keys. Use environment variables and load via `app.config.js` or `process.env`.
