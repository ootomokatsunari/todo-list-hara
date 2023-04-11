import React, { useState } from 'react';
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

const Card = ({ title, checked,priority,  onDelete,onOpenEditDialog}: CardProps) => {

  return (
    <div className="card">
  <div className="cardContent">
    <div className="cardTitle">
      <div className=""/>
        <div>{title}</div>
       </div>
    <div className="cardPriority">
          <span>優先度: </span>
          <span>{priority}</span>
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
  </div>
  );};

export default Card;
