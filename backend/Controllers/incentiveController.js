const Trade = require('../Models/trade');
const Model = require('../Models/model');

// Controller to get incentive history for a specific user
const getIncentiveHistory = async (req, res) => {
  try {
    const { addedBy } = req.query; // Get userId from query parameters
    const filter = addedBy ? { addedBy } : {}; // Apply filter if userId is provided

    const trades = await Trade.find(filter)
      .populate('model', 'name priceIncentive') // Populate model with incentive price
      .populate('customer', 'fullName'); // Populate customer details
    const incentiveHistory = trades.map(trade => ({
      tradeId: trade._id,
      customerName: trade.customer.fullName,
      device: trade.model.name,
      condition: trade.condition,
      quantity: trade.quantity,
      status: trade.status,
      incentiveEarned: trade.quantity * trade.model.priceIncentive, // Calculate incentive
      tradeDate: trade.tradeDate,
    }));

    res.status(200).json(incentiveHistory);
  } catch (error) {
    // console.error('Error fetching incentive history:', error);
    res.status(500).json({ error: 'Error fetching incentive history' });
  }
};

module.exports = { getIncentiveHistory };
