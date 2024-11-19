// index.js
const express = require('express');

const path = require('path'); // Import the path module
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const manufacturerRoutes = require('./Routes/manufacturerRoutes');
const modelRoutes = require('./Routes/modelRoutes');
const deviceRoutes = require('./Routes/deviceRoutes');
const tradeRoutes = require('./Routes/tradeRoutes');
const memoryRoutes = require('./Routes/memoryRoutes');
const incentiveRoutes = require('./Routes/incentiveRoutes');
const batchRoutes = require('./Routes/batchRoutes');
const app = express();
const PORT = 5001;
// Serve static files from React build
app.use(express.static(path.join(__dirname, '../build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });


// Middleware
app.use(cors()); // Allow requests from the React frontend
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Connect to MongoDB
connectDB();

// API routes
app.use('/api', userRoutes);
app.use('/api', deviceRoutes);
app.use('/api', manufacturerRoutes);
app.use('/api', modelRoutes);
app.use('/api', memoryRoutes);
app.use('/api', tradeRoutes);
app.use('/api', incentiveRoutes);
app.use('/api', batchRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
