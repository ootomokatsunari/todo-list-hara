import React, { useState } from 'react';
import './Card.css';

type CardProps = {
  title: string;
  checked: boolean;
  onSave: (newValue: string) => void;
  onChecked: () => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({ title, checked, onSave, onChecked, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    onSave(editValue);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="card">
      <input
        type="text"
        value={editValue}
        onChange={handleEdit}
        className="card__input"
        disabled={checked}
      />
      <button onClick={onDelete} className="card__delete-button">
        削除
      </button>
      <button onClick={() => setShowModal(true)} className="card__edit-button">
        編集
      </button>
      {showModal && (
        <div className="card__modal">
          <div className="card__modal-content">
            <input type="text" value={editValue} onChange={handleEdit} />
            <button onClick={handleSave}>変更</button>
            <button onClick={handleModalClose}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
