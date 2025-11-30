"use client";

import { useEffect, useRef } from "react";

interface EditTodoProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  onTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export default function EditTodo({
  isOpen,
  onClose,
  id,
  title,
  description,
  onTitle,
  onDescription,
  onSubmit,
}: EditTodoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" id={id} onClose={onClose}>
      <div className="modal-content">
        <h2 className="modal-title">Edit Task</h2>

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

          <button
            className="btn-primary"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
