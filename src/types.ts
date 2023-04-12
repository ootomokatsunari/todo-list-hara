import { types } from "util";

  type Priority = "high" | "middle" | "low";

  type Task = {
    id: number;
    title: string;
    checked: boolean;
    priority: 'high' | 'middle' | 'low';
    date: string;//追加
    deadline: string;
  };

interface CardProps {
  key: number;
  title: string;
  checked: boolean;
  onEdit: (newValue: string) => void;
  onChecked: () => void;
  onDelete: () => void;
  onOpenEditDialog: () => void;
}

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task;
  onEdit: (id: number, newValue: string) => void;
  priority: 'high' | 'middle' | 'low'; // 追加
}

export default Task 