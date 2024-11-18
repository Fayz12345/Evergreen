import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TitleHeader from '../../TitleHeader';
import ReactPaginate from 'react-paginate';
import { Tab, Nav } from 'react-bootstrap';
const TradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [batches, setBatches] = useState([]); // State for batch data
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [tempSearchQuery, setTempSearchQuery] = useState(''); // Temporary search query for input
  const [searchQuery, setSearchQuery] = useState(''); // Applied search query for filtering
  const tradesPerPage = 10;

  // Get logged-in user ID from session storage
  const userId = JSON.parse(sessionStorage.getItem('user'))._id;

  const fetchTradeHistory = useCallback(async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/trade/listByUser`, {
        addedBy: userId
      });
      setTradeHistory(response.data);
      calculateReports(response.data);
    } catch (error) {
      console.error('Error fetching trade history:', error);
    }
  }, [userId]);

  const calculateReports = (history) => {
    const total = history.reduce((acc, entry) => acc + entry.quantity, 0);
    const statusSummary = history.reduce(
      (acc, entry) => {
        acc[entry.status] = (acc[entry.status] || 0) + 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0 }
    );

    setTotalDevices(total);
    setStatusCounts(statusSummary);
  };

    // Fetch batch data
    const fetchBatches = useCallback(async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/batches/${userId}`);
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batch data:', error);
      }
    }, []);

  useEffect(() => {
    if (userId) {
      fetchTradeHistory();
    }
    fetchBatches(); // Fetch batches data when component loads
  }, [userId, fetchTradeHistory, fetchBatches]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * tradesPerPage;
  
  // Function to filter trades based on the search query across all fields
  const filteredTrades = tradeHistory.filter((entry) => {
    const query = searchQuery.toLowerCase();

    return (
      (entry.customer?.fullName || '').toLowerCase().includes(query) ||
      (entry.model?.manufacturer?.name || '').toLowerCase().includes(query) ||
      (entry.model?.name || '').toLowerCase().includes(query) ||
      (entry.model?.memory?.size || '').toLowerCase().includes(query) ||
      (entry.quantity || '').toString().includes(query) ||
      (entry.status || '').toLowerCase().includes(query) ||
      (entry.batchNo || '').toLowerCase().includes(query) ||
      (new Date(entry.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) || '').toLowerCase().includes(query)
    );
  });

  const currentTrades = filteredTrades.slice(offset, offset + tradesPerPage);

  // Apply the search query when "Search" button is clicked
  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(0); // Reset to first page on new search
  };

  // Clear the search query when "Clear" button is clicked
  const handleClearSearch = () => {
    setTempSearchQuery('');
    setSearchQuery('');
    setCurrentPage(0); // Reset to first page
  };

  const handleDownload = async (batchId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/download-batch/${batchId}`, {
        responseType: 'blob', // Important for binary response
      });
  
      // Create a URL for the CSV file and download it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `batch_${batchId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV.');
    }
  };
  

  return (
    <>
      <TitleHeader heading="Trade History" />

    {/* Report Summary */}
    <div className="row">
                <div className="col-md-3 mb-2">
                  <div className="card text-white bg-primary shadow">
                    <div className="card-body">
                      <h5 className="card-title">Total</h5>
                      <p className="card-text">{totalDevices}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card text-white bg-warning shadow">
                    <div className="card-body">
                      <h5 className="card-title">Pending</h5>
                      <p className="card-text">{statusCounts.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card text-white bg-success shadow">
                    <div className="card-body">
                      <h5 className="card-title">Approved</h5>
                      <p className="card-text">{statusCounts.approved}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card text-white bg-danger shadow">
                    <div className="card-body">
                      <h5 className="card-title">Rejected</h5>
                      <p className="card-text">{statusCounts.rejected}</p>
                    </div>
                  </div>
                </div>
              </div>

        <Tab.Container defaultActiveKey="trades">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="trades">Trade</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="batch">Batch</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Trade History Tab */}
            <Tab.Pane eventKey="trades">
              
                

              {/* Trade History Table */}
              <div className="mt-4">

                {/* Search Input and Buttons */}
                <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search in all fields"
                  value={tempSearchQuery}
                  onChange={(e) => setTempSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary" onClick={handleClearSearch}>Clear</button>
              </div>

                {currentTrades.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Manufacturer</th>
                        <th>Device</th>
                        <th>Memory</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Trade In Date</th>
                        <th>isBatch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTrades.map((entry, index) => (
                        <tr key={entry._id}>
                          <td>{offset + index + 1}</td>
                          <td>{entry.customer?.fullName || 'N/A'}</td>
                          <td>{entry.model?.manufacturer?.name || 'N/A'}</td> {/* Manufacturer */}
                          <td>{entry.model?.name || 'N/A'}</td>
                          <td>{entry.model?.memory?.size || 'N/A'}</td> {/* Memory size */}
                          <td>{entry.quantity}</td>
                          <td>
                            {entry.condition === 'working'
                              ? entry.priceWorking
                              : entry.condition === 'defective'
                              ? entry.priceDamaged
                              : entry.priceRecycle}
                          </td>
                          <td>{entry.status}</td>
                          <td>{new Date(entry.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                          </td>
                          <td>{entry.batchNo ? '✓' : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No trade-in history available.</p>
                )}

                {/* Pagination Controls */}
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  pageCount={Math.ceil(filteredTrades.length / tradesPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination justify-content-center mt-4'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  activeClassName={'active'}
                  disabledClassName={'disabled'}
                />
              </div>
            </Tab.Pane>

            {/* batches History Tab */}
            <Tab.Pane eventKey="batch">
            <h3>Batch Upload History</h3>
              <div className="mt-4">
                {batches.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Batch Number</th>
                        <th>Customer Name</th>
                        <th>Added By</th>
                        <th>File Name</th>
                        <th>Date Uploaded</th>

                         <th>Download</th> {/* New column for download button */}
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((batch, index) => (
                        <tr key={batch._id}>
                          <td>{index + 1}</td>
                          <td>{batch.batchNumber}</td>
                          <td>{batch.customerId?.fullName || 'N/A'}</td>
                          <td>{batch.addedBy?.fullName || 'N/A'}</td>
                          <td>{batch.fileName || 'N/A'}</td>
                          <td>{new Date(batch.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleDownload(batch._id)}
                            >
                              Download CSV
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No batch upload history available.</p>
                )}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

    
    </>
  );
};

export default TradeHistory;
