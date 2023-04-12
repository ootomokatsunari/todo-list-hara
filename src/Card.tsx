import './Card.css';

type CardProps = {
  title: string;
  checked: boolean;
  priority: 'high' | 'middle' | 'low';
  date: string; // 追加
  deadline: string; // 追加
  onDelete: () => void;
  onOpenEditDialog: () => void;
  isBeforeDeadline: boolean;
};


const Card = ({ title, checked,priority, deadline, onDelete,onOpenEditDialog}: CardProps) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const isDeadlinePassed = deadlineDate.getFullYear() === today.getFullYear() &&
  deadlineDate.getMonth() === today.getMonth() &&
  deadlineDate.getDate() === today.getDate() - 1;

  return (
    <div className="card">
  <div className="cardContent">
    <div className="cardTitle">
        <div>{title}</div>
       </div>
       </div>
    <div className="cardPriority">
          <span>優先度: </span>
          <span>{priority}</span>
          <span className={`deadline-date ${isDeadlinePassed ? "isDeadlinePassed" : ""}`}>
        期限{deadline}
        </span>
        </div>
    <div className="cardEdit">
      <button onClick={onOpenEditDialog} className="cardEditButton">
        編集
      </button>
      <button onClick={onDelete} className="cardDeleteButton">
        削除
      </button>
    </div>
  </div>
  );};

export default Card;
