const express = require('express');
const router = express.Router();
const { getUsers, getCustomers, addUser, loginUser, addCustomer, updateCustomer, toggleUserDisable, getCustomersById , updateCustomersById, checkEmail} = require('../Controllers/userController');

// Route to get all users
router.get('/users', getUsers);

// Route to get all customers
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);

// Route to add customers
router.post('/add-customers', addCustomer);
router.put('/updatecustomer/:id', updateCustomer);
router.put('/update/:id', updateCustomersById);
// Route to add a new user
router.post('/check-email', checkEmail);

// Route to login user
router.post('/login', loginUser);

router.put('/toggleUserDisable/:id', toggleUserDisable);


module.exports = router;
