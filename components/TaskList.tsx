import React from 'react';
import { Task } from '../Task';

interface Props {
  tasks: Task[];
  onCancel: (id: string) => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onCancel }) => (
  <div className="p-4 space-y-2">
    {tasks.map((task) => (
      <div key={task.id} className="border p-2 rounded flex justify-between items-center">
        <div>
          <p className="font-medium">{task.fileName}</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-semibold">{task.status}</span>
            {task.error && <span className="text-red-500 ml-2">{task.error}</span>}
          </p>
        </div>
        {task.status === 'processing' && (
          <button
            onClick={() => onCancel(task.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    ))}
  </div>
);
