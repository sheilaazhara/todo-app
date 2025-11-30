"use client";
import { useEffect, useRef } from "react";

interface DeleteTodoProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteTodo({
  isOpen,
  onClose,
  onDelete,
}: DeleteTodoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-content">
        <h2 className="modal-title">Delete Confirmation</h2>

        <p className="modal-text">Are you sure you want to delete this task?</p>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>

          <button onClick={onDelete} className="btn-primary">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}
