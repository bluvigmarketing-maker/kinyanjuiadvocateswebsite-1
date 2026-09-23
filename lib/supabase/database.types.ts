/**
 * Hand-written types mirroring supabase/migrations/*.sql. Once the real
 * Supabase project exists, these can be replaced with generated types via
 * `npx supabase gen types typescript --project-id <ref> > lib/supabase/database.types.ts`
 * - the shape below is written to match exactly so that swap is a no-op for
 * every call site.
 */

export type EnquiryStatus = "new" | "read" | "archived";
export type PostStatus = "draft" | "published";
export type BookingStatus = "active" | "canceled";

export interface Database {
  public: {
    Tables: {
      firm_info: {
        Row: {
          id: number;
          name: string;
          short_name: string;
          tagline: string;
          founded_year: number;
          address_line1: string;
          address_line2: string;
          phone: string;
          emails: string[];
          office_hours: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["firm_info"]["Row"]> & {
          id?: number;
        };
        Update: Partial<Database["public"]["Tables"]["firm_info"]["Row"]>;
      };
      content_blocks: {
        Row: {
          id: string;
          page: string;
          section_key: string;
          content: unknown;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<
          Database["public"]["Tables"]["content_blocks"]["Row"]
        > & {
          page: string;
          section_key: string;
          content: unknown;
        };
        Update: Partial<Database["public"]["Tables"]["content_blocks"]["Row"]>;
      };
      practice_areas: {
        Row: {
          id: string;
          slug: string;
          order_index: number;
          title: string;
          icon_name: string;
          summary: string;
          intro: string;
          items: string[];
          closing: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<
          Database["public"]["Tables"]["practice_areas"]["Row"]
        > & {
          slug: string;
          title: string;
          icon_name: string;
          summary: string;
          intro: string;
        };
        Update: Partial<Database["public"]["Tables"]["practice_areas"]["Row"]>;
      };
      team_members: {
        Row: {
          id: string;
          slug: string;
          order_index: number;
          name: string;
          role: string;
          bio: string[];
          tags: string[];
          photo_url: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["team_members"]["Row"]> & {
          slug: string;
          name: string;
          role: string;
        };
        Update: Partial<Database["public"]["Tables"]["team_members"]["Row"]>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          status: EnquiryStatus;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["enquiries"]["Row"]> & {
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Row"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content_json: unknown;
          cover_image_url: string | null;
          tags: string[];
          status: PostStatus;
          published_at: string | null;
          meta_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          canonical_url: string | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
          content_json: unknown;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
      };
      bookings: {
        Row: {
          id: string;
          calendly_event_uri: string;
          invitee_name: string;
          invitee_email: string;
          event_type_name: string | null;
          start_time: string;
          end_time: string | null;
          status: BookingStatus;
          source: string;
          raw_payload: unknown;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["bookings"]["Row"]> & {
          calendly_event_uri: string;
          invitee_name: string;
          invitee_email: string;
          start_time: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Row"]>;
      };
    };
  };
}
