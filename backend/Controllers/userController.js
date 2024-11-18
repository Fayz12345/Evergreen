const User = require('../Models/userModel'); // Import User model
const { encrypt, decrypt } = require('../utils/encryption'); // Import encryption functions
const bcrypt = require('bcrypt');
// Fetch all users (encrypting their IDs)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'customer' } }).select('-password'); 
    const usersWithAvatar = users.map((user) => ({
      ...user._doc,
      // _id: encrypt(user._id.toString()), // Encrypt user ID
      avatar: user.avatar ? user.avatar.toString('base64') : '', // Convert Buffer to Base64
    }));
    res.json(usersWithAvatar);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Fetch all customers (users with role 'customer' with encrypted IDs)
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password'); 
    const customersWithAvatar = customers.map((customer) => ({
      ...customer._doc,
      _id: encrypt(customer._id.toString()), // Encrypt customer ID
      avatar: customer.avatar ? customer.avatar.toString('base64') : '',
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
    res.json(customersWithAvatar);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

const getCustomersById = async (req, res) => {
  try {
    const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    const customer = await User.findById(decryptedId).select('-password'); 

    if (!customer || customer.role !== 'customer') {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Prepare the customer data with encrypted ID if necessary
    const customerWithAvatar = {
      ...customer._doc,
      _id: encrypt(customer._id.toString()), // Encrypt customer ID
      avatar: customer.avatar ? customer.avatar.toString('base64') : '',
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };

    res.json(customerWithAvatar);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ message: 'Error fetching customer', error });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { fullName, address, email, username = email, role = 'User', avatar, password = '123456' } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name, address, and email are required' });
  }

  try {
     // Encrypt the password
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, address, email, username, role, avatar, password: hashedPassword, });
    const savedUser = await newUser.save();
    res.status(201).json({
      ...savedUser._doc,
      _id: encrypt(savedUser._id.toString()), // Encrypt saved user ID
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Add a new customer
const addCustomer = async (req, res) => {
  const { fullName, address, email, role, username, password } = req.body;

  try {

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new User({
      fullName,
      address,
      email,
      role,
      username,
      password: hashedPassword,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json({
      ...savedCustomer._doc,
      _id: encrypt(savedCustomer._id.toString()), // Encrypt customer ID
    });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Error adding customer', error });
  }
};

// Login user (without JWT)
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (user.disabled) {
      return res.status(401).json({ message: 'Your account has been disabled!!' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Determine the redirection path based on role
    const redirectPath = user.role === 'customer' ? '/tradein' : '/admin/';
    res.status(200).json({
      message: 'Login successful',
      redirectPath,
      status: 200,
      user: {
        ...user._doc,
        _id: encrypt(user._id.toString()), // Encrypt user ID for response
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Update customer by encrypted ID
const updateCustomer = async (req, res) => {
  try {
    // const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    const decryptedId = req.params.id; // Decrypt the encrypted ID

    const updatedCustomer = await User.findByIdAndUpdate(decryptedId, req.body, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({
      ...updatedCustomer._doc,
      _id: encrypt(updatedCustomer._id.toString()), // Encrypt updated customer ID
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Error updating customer', error });
  }
};
// Update customer by encrypted ID
const updateCustomersById = async (req, res) => {
  try {
    const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID

    const updatedCustomer = await User.findByIdAndUpdate(decryptedId, req.body, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({
      ...updatedCustomer._doc,
      _id: encrypt(updatedCustomer._id.toString()), // Encrypt updated customer ID
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Error updating customer', error });
  }
};
const toggleUserDisable = async (req, res) => {
  console.log(req.params.id);
  try {

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.disabled = !user.disabled; // Toggle disable status
    await user.save();
    res.status(200).json({ message: "User status updated", disabled: user.disabled });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Error updating user status", error });
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
        const user = await User.findOne({ email });
        res.json({ isUnique: !user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = { getUsers, getCustomers, loginUser, addUser, addCustomer, updateCustomer, toggleUserDisable, getCustomersById,  updateCustomersById, checkEmail};
