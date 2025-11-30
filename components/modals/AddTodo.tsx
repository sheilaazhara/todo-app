"use client";

import { useEffect, useRef } from "react";

interface AddTodoProps {
  id: string;
  title: string;
  description: string;
  onTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTodo({
  id,
  title,
  description,
  onTitle,
  onDescription,
  onSubmit,
  isOpen,
  onClose,
}: AddTodoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} id={id} className="modal" onClose={onClose}>
      <div className="modal-content">
        <h2 className="modal-title">Add Task</h2>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            value={title}
            onChange={onTitle}
            placeholder="Enter task title..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input textarea"
            value={description}
            onChange={onDescription}
            placeholder="Enter task description..."
          />
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
    </dialog>
  );
}
