import React, { useState,useEffect } from 'react';
import './Dialog.css';
import './Card'
import Button from './Button'

type EditDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: { id: number; title: string; priority: 'high' | 'middle' | 'low' };
  onEdit: (id: number, newValue: string, newPriority: 'high' | 'middle' | 'low') => void;
  deadline:string;
};



const EditDialog = ({ isOpen, onClose, selectedTask, onEdit,deadline }: EditDialogProps) => {
  const [inputValue, setInputValue] = useState(selectedTask.title);
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const isDeadlinePassed = deadlineDate.getFullYear() === today.getFullYear() &&
  deadlineDate.getMonth() === today.getMonth() &&
  deadlineDate.getDate() === today.getDate() - 1;


  useEffect(() => {
    setInputValue(selectedTask.title);
  }, [selectedTask]);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(selectedTask.id, inputValue, selectedTask.priority); // 新しいタイトルと優先度を渡す
    onClose();
  };
  const priorityClass =
  selectedTask.priority === 'high' ? 'priority-high' :
  selectedTask.priority === 'middle' ? 'priority-middle' :
  'priority-low';
  

  return (
    <>
      {isOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <div className="dialog-header">
              <h3>タスク修正</h3>
              {/* <button className="close-button" onClick={onClose}>
                X
              </button> */}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">タスク名</label>
                <input
                  type="text"
                  id="title"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              <div className="form-group">
              <label htmlFor="priority">優先度</label>
               <div>{selectedTask.priority}</div>
               <span className={`deadline-date ${isDeadlinePassed ? "isDeadlinePassed" : ""}`}>
               期限{deadline}</span>
              </div>
              </div>
              <div className="dialog-footer">
              <Button type="button" className="close-button" onClick={onClose}>
              閉じる
              </Button>
              <Button type="submit" className="submit-button" onClick={() => {}}>
               更新
              </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDialog;
