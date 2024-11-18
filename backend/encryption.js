const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // 32 chars
const IV_LENGTH = 16; // AES block size

// Helper functions for encryption and decryption
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// MongoDB setup (replace <db_uri> with your MongoDB URI)
mongoose.connect('<db_uri>', { useNewUrlParser: true, useUnifiedTopology: true });

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

// API Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  const encryptedItems = items.map(item => ({
    ...item.toObject(),
    id: encrypt(item._id.toString()), // Encrypt the ObjectId
  }));
  res.json(encryptedItems);
});

app.get('/items/:id', async (req, res) => {
  try {
    const decryptedId = decrypt(req.params.id); // Decrypt the ID from the request
    const item = await Item.findById(decryptedId);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (error) {
    res.status(400).send('Invalid ID');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
