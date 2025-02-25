/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { UserCircleIcon, CheckIcon } from "@heroicons/react/24/solid";

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
    <div className="bg-gray-900 w-full h-full p-4">
      <TaskList tasks={tasks} setIsOpen={setIsOpen} />
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <TaskForm onAddTask={handleAddTask} setIsOpen={setIsOpen} />
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
  const completedTasks = tasks.filter((task) => task.completed).slice();

  const uncompletedTasks = tasks.filter((task) => !task.completed).slice();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
      <div className="h-[80vh] min-w-80 bg-gray-950 p-2 flex flex-col">
        <span className="text-gray-200 text-sm mb-4 p-4">
          TO DO ({uncompletedTasks.length})
        </span>
        {uncompletedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className="hover:bg-gray-900 w-full p-4 rounded"
        >
          + Add task
        </button>
      </div>

      <div className="h-[80vh] min-w-80 bg-gray-950 p-2 flex flex-col">
        <span className="text-gray-200 text-sm mb-4 p-4">
          {" "}
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
  <div className="bg-gray-900 p-4 mb-2 rounded shadow-md flex flex-col w-full items-start justify-center overflow-hidden">
    <p className="text-gray-300 font-semibold truncate overflow-hidden">
      {task.title}
    </p>
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center overflow-hidden">
        <div className="w-5 h-5 bg-blue-400">
          <CheckIcon className="w-5 h-5" />
        </div>
        <p className="text-gray-400 overflow-hidden truncate">
          {task.description}
        </p>
      </div>
      <div className="w-5 h-5">
        <UserCircleIcon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string }) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const TaskForm = ({ onAddTask, setIsOpen }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
    setIsOpen(false);
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
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
      <div className="w-11/12 md:w-2/3 lg:w-1/2 lg overflow-y-auto bg-gray-950 shadow-2xl">
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
