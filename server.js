require('dotenv').config();  // To load environment variables from .env
const express = require('express');  // Express web framework
const cors = require('cors');  // Cross-Origin Resource Sharing (CORS)
const multer = require('multer');
const path = require('path');
const sequelize = require('./config/database');  // Database connection
const Furniture = require('./models/Furniture');  // Import the Furniture model

const app = express();
// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json({ limit: '100mb' }));  
app.use(express.urlencoded({ limit: '100mb', extended: true }));  
app.use('/uploads', express.static('uploads'));


// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });





const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.get('/api/test', (req, res) => {
  res.send("Server is running and this route works!");
});

app.use('/uploads', express.static('uploads'));


app.post('/api/uploads', upload.single('image'), async (req, res) => {
  console.log("Received request: ", req.body); 
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.originalname}`;

    const furniture = await Furniture.create({
      name: req.body.name,
      designer: req.body.designer,
      price: req.body.price,
      details: req.body.details,
      imageUrl: imageUrl,
    });

    res.status(201).json(furniture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  (sequelize.sync({ alter: true }))
});




// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});



app.use('/uploads', express.static('uploads'));




// Create Furniture Route
app.post('/api/furniture', async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).json(furniture);  // Send the created furniture as response
  } catch (err) {
    res.status(400).json({ error: err.message });  // Handle any errors
  }
});




// Get All Furniture Route (Corrected)
app.get('/api/furnitures', async (req, res) => {
  try {
    const furnitures = await Furniture.findAll();  // Query the correct model
    res.json(furnitures);  // Send the furnitures as response
  } catch (err) {
    res.status(400).json({ error: err.message });  // Handle any errors
  }
});




app.put('/api/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }   
     await furniture.update(req.body);
    res.json(furniture);  // Send back the updated furniture
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.delete('/api/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }

    // Delete the furniture item
    await furniture.destroy();
    res.status(204).send();  // No content
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// Sync the Database and Start the Server
sequelize.sync({ force: true }) // ✅ Updates the table structure if needed
  .then(() => {
    console.log("✅ Database synced successfully.");
    const PORT = process.env.PORT || 3000;  // Use port from .env or default to 3000
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
