// src/components/Incentive.jsx
import React, { useState, useEffect } from 'react';
import TitleHeader from '../../TitleHeader';

// Helper function to load data from localStorage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const Incentive = () => {
  const [tradeInHistory] = useState(loadFromLocalStorage('tradeInHistory'));
  const [totalIncentive, setTotalIncentive] = useState(0);

  // Calculate total incentive on component mount or when history changes
  useEffect(() => {
    const incentive = tradeInHistory.reduce((acc, entry) => acc + entry.quantity * 100, 0);
    setTotalIncentive(incentive);
  }, [tradeInHistory]);

  // const clearIncentives = () => {
  //   setTradeInHistory([]);
  //   localStorage.removeItem('tradeInHistory');
  //   setTotalIncentive(0);
  // };

  return (
    <>
      
          <TitleHeader heading="Sales Rep Incentives" />



            <div className="mb-4">
              <h2>Total Incentive Earned: ${totalIncentive}</h2>
           
            </div>

            <div className="mt-4">
              <h2>History</h2>
              {tradeInHistory.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Device</th>
                      <th>Condition</th>
                      <th>Quantity</th>
                      <th>Incentive Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeInHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.device}</td>
                        <td>{entry.condition}</td>
                        <td>{entry.quantity}</td>
                        <td>${entry.quantity * 100}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No trade-in history available.</p>
              )}
            </div>

            {/* <button className="btn btn-danger mt-3" onClick={clearIncentives}>
              Clear Incentives
            </button> */}
    
      
    </>
  );
};

export default Incentive;
