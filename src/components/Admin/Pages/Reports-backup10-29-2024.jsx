
  import React, { useEffect, useState } from 'react';
import TitleHeader from '../../TitleHeader';

// Helper function to load trade history from local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('tradeInHistory');
  return data ? JSON.parse(data) : [];
};

const Reports = () => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [statusCounts, setStatusCounts] = useState({ Pending: 0, Approved: 0, Rejected: 0 });

  useEffect(() => {
    const history = loadFromLocalStorage();
    setTradeHistory(history);
    calculateReports(history);
  }, []);

  // Calculate total devices and status counts
  const calculateReports = (history) => {
    const total = history.reduce((acc, entry) => acc + entry.quantity, 0);
    const statusSummary = history.reduce(
      (acc, entry) => {
        acc[entry.status] = (acc[entry.status] || 0) + 1;
        return acc;
      },
      { Pending: 0, Approved: 0, Rejected: 0 }
    );

    setTotalDevices(total);
    setStatusCounts(statusSummary);
  };

  return (
 <>
          <TitleHeader heading="Reports" />

      
            {/* Report Summary */}
            <div className="row">
              <div className="col-md-3 mb-2">
                <div className="card text-white bg-primary shadow">
                  <div className="card-body">
                    <h5 className="card-title">Total Devices</h5>
                    <p className="card-text">{totalDevices}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card text-white bg-warning shadow">
                  <div className="card-body">
                    <h5 className="card-title">Pending Trades</h5>
                    <p className="card-text">{statusCounts.Pending}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card text-white bg-success shadow">
                  <div className="card-body">
                    <h5 className="card-title">Approved Trades</h5>
                    <p className="card-text">{statusCounts.Approved}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card text-white bg-danger shadow">
                  <div className="card-body">
                    <h5 className="card-title">Rejected Trades</h5>
                    <p className="card-text">{statusCounts.Rejected}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade History Table */}
            <div className="mt-4">
              <h2>History</h2>
              {tradeHistory.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Device</th>
                      <th>Quantity</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.device}</td>
                        <td>{entry.quantity}</td>
                        <td>${entry.value}</td>
                        <td>{entry.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No trade-in history available.</p>
              )}
            </div>
    
    </>

  );
};

export default Reports;
