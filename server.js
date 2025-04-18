const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true })); // Built-in middleware for body parsing
app.use(express.json()); // Built-in middleware to handle JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files
app.use(express.static(path.join(__dirname, 'uploads'))); // Serving uploaded images (if applicable)

// Session handling
app.use(session({
  secret: 'autonest-secret-key', // session secret (change it for production)
  resave: false,
  saveUninitialized: false
}));

// Setting the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Default route (Redirect to login)
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Load routes from the authRoutes module
app.use(authRoutes);

// Error handling for routes that don't match
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
