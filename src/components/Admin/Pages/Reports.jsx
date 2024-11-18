import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleHeader from '../../TitleHeader';
import ReactPaginate from 'react-paginate';
import '../Layout/Pagination.css';
import '../Layout/Reports.css';
const Reports = () => {
  const [trades, setTrades] = useState([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const tradesPerPage = 10;

  // Filter states for each column
  const [customerFilter, setCustomerFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [memoryFilter, setMemoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [salesRepFilter, setSalesRepFilter] = useState('');
  const [tradeDateFilter, setTradeDateFilter] = useState('');
  const [quantityFilter, setQuantityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Fetch trades from the backend
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trade/list`);
        setTrades(response.data);
        calculateReports(response.data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };
    fetchTrades();
  }, []);


  // Clear all filters
  const clearFilters = () => {
    setCustomerFilter('');
    setModelFilter('');
    setMemoryFilter('');
    setConditionFilter('');
    setStatusFilter('');
    setSalesRepFilter('');
    setTradeDateFilter('');
    setQuantityFilter('');
    setPriceFilter('');
  };

  // Calculate total devices and status counts
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

  // Handle pagination
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Handle status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/trade/status/${id}`, { status });
      setTrades((prevTrades) =>
        prevTrades.map((trade) =>
          trade._id === id ? { ...trade, status } : trade
        )
      );
    } catch (error) {
      console.error('Error updating trade status:', error);
    }
  };

// Helper function to get the price based on condition
const getPriceByCondition = (trade) => {
  return trade.condition === 'Working'
    ? trade.priceWorking
    : trade.condition === 'Defective'
    ? trade.priceDamaged
    : trade.priceRecycle;
};
  // Filter the trades based on filter states
  const filteredTrades = trades.filter((trade) => {
    return (
      trade.customer?.fullName.toLowerCase().includes(customerFilter.toLowerCase()) &&
      trade.model?.name.toLowerCase().includes(modelFilter.toLowerCase()) &&
      trade.model?.memory?.size.toString().includes(memoryFilter) &&
      trade.condition.toLowerCase().includes(conditionFilter.toLowerCase()) &&
      (statusFilter === '' || trade.status === statusFilter) &&
      trade.addedBy?.fullName.toLowerCase().includes(salesRepFilter.toLowerCase()) &&
      (tradeDateFilter === '' || new Date(trade.tradeDate).toISOString().split('T')[0] === tradeDateFilter) &&
      (quantityFilter === '' || trade.quantity.toString().includes(quantityFilter)) &&
      (priceFilter === '' || getPriceByCondition(trade).toString().includes(priceFilter))
    );
  });


  const offset = currentPage * tradesPerPage;
  const currentTrades = filteredTrades.slice(offset, offset + tradesPerPage);




  return (
    <>
      <TitleHeader heading="Reports" />

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Total Devices</h5>
              <p className="card-text">{totalDevices}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Pending Trades</h5>
              <p className="card-text">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Approved Trades</h5>
              <p className="card-text">{statusCounts.approved}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger shadow">
            <div className="card-body">
              <h5 className="card-title">Rejected Trades</h5>
              <p className="card-text">{statusCounts.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trade History Table with Filters */}
      <div className="table-responsive mt-4">
      <table className="table table-striped text-left">
          <thead>
          <tr>
          <th className="text-left">#</th>
          <th className="text-left">Customer</th>
          <th className="text-left">Model</th>
          <th className="text-left">Memory</th>
          <th className="text-left">Condition</th>
          <th className="text-left">Quantity</th>
          <th className="text-left">Price</th>
          <th className="text-left">Status</th>
          <th className="text-left">Sales Rep</th>
          <th className="text-left">Trade In Date</th>
          </tr>
            <tr>
              <th className="text-center">
                <button className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear Filters</button>
              </th>
              <th className="text-center">
                <input
                  type="text"
                  placeholder="Filter in Customer"
                  className="form-control header-filter-input"
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                />
              </th>
              <th className="text-center">
                <input
                  type="text"
                  placeholder="Filter in Model"
                  className="form-control header-filter-input"
                  value={modelFilter}
                  onChange={(e) => setModelFilter(e.target.value)}
                />
              </th>
              <th className="text-center">
                <input
                  type="text"
                  placeholder="Filter in Memory"
                  className="form-control header-filter-input"
                  value={memoryFilter}
                  onChange={(e) => setMemoryFilter(e.target.value)}
                />
              </th>
              <th className="text-center">
                <input
                  type="text"
                  placeholder="Filter in Condition"
                  className="form-control header-filter-input"
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filter in Quantity"
                  className="form-control header-filter-input"
                  value={quantityFilter}
                  onChange={(e) => setQuantityFilter(e.target.value)}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filter in Price"
                  className="form-control header-filter-input"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                />
              </th>
              <th className="text-center">
                <select
                  className="form-control header-filter-input"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </th>
              <th className="text-center">
                <input
                  type="text"
                  placeholder="Filter in Sales Rep"
                  className="form-control header-filter-input"
                  value={salesRepFilter}
                  onChange={(e) => setSalesRepFilter(e.target.value)}
                />
              </th>
              <th className="text-center">
                <input
                  type="date"
                  placeholder="Trade Date (YYYY-MM-DD)" // Placeholder to guide the format
                  className="form-control header-filter-input"
                  value={tradeDateFilter}
                   pattern="\d{4}-\d{2}-\d{2}" // Matches YYYY-MM-DD format
                  title="Enter a date in the format YYYY-MM-DD"
                  onChange={(e) => setTradeDateFilter(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTrades.map((trade, index) => (
              <tr key={trade._id}>
                <td>{offset + index + 1}</td>
                <td>{trade.customer?.fullName || 'N/A'}</td>
                <td>{trade.model?.name || 'N/A'}</td>
                <td>{trade.model?.memory?.size || 'N/A'}</td>
                <td>{trade.condition}</td>
                <td>{trade.quantity}</td>
                <td>${getPriceByCondition(trade)}</td>
                <td>
                  {trade.status === 'approved' ? (
                    <span>Approved</span>
                  ) : (
                    <select
                      value={trade.status}
                      onChange={(e) => handleStatusUpdate(trade._id, e.target.value)}
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  )}
                </td>
                <td>{trade.addedBy?.fullName || 'N/A'}</td>
                <td>
                  {new Date(trade.tradeDate).toLocaleDateString('en-CA')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(filteredTrades.length / tradesPerPage)}
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
        forcePage={currentPage}
      />
    </>
  );
};

export default Reports;
