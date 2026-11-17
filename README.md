# FlowBoard — React foundation (v0.1)

A first React + TypeScript build for the public FlowBoard product.

## Included
- React, TypeScript and Vite
- Responsive dashboard and five-column Kanban board
- Task create/edit/delete, priorities and due dates
- Drag-and-drop between statuses
- Search and priority filtering
- Supabase email/password authentication wiring
- PostgreSQL starter schema for workspaces, members, projects and tasks
- Row Level Security starter policies
- Demo mode with sample tasks when Supabase is not configured

## Run locally
Install Node.js LTS, then:
```bash
npm install
npm run dev
```

## Connect Supabase
1. Create a project at https://supabase.com.
2. Copy the Project URL and anon/public key from Project Settings → API.
3. Copy `.env.example` to `.env` and fill in the two values.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. Restart the dev server.

Never expose a Supabase service-role key in frontend code. The anon key is intended for browser use only with correctly configured RLS.

## Important: not production-ready yet
This is the first frontend foundation, not a completed SaaS. The cloud task form still needs to be wired to the automatically created workspace ID and `created_by`; the starter schema has required fields for those. Do not invite real users or launch publicly until that data flow is completed and cross-account access has been tested.

Next milestones: workspace-aware data access; projects CRUD; team invitations and role permissions; comments and file uploads; realtime updates; notifications and reports; password recovery; accessibility/security tests; private beta; production launch.
