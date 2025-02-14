"use client";

import { useState } from "react";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
};

type NoteListProps = {
  notes: Note[];
  onSelectNote: (note: Note) => void;
};

type NoteDetailProps = {
  note: Note;
  onDeleteNote: (noteId: string) => void;
  onPinNote: (noteId: string) => void;
};

type NoteFormProps = {
  onAddNote: (note: { title: string; content: string }) => void;
};

export default function Week10() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddNote = (newNote: { title: string; content: string }) => {
    const noteWithId: Note = {
      ...newNote,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString(),
      pinned: false,
    };
    setNotes([...notes, noteWithId]);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    setSelectedNote(null);
  };

  const handlePinNote = (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );

    setSelectedNote((prevSelected) =>
      prevSelected && prevSelected.id === noteId
        ? { ...prevSelected, pinned: !prevSelected.pinned }
        : prevSelected
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <h1>Notes App</h1>
      <div className="w-2/3 h-[60vh] mx-auto flex bg-gray-50 rounded">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 rounded-l bg-gray-100 text-gray-800 shadow-md ${
            isSidebarOpen ? "w-1/3 p-4" : "w-0"
          } overflow-hidden flex flex-col`}
        >
          <h2 className="text-lg font-bold mb-4">Your Notes</h2>
          {notes.length > 0 ? (
            <NoteList notes={notes} onSelectNote={handleSelectNote} />
          ) : (
            <p className="text-gray-500 text-center">
              You haven't added any notes yet.
            </p>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="bg-gray-100 text-background p-2 rounded-r hover:bg-gray-200 transition-transform duration-300"
        >
          <ChevronRightIcon
            className={`w-6 h-6 transform ${isSidebarOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex-1 flex flex-col justify-between p-6 relative">
          {selectedNote ? (
            <NoteDetail
              note={selectedNote}
              onDeleteNote={handleDeleteNote}
              onPinNote={handlePinNote}
            />
          ) : (
            <NoteForm onAddNote={handleAddNote} />
          )}

          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => setSelectedNote(null)}
              className="flex items-center justify-center bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-all"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const NoteList = ({ notes, onSelectNote }: NoteListProps) => {
  const pinnedNotes = notes
    .filter((note) => note.pinned)
    .slice()
    .reverse();
  const unpinnedNotes = notes
    .filter((note) => !note.pinned)
    .slice()
    .reverse();

  return (
    <div className="font-semibold space-y-2 overflow-y-auto max-h-[60vh]">
      {pinnedNotes.length > 0 && (
        <>
          <h3 className="font-bold text-gray-700">Pinned notes</h3>
          <ul>
            {pinnedNotes.map((note) => (
              <NoteItem key={note.id} note={note} onSelectNote={onSelectNote} />
            ))}
          </ul>
        </>
      )}

      {unpinnedNotes.length > 0 && (
        <>
          <h3 className="font-bold text-gray-700 mt-4">Notes</h3>
          <ul>
            {unpinnedNotes.map((note) => (
              <NoteItem key={note.id} note={note} onSelectNote={onSelectNote} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const NoteItem = ({
  note,
  onSelectNote,
}: {
  note: Note;
  onSelectNote: (note: Note) => void;
}) => (
  <li
    onClick={() => onSelectNote(note)}
    className="cursor-pointer my-3 p-3 bg-yellow-200 shadow-md hover:bg-yellow-300 rounded-lg transition"
  >
    <p className="truncate font-bold text-gray-900">{note.title}</p>
    <p className="truncate text-sm text-gray-700">{note.content}</p>
  </li>
);

const NoteDetail = ({ note, onDeleteNote, onPinNote }: NoteDetailProps) => {
  return (
    <div className="flex flex-col space-y-2 px-4 py-2 text-background bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-start mt-4">
        <h2 className="text-2xl font-semibold">{note.title}</h2>
        <button
          className="hover:bg-zinc-100 rounded-full p-2"
          onClick={() => onPinNote(note.id)}
        >
          <svg
            fill={note.pinned ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path d="m3 21 4.63-4.631m.005-.005-2.78-2.78c-.954-.953.006-2.996 1.31-3.078 1.178-.075 3.905.352 4.812-.555l2.49-2.49c.617-.618.225-2 .185-2.762-.058-1.016 1.558-2.271 2.415-1.414l4.647 4.648c.86.858-.4 2.469-1.413 2.415-.762-.04-2.145-.432-2.763.185l-2.49 2.49c-.906.907-.48 3.633-.554 4.811-.082 1.305-2.125 2.265-3.08 1.31z" />
          </svg>
        </button>
      </div>

      <p>{note.content}</p>
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500">Created on: {note.createdAt}</p>
        <div className="flex gap-2">
          <button
            className="text-red-600 rounded hover:text-red-700 p-2"
            onClick={() => onDeleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const NoteForm = ({ onAddNote }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Add Note
      </button>
    </form>
  );
};
