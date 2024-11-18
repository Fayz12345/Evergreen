const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from the React frontend
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://amanpreet:cgZ99MAYbBbGXGfV@tradein.50xjv.mongodb.net/Tradein')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Sample route to fetch data
const UserSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  avatar: String,
  password: String,
});

const User = mongoose.model('Users', UserSchema);

app.get('/api/Users', async (req, res) => {
  try {
    const users = await User.find();
    const usersWithAvatar = users.map((user) => ({
      ...user._doc,
      avatar: user.avatar ? user.avatar.toString('base64') : '', // Convert Buffer to Base64
    }));
    res.json(usersWithAvatar);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

