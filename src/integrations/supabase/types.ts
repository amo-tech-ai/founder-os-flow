export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accelerator_applications: {
        Row: {
          accelerator_id: string | null
          accelerator_name: string
          ai_application_tips: string | null
          ai_fit_reasoning: string | null
          ai_fit_score: number | null
          application_draft: Json | null
          application_final: Json | null
          cohort: string | null
          created_at: string | null
          deadline: string | null
          decision_date: string | null
          id: string
          interview_date: string | null
          notes: string | null
          startup_id: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accelerator_id?: string | null
          accelerator_name: string
          ai_application_tips?: string | null
          ai_fit_reasoning?: string | null
          ai_fit_score?: number | null
          application_draft?: Json | null
          application_final?: Json | null
          cohort?: string | null
          created_at?: string | null
          deadline?: string | null
          decision_date?: string | null
          id?: string
          interview_date?: string | null
          notes?: string | null
          startup_id: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accelerator_id?: string | null
          accelerator_name?: string
          ai_application_tips?: string | null
          ai_fit_reasoning?: string | null
          ai_fit_score?: number | null
          application_draft?: Json | null
          application_final?: Json | null
          cohort?: string | null
          created_at?: string | null
          deadline?: string | null
          decision_date?: string | null
          id?: string
          interview_date?: string | null
          notes?: string | null
          startup_id?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accelerator_applications_accelerator_id_fkey"
            columns: ["accelerator_id"]
            isOneToOne: false
            referencedRelation: "accelerators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accelerator_applications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accelerator_applications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "accelerator_applications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      accelerators: {
        Row: {
          acceptance_rate: number | null
          application_url: string | null
          benefits: string[] | null
          cloud_credits: Json | null
          cohort_size: number | null
          created_at: string | null
          equity_percentage: number | null
          funding_amount: number | null
          funding_type: string | null
          id: string
          industry_focus: string[] | null
          is_active: boolean | null
          last_verified_at: string | null
          location: string | null
          mentors_available: boolean | null
          name: string
          next_deadline: string | null
          notable_alumni: string[] | null
          office_space: boolean | null
          program_duration: string | null
          stage_focus: string[] | null
          success_rate: number | null
          total_alumni_funding: number | null
          type: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          application_url?: string | null
          benefits?: string[] | null
          cloud_credits?: Json | null
          cohort_size?: number | null
          created_at?: string | null
          equity_percentage?: number | null
          funding_amount?: number | null
          funding_type?: string | null
          id?: string
          industry_focus?: string[] | null
          is_active?: boolean | null
          last_verified_at?: string | null
          location?: string | null
          mentors_available?: boolean | null
          name: string
          next_deadline?: string | null
          notable_alumni?: string[] | null
          office_space?: boolean | null
          program_duration?: string | null
          stage_focus?: string[] | null
          success_rate?: number | null
          total_alumni_funding?: number | null
          type: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          application_url?: string | null
          benefits?: string[] | null
          cloud_credits?: Json | null
          cohort_size?: number | null
          created_at?: string | null
          equity_percentage?: number | null
          funding_amount?: number | null
          funding_type?: string | null
          id?: string
          industry_focus?: string[] | null
          is_active?: boolean | null
          last_verified_at?: string | null
          location?: string | null
          mentors_available?: boolean | null
          name?: string
          next_deadline?: string | null
          notable_alumni?: string[] | null
          office_space?: boolean | null
          program_duration?: string | null
          stage_focus?: string[] | null
          success_rate?: number | null
          total_alumni_funding?: number | null
          type?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      action_executions: {
        Row: {
          error_message: string | null
          executed_at: string
          execution_result: Json | null
          execution_status: string
          id: string
          proposed_action_id: string
          rolled_back_at: string | null
          undo_state: Json | null
        }
        Insert: {
          error_message?: string | null
          executed_at?: string
          execution_result?: Json | null
          execution_status?: string
          id?: string
          proposed_action_id: string
          rolled_back_at?: string | null
          undo_state?: Json | null
        }
        Update: {
          error_message?: string | null
          executed_at?: string
          execution_result?: Json | null
          execution_status?: string
          id?: string
          proposed_action_id?: string
          rolled_back_at?: string | null
          undo_state?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "action_executions_proposed_action_id_fkey"
            columns: ["proposed_action_id"]
            isOneToOne: false
            referencedRelation: "proposed_actions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_coach_insights: {
        Row: {
          alerts: Json | null
          created_at: string | null
          id: string
          insights: Json | null
          match_score: number | null
          payload: Json
          recommendations: Json | null
          startup_id: string | null
          updated_at: string | null
        }
        Insert: {
          alerts?: Json | null
          created_at?: string | null
          id?: string
          insights?: Json | null
          match_score?: number | null
          payload?: Json
          recommendations?: Json | null
          startup_id?: string | null
          updated_at?: string | null
        }
        Update: {
          alerts?: Json | null
          created_at?: string | null
          id?: string
          insights?: Json | null
          match_score?: number | null
          payload?: Json
          recommendations?: Json | null
          startup_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_coach_insights_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: true
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_coach_insights_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: true
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "ai_coach_insights_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: true
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      ai_runs: {
        Row: {
          args_json: Json | null
          cost_estimate: number | null
          created_at: string
          duration_ms: number | null
          id: string
          status: string
          tool_name: string
          user_id: string
        }
        Insert: {
          args_json?: Json | null
          cost_estimate?: number | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          status: string
          tool_name: string
          user_id: string
        }
        Update: {
          args_json?: Json | null
          cost_estimate?: number | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          status?: string
          tool_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_runs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_type: string
          bucket_id: string
          created_at: string
          id: string
          object_path: string
          slide_id: string
        }
        Insert: {
          asset_type: string
          bucket_id?: string
          created_at?: string
          id?: string
          object_path: string
          slide_id: string
        }
        Update: {
          asset_type?: string
          bucket_id?: string
          created_at?: string
          id?: string
          object_path?: string
          slide_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_slide_id_fkey"
            columns: ["slide_id"]
            isOneToOne: false
            referencedRelation: "slides"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_type: string | null
          created_at: string
          diff: Json | null
          id: string
          org_id: string | null
          proposed_action_id: string | null
          row_id: string | null
          startup_id: string | null
          table_name: string
          user_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string
          diff?: Json | null
          id?: string
          org_id?: string | null
          proposed_action_id?: string | null
          row_id?: string | null
          startup_id?: string | null
          table_name: string
          user_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string
          diff?: Json | null
          id?: string
          org_id?: string | null
          proposed_action_id?: string | null
          row_id?: string | null
          startup_id?: string | null
          table_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_proposed_action_id_fkey"
            columns: ["proposed_action_id"]
            isOneToOne: false
            referencedRelation: "proposed_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "audit_log_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          run_count: number | null
          startup_id: string | null
          trigger_event: string
          trigger_filter: Json | null
          updated_at: string | null
        }
        Insert: {
          actions?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          run_count?: number | null
          startup_id?: string | null
          trigger_event: string
          trigger_filter?: Json | null
          updated_at?: string | null
        }
        Update: {
          actions?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          run_count?: number | null
          startup_id?: string | null
          trigger_event?: string
          trigger_filter?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_rules_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "automation_rules_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      citations: {
        Row: {
          created_at: string
          id: string
          quote: string | null
          slide_id: string
          source_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          quote?: string | null
          slide_id: string
          source_url: string
        }
        Update: {
          created_at?: string
          id?: string
          quote?: string | null
          slide_id?: string
          source_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "citations_slide_id_fkey"
            columns: ["slide_id"]
            isOneToOne: false
            referencedRelation: "slides"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          communication_type: string
          contact_id: string | null
          content: string | null
          created_at: string
          deal_id: string | null
          direction: string
          duration_minutes: number | null
          id: string
          logged_by: string | null
          metadata: Json | null
          occurred_at: string
          startup_id: string
          status: string | null
          subject: string | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          communication_type: string
          contact_id?: string | null
          content?: string | null
          created_at?: string
          deal_id?: string | null
          direction: string
          duration_minutes?: number | null
          id?: string
          logged_by?: string | null
          metadata?: Json | null
          occurred_at?: string
          startup_id: string
          status?: string | null
          subject?: string | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          communication_type?: string
          contact_id?: string | null
          content?: string | null
          created_at?: string
          deal_id?: string | null
          direction?: string
          duration_minutes?: number | null
          id?: string
          logged_by?: string | null
          metadata?: Json | null
          occurred_at?: string
          startup_id?: string
          status?: string | null
          subject?: string | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_logged_by_fkey"
            columns: ["logged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "communications_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      crm_accounts: {
        Row: {
          created_at: string | null
          domain: string | null
          extended_info: Json | null
          health_score: number | null
          id: string
          last_enriched_at: string | null
          last_interaction_at: string | null
          logo_url: string | null
          mrr: number | null
          name: string
          owner_id: string | null
          renewal_date: string | null
          segment: string | null
          startup_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          extended_info?: Json | null
          health_score?: number | null
          id?: string
          last_enriched_at?: string | null
          last_interaction_at?: string | null
          logo_url?: string | null
          mrr?: number | null
          name: string
          owner_id?: string | null
          renewal_date?: string | null
          segment?: string | null
          startup_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          extended_info?: Json | null
          health_score?: number | null
          id?: string
          last_enriched_at?: string | null
          last_interaction_at?: string | null
          logo_url?: string | null
          mrr?: number | null
          name?: string
          owner_id?: string | null
          renewal_date?: string | null
          segment?: string | null
          startup_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_accounts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_accounts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_accounts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      crm_activities: {
        Row: {
          account_id: string | null
          activity_type: string
          contact_id: string | null
          deal_id: string | null
          description: string | null
          id: string
          metadata: Json | null
          occurred_at: string | null
          startup_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          activity_type: string
          contact_id?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          startup_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          activity_type?: string
          contact_id?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          startup_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_activities_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          account_id: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string | null
          linkedin_url: string | null
          phone: string | null
          role: string | null
          search_vector: unknown
          startup_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          search_vector?: unknown
          startup_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          phone?: string | null
          role?: string | null
          search_vector?: unknown
          startup_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contacts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_contacts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_contacts_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      crm_deal_enrichment: {
        Row: {
          company_data: Json | null
          competitors: Json | null
          deal_id: string | null
          decision_makers: Json | null
          enriched_at: string | null
          id: string
          recent_news: Json | null
          recommended_approach: string | null
        }
        Insert: {
          company_data?: Json | null
          competitors?: Json | null
          deal_id?: string | null
          decision_makers?: Json | null
          enriched_at?: string | null
          id?: string
          recent_news?: Json | null
          recommended_approach?: string | null
        }
        Update: {
          company_data?: Json | null
          competitors?: Json | null
          deal_id?: string | null
          decision_makers?: Json | null
          enriched_at?: string | null
          id?: string
          recent_news?: Json | null
          recommended_approach?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deal_enrichment_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: true
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deal_stage_history: {
        Row: {
          ai_probability_at_change: number | null
          changed_at: string | null
          changed_by: string | null
          deal_id: string | null
          from_stage: string | null
          id: string
          to_stage: string
        }
        Insert: {
          ai_probability_at_change?: number | null
          changed_at?: string | null
          changed_by?: string | null
          deal_id?: string | null
          from_stage?: string | null
          id?: string
          to_stage: string
        }
        Update: {
          ai_probability_at_change?: number | null
          changed_at?: string | null
          changed_by?: string | null
          deal_id?: string | null
          from_stage?: string | null
          id?: string
          to_stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_deal_stage_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deal_stage_history_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deals: {
        Row: {
          account_id: string | null
          actual_close_date: string | null
          ai_predicted_close: string | null
          ai_reasoning: string | null
          ai_risk_factors: string[] | null
          ai_score: number | null
          amount: number | null
          created_at: string | null
          deleted_at: string | null
          expected_close: string | null
          id: string
          last_activity_date: string | null
          name: string
          next_action: string | null
          outcome: string | null
          outcome_reason: string | null
          owner_id: string | null
          probability: number | null
          sector: string | null
          stage: string | null
          startup_id: string
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          actual_close_date?: string | null
          ai_predicted_close?: string | null
          ai_reasoning?: string | null
          ai_risk_factors?: string[] | null
          ai_score?: number | null
          amount?: number | null
          created_at?: string | null
          deleted_at?: string | null
          expected_close?: string | null
          id?: string
          last_activity_date?: string | null
          name: string
          next_action?: string | null
          outcome?: string | null
          outcome_reason?: string | null
          owner_id?: string | null
          probability?: number | null
          sector?: string | null
          stage?: string | null
          startup_id: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          actual_close_date?: string | null
          ai_predicted_close?: string | null
          ai_reasoning?: string | null
          ai_risk_factors?: string[] | null
          ai_score?: number | null
          amount?: number | null
          created_at?: string | null
          deleted_at?: string | null
          expected_close?: string | null
          id?: string
          last_activity_date?: string | null
          name?: string
          next_action?: string | null
          outcome?: string | null
          outcome_reason?: string | null
          owner_id?: string | null
          probability?: number | null
          sector?: string | null
          stage?: string | null
          startup_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      crm_interactions: {
        Row: {
          account_id: string | null
          created_at: string | null
          id: string
          occurred_at: string | null
          sentiment: string | null
          startup_id: string
          summary: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          id?: string
          occurred_at?: string | null
          sentiment?: string | null
          startup_id: string
          summary: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          id?: string
          occurred_at?: string | null
          sentiment?: string | null
          startup_id?: string
          summary?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_interactions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_interactions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_interactions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      crm_lead_enrichment: {
        Row: {
          ceo_linkedin: string | null
          ceo_name: string | null
          company_id: string | null
          created_at: string | null
          evidence_links: Json | null
          funding_history: Json | null
          gemini_summary: string | null
          hiring_trends: Json | null
          id: string
          lead_id: string
          linkedin_company_url: string | null
          market_presence_score: number | null
          recent_news: Json | null
          search_trend_score: number | null
          updated_at: string | null
        }
        Insert: {
          ceo_linkedin?: string | null
          ceo_name?: string | null
          company_id?: string | null
          created_at?: string | null
          evidence_links?: Json | null
          funding_history?: Json | null
          gemini_summary?: string | null
          hiring_trends?: Json | null
          id?: string
          lead_id: string
          linkedin_company_url?: string | null
          market_presence_score?: number | null
          recent_news?: Json | null
          search_trend_score?: number | null
          updated_at?: string | null
        }
        Update: {
          ceo_linkedin?: string | null
          ceo_name?: string | null
          company_id?: string | null
          created_at?: string | null
          evidence_links?: Json | null
          funding_history?: Json | null
          gemini_summary?: string | null
          hiring_trends?: Json | null
          id?: string
          lead_id?: string
          linkedin_company_url?: string | null
          market_presence_score?: number | null
          recent_news?: Json | null
          search_trend_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_lead_enrichment_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_lead_enrichment_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_lead_scores: {
        Row: {
          ai_findings: Json | null
          budget_fit: number | null
          company_size_fit: number | null
          confidence: number | null
          created_at: string | null
          engagement_fit: number | null
          id: string
          industry_fit: number | null
          lead_id: string
          model_version: string | null
          overall_score: number | null
          problem_fit: number | null
          recommended_next_actions: Json | null
          risk_score: number | null
          risks: Json | null
          search_trend_score: number | null
          stage_recommendation: string | null
          status_band: string | null
          updated_at: string | null
        }
        Insert: {
          ai_findings?: Json | null
          budget_fit?: number | null
          company_size_fit?: number | null
          confidence?: number | null
          created_at?: string | null
          engagement_fit?: number | null
          id?: string
          industry_fit?: number | null
          lead_id: string
          model_version?: string | null
          overall_score?: number | null
          problem_fit?: number | null
          recommended_next_actions?: Json | null
          risk_score?: number | null
          risks?: Json | null
          search_trend_score?: number | null
          stage_recommendation?: string | null
          status_band?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_findings?: Json | null
          budget_fit?: number | null
          company_size_fit?: number | null
          confidence?: number | null
          created_at?: string | null
          engagement_fit?: number | null
          id?: string
          industry_fit?: number | null
          lead_id?: string
          model_version?: string | null
          overall_score?: number | null
          problem_fit?: number | null
          recommended_next_actions?: Json | null
          risk_score?: number | null
          risks?: Json | null
          search_trend_score?: number | null
          stage_recommendation?: string | null
          status_band?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_lead_scores_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_tasks: {
        Row: {
          account_id: string | null
          assignee_id: string | null
          completed: boolean | null
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          description: string | null
          due: string | null
          id: string
          priority: string | null
          source: string | null
          startup_id: string
          status: string | null
          task_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          assignee_id?: string | null
          completed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          due?: string | null
          id?: string
          priority?: string | null
          source?: string | null
          startup_id: string
          status?: string | null
          task_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          assignee_id?: string | null
          completed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          due?: string | null
          id?: string
          priority?: string | null
          source?: string | null
          startup_id?: string
          status?: string | null
          task_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crm_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      data_room_files: {
        Row: {
          ai_category_suggestion: string | null
          ai_notes: string | null
          ai_quality_score: number | null
          category: string | null
          created_at: string | null
          file_path: string | null
          file_size: number | null
          filename: string
          id: string
          is_outdated: boolean | null
          is_verified: boolean | null
          last_reviewed_at: string | null
          mime_type: string | null
          startup_id: string
          subcategory: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_category_suggestion?: string | null
          ai_notes?: string | null
          ai_quality_score?: number | null
          category?: string | null
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          filename: string
          id?: string
          is_outdated?: boolean | null
          is_verified?: boolean | null
          last_reviewed_at?: string | null
          mime_type?: string | null
          startup_id: string
          subcategory?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_category_suggestion?: string | null
          ai_notes?: string | null
          ai_quality_score?: number | null
          category?: string | null
          created_at?: string | null
          file_path?: string | null
          file_size?: number | null
          filename?: string
          id?: string
          is_outdated?: boolean | null
          is_verified?: boolean | null
          last_reviewed_at?: string | null
          mime_type?: string | null
          startup_id?: string
          subcategory?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_room_files_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_room_files_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "data_room_files_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      decks: {
        Row: {
          created_at: string
          description: string | null
          format: string
          id: string
          last_accessed_at: string | null
          meta: Json | null
          org_id: string
          search_vector: unknown
          slides_snapshot: Json | null
          startup_id: string | null
          status: string
          template: string
          theme_config: Json | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          format?: string
          id?: string
          last_accessed_at?: string | null
          meta?: Json | null
          org_id: string
          search_vector?: unknown
          slides_snapshot?: Json | null
          startup_id?: string | null
          status?: string
          template?: string
          theme_config?: Json | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          format?: string
          id?: string
          last_accessed_at?: string | null
          meta?: Json | null
          org_id?: string
          search_vector?: unknown
          slides_snapshot?: Json | null
          startup_id?: string | null
          status?: string
          template?: string
          theme_config?: Json | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "decks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      documents: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          document_type: string
          id: string
          is_draft: boolean
          startup_id: string
          title: string | null
          updated_at: string
          version: number
          wizard_session_id: string | null
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          document_type: string
          id?: string
          is_draft?: boolean
          startup_id: string
          title?: string | null
          updated_at?: string
          version?: number
          wizard_session_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          document_type?: string
          id?: string
          is_draft?: boolean
          startup_id?: string
          title?: string | null
          updated_at?: string
          version?: number
          wizard_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "documents_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "documents_wizard_session_id_fkey"
            columns: ["wizard_session_id"]
            isOneToOne: false
            referencedRelation: "wizard_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      event_assets: {
        Row: {
          ai_model: string | null
          ai_prompt: string | null
          asset_type: string
          content: string | null
          created_at: string | null
          event_id: string
          id: string
          is_ai_generated: boolean | null
          metadata: Json | null
          parent_asset_id: string | null
          startup_id: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          url: string | null
          version: number | null
        }
        Insert: {
          ai_model?: string | null
          ai_prompt?: string | null
          asset_type: string
          content?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          is_ai_generated?: boolean | null
          metadata?: Json | null
          parent_asset_id?: string | null
          startup_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          version?: number | null
        }
        Update: {
          ai_model?: string | null
          ai_prompt?: string | null
          asset_type?: string
          content?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          is_ai_generated?: boolean | null
          metadata?: Json | null
          parent_asset_id?: string | null
          startup_id?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_assets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_assets_parent_asset_id_fkey"
            columns: ["parent_asset_id"]
            isOneToOne: false
            referencedRelation: "event_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_assets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_assets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "event_assets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      event_budgets: {
        Row: {
          actual_cost: number | null
          category: string
          created_at: string | null
          currency: string | null
          description: string | null
          estimated_cost: number
          event_id: string
          id: string
          invoice_url: string | null
          is_paid: boolean | null
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          startup_id: string | null
          updated_at: string | null
          vendor_contact: string | null
          vendor_name: string | null
        }
        Insert: {
          actual_cost?: number | null
          category: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimated_cost: number
          event_id: string
          id?: string
          invoice_url?: string | null
          is_paid?: boolean | null
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          startup_id?: string | null
          updated_at?: string | null
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Update: {
          actual_cost?: number | null
          category?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimated_cost?: number
          event_id?: string
          id?: string
          invoice_url?: string | null
          is_paid?: boolean | null
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          startup_id?: string | null
          updated_at?: string | null
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_budgets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_budgets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_budgets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "event_budgets_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          checked_in_at: string | null
          custom_data: Json | null
          event_id: string | null
          feedback_comment: string | null
          feedback_score: number | null
          id: string
          registered_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          checked_in_at?: string | null
          custom_data?: Json | null
          event_id?: string | null
          feedback_comment?: string | null
          feedback_score?: number | null
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          checked_in_at?: string | null
          custom_data?: Json | null
          event_id?: string | null
          feedback_comment?: string | null
          feedback_score?: number | null
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tasks: {
        Row: {
          ai_reasoning: string | null
          assignee_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          due_offset_days: number | null
          event_id: string
          id: string
          is_ai_generated: boolean | null
          phase: string
          priority: string | null
          startup_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_reasoning?: string | null
          assignee_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_offset_days?: number | null
          event_id: string
          id?: string
          is_ai_generated?: boolean | null
          phase: string
          priority?: string | null
          startup_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_reasoning?: string | null
          assignee_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          due_offset_days?: number | null
          event_id?: string
          id?: string
          is_ai_generated?: boolean | null
          phase?: string
          priority?: string | null
          startup_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tasks_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "event_tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      events: {
        Row: {
          ai_analysis: Json | null
          attended_count: number | null
          budget_currency: string | null
          budget_spent: number | null
          budget_total: number | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          event_date: string
          event_type: string | null
          format: string | null
          id: string
          image_url: string | null
          landing_page_url: string | null
          location: string | null
          location_data: Json | null
          org_id: string | null
          registered_count: number | null
          registration_url: string | null
          search_vector: unknown
          startup_id: string | null
          status: string | null
          tagline: string | null
          target_attendees: number | null
          timezone: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          wizard_context: Json | null
        }
        Insert: {
          ai_analysis?: Json | null
          attended_count?: number | null
          budget_currency?: string | null
          budget_spent?: number | null
          budget_total?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date: string
          event_type?: string | null
          format?: string | null
          id?: string
          image_url?: string | null
          landing_page_url?: string | null
          location?: string | null
          location_data?: Json | null
          org_id?: string | null
          registered_count?: number | null
          registration_url?: string | null
          search_vector?: unknown
          startup_id?: string | null
          status?: string | null
          tagline?: string | null
          target_attendees?: number | null
          timezone?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          wizard_context?: Json | null
        }
        Update: {
          ai_analysis?: Json | null
          attended_count?: number | null
          budget_currency?: string | null
          budget_spent?: number | null
          budget_total?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string | null
          format?: string | null
          id?: string
          image_url?: string | null
          landing_page_url?: string | null
          location?: string | null
          location_data?: Json | null
          org_id?: string | null
          registered_count?: number | null
          registration_url?: string | null
          search_vector?: unknown
          startup_id?: string | null
          status?: string | null
          tagline?: string | null
          target_attendees?: number | null
          timezone?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          wizard_context?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "events_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      investor_docs: {
        Row: {
          ai_model: string | null
          ai_prompt_used: string | null
          content: Json
          content_markdown: string | null
          created_at: string | null
          deleted_at: string | null
          generation_time_ms: number | null
          id: string
          share_expires_at: string | null
          share_token: string | null
          startup_id: string
          status: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
          version: number | null
          view_count: number | null
        }
        Insert: {
          ai_model?: string | null
          ai_prompt_used?: string | null
          content: Json
          content_markdown?: string | null
          created_at?: string | null
          deleted_at?: string | null
          generation_time_ms?: number | null
          id?: string
          share_expires_at?: string | null
          share_token?: string | null
          startup_id: string
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
          version?: number | null
          view_count?: number | null
        }
        Update: {
          ai_model?: string | null
          ai_prompt_used?: string | null
          content?: Json
          content_markdown?: string | null
          created_at?: string | null
          deleted_at?: string | null
          generation_time_ms?: number | null
          id?: string
          share_expires_at?: string | null
          share_token?: string | null
          startup_id?: string
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          version?: number | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_docs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_docs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "investor_docs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      investor_outreach: {
        Row: {
          ai_fit_reasoning: string | null
          ai_fit_score: number | null
          ai_suggested_approach: string | null
          created_at: string | null
          first_contact_date: string | null
          id: string
          investor_email: string | null
          investor_firm: string | null
          investor_id: string | null
          investor_name: string | null
          last_contact_date: string | null
          meeting_date: string | null
          next_follow_up: string | null
          notes: string | null
          one_pager_id: string | null
          startup_id: string
          status: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_fit_reasoning?: string | null
          ai_fit_score?: number | null
          ai_suggested_approach?: string | null
          created_at?: string | null
          first_contact_date?: string | null
          id?: string
          investor_email?: string | null
          investor_firm?: string | null
          investor_id?: string | null
          investor_name?: string | null
          last_contact_date?: string | null
          meeting_date?: string | null
          next_follow_up?: string | null
          notes?: string | null
          one_pager_id?: string | null
          startup_id: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_fit_reasoning?: string | null
          ai_fit_score?: number | null
          ai_suggested_approach?: string | null
          created_at?: string | null
          first_contact_date?: string | null
          id?: string
          investor_email?: string | null
          investor_firm?: string | null
          investor_id?: string | null
          investor_name?: string | null
          last_contact_date?: string | null
          meeting_date?: string | null
          next_follow_up?: string | null
          notes?: string | null
          one_pager_id?: string | null
          startup_id?: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investor_outreach_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_outreach_one_pager_id_fkey"
            columns: ["one_pager_id"]
            isOneToOne: false
            referencedRelation: "investor_docs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_outreach_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_outreach_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "investor_outreach_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      investors: {
        Row: {
          application_link: string | null
          aum: number | null
          benefits: string[] | null
          contact_email: string | null
          created_at: string
          data_source: string | null
          description: string | null
          equity_percent_max: number | null
          equity_percent_min: number | null
          geographies: string[] | null
          hq_location: string | null
          id: string
          is_active: boolean | null
          last_verified_at: string | null
          linkedin_url: string | null
          logo_url: string | null
          max_check_size: number | null
          min_check_size: number | null
          name: string
          notable_investments: string[] | null
          portfolio_companies: Json | null
          search_vector: unknown
          slug: string | null
          social_links: Json | null
          specialties: string[] | null
          stages: string[] | null
          terms_summary: string | null
          time_to_decision: string | null
          twitter_url: string | null
          type: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          application_link?: string | null
          aum?: number | null
          benefits?: string[] | null
          contact_email?: string | null
          created_at?: string
          data_source?: string | null
          description?: string | null
          equity_percent_max?: number | null
          equity_percent_min?: number | null
          geographies?: string[] | null
          hq_location?: string | null
          id?: string
          is_active?: boolean | null
          last_verified_at?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          max_check_size?: number | null
          min_check_size?: number | null
          name: string
          notable_investments?: string[] | null
          portfolio_companies?: Json | null
          search_vector?: unknown
          slug?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          stages?: string[] | null
          terms_summary?: string | null
          time_to_decision?: string | null
          twitter_url?: string | null
          type: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          application_link?: string | null
          aum?: number | null
          benefits?: string[] | null
          contact_email?: string | null
          created_at?: string
          data_source?: string | null
          description?: string | null
          equity_percent_max?: number | null
          equity_percent_min?: number | null
          geographies?: string[] | null
          hq_location?: string | null
          id?: string
          is_active?: boolean | null
          last_verified_at?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          max_check_size?: number | null
          min_check_size?: number | null
          name?: string
          notable_investments?: string[] | null
          portfolio_companies?: Json | null
          search_vector?: unknown
          slug?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          stages?: string[] | null
          terms_summary?: string | null
          time_to_decision?: string | null
          twitter_url?: string | null
          type?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applied_at: string | null
          id: string
          job_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_url: string | null
          created_at: string | null
          description: string | null
          id: string
          job_type: string | null
          location: string | null
          salary_range: string | null
          startup_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          application_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          salary_range?: string | null
          startup_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          application_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          salary_range?: string | null
          startup_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "jobs_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      market_sizing_results: {
        Row: {
          ai_model: string | null
          beachhead: string | null
          business_model: string | null
          confidence_score: number | null
          created_at: string | null
          generated_at: string | null
          icp: string | null
          id: string
          industry: string
          location: string | null
          methodology: string | null
          sam: Json
          som: Json
          sources: Json | null
          startup_id: string
          tam: Json
          target_audience: string | null
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          beachhead?: string | null
          business_model?: string | null
          confidence_score?: number | null
          created_at?: string | null
          generated_at?: string | null
          icp?: string | null
          id?: string
          industry: string
          location?: string | null
          methodology?: string | null
          sam: Json
          som: Json
          sources?: Json | null
          startup_id: string
          tam: Json
          target_audience?: string | null
          user_id: string
        }
        Update: {
          ai_model?: string | null
          beachhead?: string | null
          business_model?: string | null
          confidence_score?: number | null
          created_at?: string | null
          generated_at?: string | null
          icp?: string | null
          id?: string
          industry?: string
          location?: string | null
          methodology?: string | null
          sam?: Json
          som?: Json
          sources?: Json | null
          startup_id?: string
          tam?: Json
          target_audience?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_sizing_results_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_sizing_results_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "market_sizing_results_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          org_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          org_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          org_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      org_invites: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string
          org_id: string
          role: string
          token: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          org_id: string
          role?: string
          token?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          org_id?: string
          role?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_invites_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string
          org_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          org_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          org_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orgs: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orgs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      proposed_actions: {
        Row: {
          action_type: string
          after_state: Json
          approved_at: string | null
          approved_by: string | null
          before_state: Json | null
          created_at: string
          created_by: string
          expires_at: string
          id: string
          metadata: Json | null
          org_id: string
          resource_id: string | null
          resource_type: string
          startup_id: string | null
          status: string
        }
        Insert: {
          action_type: string
          after_state: Json
          approved_at?: string | null
          approved_by?: string | null
          before_state?: Json | null
          created_at?: string
          created_by: string
          expires_at?: string
          id?: string
          metadata?: Json | null
          org_id: string
          resource_id?: string | null
          resource_type: string
          startup_id?: string | null
          status?: string
        }
        Update: {
          action_type?: string
          after_state?: Json
          approved_at?: string | null
          approved_by?: string | null
          before_state?: Json | null
          created_at?: string
          created_by?: string
          expires_at?: string
          id?: string
          metadata?: Json | null
          org_id?: string
          resource_id?: string | null
          resource_type?: string
          startup_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposed_actions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposed_actions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposed_actions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposed_actions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposed_actions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "proposed_actions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      saved_opportunities: {
        Row: {
          created_at: string | null
          id: string
          opportunity_id: string
          opportunity_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          opportunity_id: string
          opportunity_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          opportunity_id?: string
          opportunity_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      share_links: {
        Row: {
          created_at: string
          deck_id: string
          expires_at: string | null
          id: string
          token: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          deck_id: string
          expires_at?: string | null
          id?: string
          token: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          deck_id?: string
          expires_at?: string | null
          id?: string
          token?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "share_links_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      slides: {
        Row: {
          bullets: Json | null
          chart_data: Json | null
          content: string | null
          created_at: string
          deck_id: string
          id: string
          image_url: string | null
          layout: string | null
          meta: Json | null
          position: number
          speaker_notes: string | null
          table_data: Json | null
          template: string | null
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          bullets?: Json | null
          chart_data?: Json | null
          content?: string | null
          created_at?: string
          deck_id: string
          id?: string
          image_url?: string | null
          layout?: string | null
          meta?: Json | null
          position: number
          speaker_notes?: string | null
          table_data?: Json | null
          template?: string | null
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          bullets?: Json | null
          chart_data?: Json | null
          content?: string | null
          created_at?: string
          deck_id?: string
          id?: string
          image_url?: string | null
          layout?: string | null
          meta?: Json | null
          position?: number
          speaker_notes?: string | null
          table_data?: Json | null
          template?: string | null
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "slides_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      startup_competitors: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          startup_id: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          startup_id: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          startup_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startup_competitors_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "startup_competitors_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "startup_competitors_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      startup_founders: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          linkedin_url: string | null
          role: string | null
          startup_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          role?: string | null
          startup_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          role?: string | null
          startup_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "startup_founders_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "startup_founders_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "startup_founders_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      startup_links: {
        Row: {
          created_at: string
          id: string
          kind: string
          label: string | null
          startup_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          label?: string | null
          startup_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          label?: string | null
          startup_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "startup_links_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "startup_links_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "startup_links_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      startup_metrics_snapshots: {
        Row: {
          created_at: string
          growth_rate_pct: number | null
          id: string
          monthly_active_users: number | null
          monthly_revenue: number | null
          snapshot_date: string
          startup_id: string
        }
        Insert: {
          created_at?: string
          growth_rate_pct?: number | null
          id?: string
          monthly_active_users?: number | null
          monthly_revenue?: number | null
          snapshot_date?: string
          startup_id: string
        }
        Update: {
          created_at?: string
          growth_rate_pct?: number | null
          id?: string
          monthly_active_users?: number | null
          monthly_revenue?: number | null
          snapshot_date?: string
          startup_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "startup_metrics_snapshots_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "startup_metrics_snapshots_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "startup_metrics_snapshots_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      startups: {
        Row: {
          business_model: string[] | null
          cover_image_url: string | null
          created_at: string | null
          deep_research_report: Json | null
          description: string | null
          id: string
          industry: string | null
          is_public: boolean | null
          is_raising: boolean | null
          logo_url: string | null
          name: string
          needs_data: Json | null
          org_id: string | null
          pricing_model: string | null
          problem: string | null
          profile_strength: number | null
          raise_amount: number | null
          search_vector: unknown
          solution: string | null
          stage: string | null
          tagline: string | null
          target_customers: string[] | null
          team_data: Json | null
          team_size: number | null
          traction_data: Json | null
          unique_value: string | null
          updated_at: string | null
          use_of_funds: string[] | null
          user_id: string | null
          website_url: string | null
          year_founded: number | null
        }
        Insert: {
          business_model?: string[] | null
          cover_image_url?: string | null
          created_at?: string | null
          deep_research_report?: Json | null
          description?: string | null
          id?: string
          industry?: string | null
          is_public?: boolean | null
          is_raising?: boolean | null
          logo_url?: string | null
          name: string
          needs_data?: Json | null
          org_id?: string | null
          pricing_model?: string | null
          problem?: string | null
          profile_strength?: number | null
          raise_amount?: number | null
          search_vector?: unknown
          solution?: string | null
          stage?: string | null
          tagline?: string | null
          target_customers?: string[] | null
          team_data?: Json | null
          team_size?: number | null
          traction_data?: Json | null
          unique_value?: string | null
          updated_at?: string | null
          use_of_funds?: string[] | null
          user_id?: string | null
          website_url?: string | null
          year_founded?: number | null
        }
        Update: {
          business_model?: string[] | null
          cover_image_url?: string | null
          created_at?: string | null
          deep_research_report?: Json | null
          description?: string | null
          id?: string
          industry?: string | null
          is_public?: boolean | null
          is_raising?: boolean | null
          logo_url?: string | null
          name?: string
          needs_data?: Json | null
          org_id?: string | null
          pricing_model?: string | null
          problem?: string | null
          profile_strength?: number | null
          raise_amount?: number | null
          search_vector?: unknown
          solution?: string | null
          stage?: string | null
          tagline?: string | null
          target_customers?: string[] | null
          team_data?: Json | null
          team_size?: number | null
          traction_data?: Json | null
          unique_value?: string | null
          updated_at?: string | null
          use_of_funds?: string[] | null
          user_id?: string | null
          website_url?: string | null
          year_founded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "startups_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          completed_at: string | null
          completed_by: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          id: string
          priority: string | null
          reminder_at: string | null
          startup_id: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string | null
          reminder_at?: string | null
          startup_id: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string | null
          reminder_at?: string | null
          startup_id?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "tasks_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      wizard_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: number
          id: string
          locked_at: string | null
          started_at: string
          startup_id: string
          status: string
          updated_at: string
          wizard_state: Json
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          id?: string
          locked_at?: string | null
          started_at?: string
          startup_id: string
          status?: string
          updated_at?: string
          wizard_state?: Json
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          id?: string
          locked_at?: string | null
          started_at?: string
          startup_id?: string
          status?: string
          updated_at?: string
          wizard_state?: Json
        }
        Relationships: [
          {
            foreignKeyName: "wizard_sessions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wizard_sessions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "wizard_sessions_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
    }
    Views: {
      view_crm_pipeline_stats: {
        Row: {
          avg_probability: number | null
          conversion_rate_pct: number | null
          deals_closed_lost: number | null
          deals_closed_won: number | null
          deals_lead: number | null
          deals_negotiation: number | null
          deals_proposal: number | null
          deals_qualified: number | null
          startup_id: string | null
          total_deals: number | null
          total_pipeline_value: number | null
          weighted_pipeline_value: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_dashboard_metrics"
            referencedColumns: ["startup_id"]
          },
          {
            foreignKeyName: "crm_deals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "view_startup_stats"
            referencedColumns: ["startup_id"]
          },
        ]
      }
      view_dashboard_metrics: {
        Row: {
          active_deals: number | null
          last_interaction_date: string | null
          startup_id: string | null
          total_accounts: number | null
          total_interactions: number | null
          upcoming_tasks: number | null
        }
        Relationships: []
      }
      view_startup_stats: {
        Row: {
          completion_score: number | null
          current_growth_rate: number | null
          current_mau: number | null
          current_mrr: number | null
          last_metrics_date: string | null
          metrics_count: number | null
          mrr_growth_pct: number | null
          startup_id: string | null
          startup_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_startup_profile_strength: {
        Args: { p_startup_id: string }
        Returns: number
      }
      close_deal: {
        Args: { p_deal_id: string; p_outcome: string; p_reason?: string }
        Returns: Json
      }
      create_deck_with_slides: {
        Args: {
          p_deck_id: string
          p_org_id: string
          p_slides: Json
          p_template: string
          p_title: string
        }
        Returns: undefined
      }
      get_application_deadlines: {
        Args: { p_days_ahead?: number; p_user_id?: string }
        Returns: {
          accelerator_name: string
          application_id: string
          cohort: string
          days_remaining: number
          deadline: string
          status: string
        }[]
      }
      get_crm_pipeline_summary: {
        Args: { startup_id_param: string }
        Returns: Json
      }
      get_deal_analytics: { Args: { p_startup_id: string }; Returns: Json }
      get_deal_stage_history: {
        Args: { p_deal_id: string }
        Returns: {
          ai_probability: number
          changed_at: string
          changed_by_name: string
          days_in_stage: number
          from_stage: string
          id: string
          to_stage: string
        }[]
      }
      get_matching_accelerators: {
        Args: { p_industry?: string; p_limit?: number; p_stage?: string }
        Returns: {
          days_to_deadline: number
          equity_percentage: number
          funding_amount: number
          id: string
          industry_focus: string[]
          industry_match: boolean
          location: string
          name: string
          next_deadline: string
          stage_focus: string[]
          stage_match: boolean
          type: string
        }[]
      }
      get_matching_investors: {
        Args: {
          p_check_size?: number
          p_industry?: string
          p_limit?: number
          p_stage?: string
        }
        Returns: {
          check_size_match: boolean
          id: string
          industry_match: boolean
          max_check_size: number
          min_check_size: number
          name: string
          specialties: string[]
          stage_match: boolean
          stages: string[]
          type: string
        }[]
      }
      get_outreach_pipeline_stats: {
        Args: { p_startup_id: string }
        Returns: {
          avg_fit_score: number
          count: number
          status: string
        }[]
      }
      get_shared_deck: {
        Args: { p_token: string }
        Returns: {
          created_at: string
          deck_id: string
          template: string
          title: string
        }[]
      }
      get_startup_dashboard_data: {
        Args: { startup_id_param: string }
        Returns: Json
      }
      get_startup_profile: { Args: { p_startup_id: string }; Returns: Json }
      get_user_role: { Args: { org_id: string }; Returns: string }
      log_ai_run: {
        Args: {
          p_args_json?: Json
          p_cost_estimate?: number
          p_duration_ms?: number
          p_status?: string
          p_tool_name: string
          p_user_id: string
        }
        Returns: string
      }
      move_deal_stage: {
        Args: { p_deal_id: string; p_new_stage: string; p_user_id?: string }
        Returns: Json
      }
      process_org_invite: { Args: { invite_token: string }; Returns: boolean }
      refresh_all_materialized_views: { Args: never; Returns: undefined }
      refresh_view_crm_pipeline_stats: { Args: never; Returns: undefined }
      refresh_view_dashboard_metrics: { Args: never; Returns: undefined }
      refresh_view_startup_stats: { Args: never; Returns: undefined }
      reorder_slides: {
        Args: { deck_id_input: string; ordered_slide_ids: string[] }
        Returns: undefined
      }
      restore_deleted: {
        Args: { record_id: string; table_name: string }
        Returns: boolean
      }
      search_startups: {
        Args: { filters?: Json; query_text: string }
        Returns: {
          description: string
          id: string
          industry: string
          is_raising: boolean
          name: string
          profile_strength: number
          rank: number
          stage: string
          tagline: string
        }[]
      }
      soft_delete: {
        Args: { record_id: string; table_name: string }
        Returns: boolean
      }
      transfer_org_ownership: {
        Args: { p_new_owner_id: string; p_org_id: string }
        Returns: undefined
      }
      update_deck_accessed: { Args: { deck_uuid: string }; Returns: undefined }
      update_outreach_status: {
        Args: { p_new_status: string; p_notes?: string; p_outreach_id: string }
        Returns: {
          ai_fit_reasoning: string | null
          ai_fit_score: number | null
          ai_suggested_approach: string | null
          created_at: string | null
          first_contact_date: string | null
          id: string
          investor_email: string | null
          investor_firm: string | null
          investor_id: string | null
          investor_name: string | null
          last_contact_date: string | null
          meeting_date: string | null
          next_follow_up: string | null
          notes: string | null
          one_pager_id: string | null
          startup_id: string
          status: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "investor_outreach"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      upsert_coach_insights: {
        Args: {
          p_alerts?: Json
          p_insights?: Json
          p_match_score?: number
          p_recommendations?: Json
          p_startup_id: string
        }
        Returns: string
      }
    }
    Enums: {
      confidence_level: "high" | "medium" | "low"
      event_type: "baseline" | "recheck" | "campaign"
      fashion_category_type: "womenswear" | "menswear" | "unisex"
      job_phase:
        | "url_context"
        | "search_grounding"
        | "image_generation"
        | "scoring"
        | "card_generation"
        | "finalizing"
      job_status: "queued" | "running" | "complete" | "failed"
      link_type:
        | "tiktok"
        | "pinterest"
        | "twitter"
        | "facebook"
        | "youtube"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      confidence_level: ["high", "medium", "low"],
      event_type: ["baseline", "recheck", "campaign"],
      fashion_category_type: ["womenswear", "menswear", "unisex"],
      job_phase: [
        "url_context",
        "search_grounding",
        "image_generation",
        "scoring",
        "card_generation",
        "finalizing",
      ],
      job_status: ["queued", "running", "complete", "failed"],
      link_type: [
        "tiktok",
        "pinterest",
        "twitter",
        "facebook",
        "youtube",
        "other",
      ],
    },
  },
} as const
