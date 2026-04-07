export interface TaskAssignment {
  id: string;
  task_id: string;
  child_id: string;
  status: string;
  assigned_at: string;
  completed_at?: string;
}

export interface Tarea {
  id: string;
  parent_id: string;
  title: string;
  description?: string;
  due_date?: string;
  due_time?: string;
  reward_keys?: number;
  duration_hours?: number;
  duration_minutes?: number;
  created_at?: string;
  updated_at?: string;
  assignments?: TaskAssignment[];
  color?: string; // Solo frontend
}
