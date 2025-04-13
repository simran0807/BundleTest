export type TaskStatus = 'pending' | 'processing' | 'success' | 'error' | 'cancelled';

export interface Task {
  id: string;
  fileName: string;
  status: TaskStatus;
  error?: string;
}
