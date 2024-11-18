import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import TitleHeader from '../../TitleHeader';
import '../Layout/Pagination.css'; // Add a CSS file for pagination styling
import CountUp from 'react-countup';
const Incentive = () => {
  const [incentiveHistory, setIncentiveHistory] = useState([]);
  const [totalIncentive, setTotalIncentive] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Define the number of items per page

  // Get logged-in user ID from session storage
  const userId = sessionStorage.getItem('user');

  // Fetch incentive history from the backend
  useEffect(() => {
    const fetchIncentiveHistory = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/incentive/history`, {
          addedBy: userId
        });
        setIncentiveHistory(response.data);

        // Calculate total incentive earned
        const total = response.data.reduce((acc, entry) => acc + entry.incentiveEarned, 0);
        setTotalIncentive(total);
      } catch (error) {
        console.error('Error fetching incentive history:', error);
      }
    };

    fetchIncentiveHistory();
  }, [userId]);

  // Calculate the data to display for the current page
  const offset = currentPage * itemsPerPage;
  const currentData = incentiveHistory.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
       <TitleHeader heading="Sales Rep Incentives" />
      {/* Bootstrap Card for Total Incentive */}
      <div className="card text-white bg-primary mb-4 text-center">
        <div className="card-body">
          <h5 className="card-title">Total Incentives Earned</h5>
          <p className="card-text display-4">
            $
            <CountUp
              end={totalIncentive}
              duration={2.5}
              separator=","
              decimals={2}
              decimal="."
            />
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2>History</h2>
        {currentData.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Device</th>
                <th>Condition</th>
                <th>Quantity</th>
                <th>Incentive Earned</th>
                <th>Status</th>
                <th>Trade Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((entry, index) => (
                <tr key={entry.tradeId}>
                  <td>{offset + index + 1}</td>
                  <td>{entry.customerName}</td>
                  <td>{entry.device}</td>
                  <td>{entry.condition}</td>
                  <td>{entry.quantity}</td>
                  <td>${entry.incentiveEarned.toFixed(2)}</td>
                  <td>
                    {entry.status === 'approved'
                      ? 'Received'
                      : entry.status === 'rejected'
                      ? 'Rejected'
                      : 'Under Review'}
                  </td>
                  <td>{new Date(entry.tradeDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No incentive history available.</p>
        )}

        {/* Pagination Controls */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(incentiveHistory.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={'pagination justify-content-center mt-4'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          disabledClassName={'disabled'}
          forcePage={currentPage} // Keep the current page in sync
        />
      </div>
    </>
  );
};

export default Incentive;
