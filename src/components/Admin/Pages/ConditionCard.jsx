// ConditionCard.jsx
import React from 'react';

const ConditionCard = ({ title, price, items, badgeColor, badgeSymbol }) => {
  return (
    <div className="col-12 col-md-4">
      <div className="card h-100 p-3  d-flex flex-column">
        <h4 className="mb-3 "><strong>{title}: ${price}</strong></h4>
          {items && items.length > 0 && 
              items.map((item, index) => (
                <p key={index} className="text-left p-2 mt-2 d-flex align-items-center">
                  <span className={`badge ${badgeColor} me-3 align-self-center`}>{badgeSymbol}</span>
                  <span>{item}</span>
                </p>

              ))
          }
      </div>
    </div>
  );
};

export default ConditionCard;
