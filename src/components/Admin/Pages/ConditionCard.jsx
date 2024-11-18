// ConditionCard.jsx
import React from 'react';

const ConditionCard = ({ title, price, items, badgeColor, badgeSymbol }) => {
  return (
    <div className="col-12 col-md-4">
      <div className="card h-100 p-3 text-primary d-flex flex-column">
        <h4><strong>{title}: ${price}</strong></h4>

        {items && items.length > 0 && (
          <ul className="list-group text-left">
            {items.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <span className={`badge ${badgeColor} me-3`}>{badgeSymbol}</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConditionCard;
