import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col} from 'react-bootstrap';
import { Fade } from 'react-reveal'; // Import animation from react-reveal (Install via npm)

const TradeList = () => {
  const [tradeList, setTradeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const tradesPerPage = 10;

  // Get logged-in user ID from session storage
  const userId = JSON.parse(sessionStorage.getItem('user'))._id;

  const fetchTradeList = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/trade/listByCustomer/${userId}`);
      setTradeList(response.data);
    } catch (error) {
      console.error('Error fetching trade history:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchTradeList();
    }
  }, [userId, fetchTradeList]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * tradesPerPage;
  const currentTrades = tradeList.slice(offset, offset + tradesPerPage);

  return (
    <>
    
    <section className="slider text-white bg-dark py-5 mt-5">
                <Container>
                    <Row className="justify-content-center text-center mt-5">
                        <Col lg={9} md={12}>
                            <Fade top>
                                <h1 className="animated fadeInUp mb-3 mt-5 text-white">Trade History</h1>
                                {/* <p className="lead text-white mb-4">We’d love to hear from you!</p> */}
                               
                            </Fade>
                        </Col>
                    </Row>
                </Container>
            </section>
    

            <Container fluid="xl">
      <h2>History</h2>
      {currentTrades.length > 0 ? (
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Device</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTrades.map((entry, index) => (
              <tr key={entry._id}>
                <td>{offset + index + 1}</td>
                <td>{entry.model?.name || 'N/A'}</td>
                <td>{entry.quantity}</td>
                <td>
                  ${entry.condition === 'Working'
                    ? entry.priceWorking
                    : entry.condition === 'Defective'
                    ? entry.priceDamaged
                    : entry.priceRecycle}
                </td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trade history available.</p>
      )}

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(tradeList.length / tradesPerPage)}
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
    </Container>
    </>
  );
};

export default TradeList;
