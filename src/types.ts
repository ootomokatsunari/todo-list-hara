export interface Task {
    id: number;
    title: string;
    checked: boolean;
    priority: 'high' | 'middle' | 'low'; 
  }
  type Priority = "high" | "middle" | "low";

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

