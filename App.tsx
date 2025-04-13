import { useCallback, useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { TaskList } from "./components/TaskList";
import { usePollingTask } from "./PollingTask";
import { mockUpload } from "./MockApi";
import { Task, TaskStatus } from "./Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { startPolling, cancelPolling } = usePollingTask(); // <- grab cancelPolling

  const handleSubmit = async (file: File) => {
    const { taskId } = await mockUpload(file.name);
    const newTask: Task = { id: taskId, fileName: file.name, status: 'processing' };
    setTasks((prev) => [...prev, newTask]);

    startPolling(taskId, (status, error) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId && t.status !== 'cancelled' // ✅ don't override cancelled
                ? { ...t, status: status as TaskStatus, error: error || undefined }
                : t
            )
          );
        });
  };

  const handleCancel = useCallback((id: string) => {
    cancelPolling(id); // ✅ stop polling
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'cancelled' } : task
      )
    );
  }, [cancelPolling]);

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Upload Task Tracker</h1>
      <FileUploader onSubmit={handleSubmit} />
      <TaskList tasks={tasks} onCancel={handleCancel} />
    </div>
  );
}
export default App;
