export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface TicketListItem {
  id: number;
  code: string;
  title: string;
  category_name: string;
  assignee_name: string | null;
  status: TicketStatus;
  status_text: string;
  deletable: boolean;
}

export interface TicketCategory {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  code: string;
  title: string;
  description: string | null;
  category: TicketCategory;
  assignee_name: string | null;
  status: TicketStatus;
  status_text: string;
  created_at: string;
}

export interface TicketCategoryOption {
  id: number;
  name: string;
}
