import { useEffect, useRef } from 'react';
import { mockCheckStatus } from './MockApi';

export function usePollingTask() {
  const timers = useRef<Record<string, NodeJS.Timeout>>({});
  const cancelledTasks = useRef<Set<string>>(new Set());

  const startPolling = (
    taskId: string,
    onUpdate: (status: string, error?: string) => void
  ) => {
    let retries = 0;

    const poll = () => {
      if (cancelledTasks.current.has(taskId)) {
        clearInterval(timers.current[taskId]);
        delete timers.current[taskId];
        return;
      }

      mockCheckStatus(taskId)
        .then((data) => {
          if (cancelledTasks.current.has(taskId)) return; // Ignore update if cancelled

          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(timers.current[taskId]);
            delete timers.current[taskId];
          }

          onUpdate(data.status);
        })
        .catch(() => {
          retries++;
          if (retries >= 3) {
            clearInterval(timers.current[taskId]);
            delete timers.current[taskId];
            onUpdate('failed', 'Network error');
          }
        });
    };

    poll();
    timers.current[taskId] = setInterval(poll, 2000);
  };

  const cancelPolling = (taskId: string) => {
    cancelledTasks.current.add(taskId);
    clearInterval(timers.current[taskId]);
    delete timers.current[taskId];
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearInterval);
      timers.current = {};
      cancelledTasks.current.clear();
    };
  }, []);

  return { startPolling, cancelPolling };
}
