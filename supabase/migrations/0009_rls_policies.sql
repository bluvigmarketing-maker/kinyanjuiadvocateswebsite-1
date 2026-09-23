-- Single-admin model: any row in auth.users (created manually in the
-- Supabase dashboard) is a full admin. Public content is readable by anyone;
-- writes are restricted to authenticated users. Enquiries and bookings have
-- no public policy at all - they're only ever written by server code using
-- the service-role key (enquiries: the public API route; bookings: a future
-- sync job), which deliberately bypasses RLS since there is no user session
-- on a public form or webhook call.

-- firm_info: public read, authenticated write.
create policy "firm_info_public_read" on public.firm_info
  for select using (true);
create policy "firm_info_admin_write" on public.firm_info
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- content_blocks: public read, authenticated write.
create policy "content_blocks_public_read" on public.content_blocks
  for select using (true);
create policy "content_blocks_admin_write" on public.content_blocks
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- practice_areas: public can read published rows; admin can read/write everything.
create policy "practice_areas_public_read" on public.practice_areas
  for select using (is_published = true or auth.role() = 'authenticated');
create policy "practice_areas_admin_write" on public.practice_areas
  for insert with check (auth.role() = 'authenticated');
create policy "practice_areas_admin_update" on public.practice_areas
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "practice_areas_admin_delete" on public.practice_areas
  for delete using (auth.role() = 'authenticated');

-- team_members: same shape as practice_areas.
create policy "team_members_public_read" on public.team_members
  for select using (is_published = true or auth.role() = 'authenticated');
create policy "team_members_admin_write" on public.team_members
  for insert with check (auth.role() = 'authenticated');
create policy "team_members_admin_update" on public.team_members
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "team_members_admin_delete" on public.team_members
  for delete using (auth.role() = 'authenticated');

-- blog_posts: public can read published rows; admin can read/write everything.
create policy "blog_posts_public_read" on public.blog_posts
  for select using (status = 'published' or auth.role() = 'authenticated');
create policy "blog_posts_admin_write" on public.blog_posts
  for insert with check (auth.role() = 'authenticated');
create policy "blog_posts_admin_update" on public.blog_posts
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "blog_posts_admin_delete" on public.blog_posts
  for delete using (auth.role() = 'authenticated');

-- enquiries: no public policy. Authenticated (admin) can read and update
-- (mark read/archived). Inserts happen only via the service-role client in
-- app/api/enquiries/route.ts.
create policy "enquiries_admin_read" on public.enquiries
  for select using (auth.role() = 'authenticated');
create policy "enquiries_admin_update" on public.enquiries
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- bookings: no public policy. Authenticated (admin) can read only; writes
-- happen only via a service-role client (future sync job).
create policy "bookings_admin_read" on public.bookings
  for select using (auth.role() = 'authenticated');
