/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export default function Week10() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = (newTask: { title: string; description: string }) => {
    const taskWithId: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, taskWithId]);
  };

  // const handleSelectTask = (task: Task) => {
  //   setSelectedTask(task);
  // };

  // const handleOpenModal = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="bg-gray-900 w-2/3 h-[80vh] p-2">
      <TaskList tasks={tasks} setIsOpen={setIsOpen} />
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <TaskForm onAddTask={handleAddTask} />
        </Modal>
      )}

      {/* {selectedTask && (
         <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
         <TaskDetails
         task={selectedTask}
         />
       </Modal>
      )} */}
    </div>
  );
}

// interface TaskDetailsProps {
//   task: Task;
// }

// const TaskDetails = ({task}: TaskDetailsProps) => {
//   return ()
// }
interface taskListProps {
  tasks: Task[];
  setIsOpen: (isOpen: boolean) => void;
}

const TaskList = ({ tasks, setIsOpen }: taskListProps) => {
  const completedTasks = tasks
    .filter((task) => task.completed)
    .slice()
    .reverse();

  const uncompletedTasks = tasks
    .filter((task) => !task.completed)
    .slice()
    .reverse();

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="h-[78vh] w-1/2 bg-gray-950 p-2 flex flex-col">
        <span className="text-gray-200 text-sm">
          TO DO ({uncompletedTasks.length})
        </span>
        {uncompletedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <button onClick={() => setIsOpen(true)}>Add task</button>
      </div>

      <div className="h-[78vh] w-1/2 bg-gray-950 p-2 flex flex-col">
        <span className="text-gray-200 text-sm">
          COMPLETED ({completedTasks.length})
        </span>
        {completedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskItem = ({ task }: { task: Task }) => (
  <li className="bg-gray-600">
    <p>{task.title}</p>
    <p>{task.description}</p>
  </li>
);

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string }) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 m-12">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/50 z-50 backdrop-blur flex justify-center items-center p-4">
      <div className="h-96 w-96 overflow-y-auto bg-gray-950 shadow-2xl">
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 mr-3 text-3xl text-purple bg-whitesmoke rounded-full w-5 h-5 m-2 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
