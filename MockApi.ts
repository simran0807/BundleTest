type TaskStatus = 'processing' | 'completed' | 'failed';

const taskStatusMap = new Map<string, TaskStatus>();
const taskStartTimes = new Map<string, number>();

export async function mockUpload(fileName: string): Promise<{ taskId: string }> {
  const taskId = Math.random().toString(36).substring(2);
  taskStatusMap.set(taskId, 'processing');
  taskStartTimes.set(taskId, Date.now());
  return new Promise((resolve) => setTimeout(() => resolve({ taskId }), 500));
}

export async function mockCheckStatus(taskId: string): Promise<{ status: TaskStatus }> {
  return new Promise((resolve, reject) => {
    const start = taskStartTimes.get(taskId) ?? 0;
    const now = Date.now();

    if (!taskStatusMap.has(taskId)) {
      return reject(new Error("Task not found"));
    }

    const elapsed = (now - start) / 1000;
    if (elapsed > 5) {
      const isSuccess = Math.random() > 0.3; // 70% chance success
      const finalStatus: TaskStatus = isSuccess ? 'completed' : 'failed';
      taskStatusMap.set(taskId, finalStatus);
    }

    const status = taskStatusMap.get(taskId)!;
    resolve({ status });
  });
}
