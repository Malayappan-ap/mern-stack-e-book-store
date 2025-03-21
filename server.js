const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const dotenv = require('dotenv');
const User = require('./models/User'); // Ensure correct path to User model
const Book = require('./models/Book'); // Ensure correct path to Book model

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
    seedDatabase(); // Seed the database when connected
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Seed database function
const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // Clear the existing books in the database

    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream and the lost generation.",
        price: 20,
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
      },
      {
        title: "Becoming",
        author: "Michelle Obama",
        genre: "Non-Fiction",
        description: "A memoir by the former First Lady of the United States, Michelle Obama.",
        price: 15,
        image: "https://m.media-amazon.com/images/I/81KGjsBXQ7L._AC_UF1000,1000_QL80_.jpg",
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "History",
        description: "An exploration of human history from the Stone Age to modern times.",
        price: 25,
        image: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian society controlled by a totalitarian regime.",
        price: 18,
        image: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        description: "A guide to breaking bad habits and building good ones, one step at a time.",
        price: 22,
        image: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "A classic fantasy novel about a hobbit's journey to reclaim treasure.",
        price: 19,
        image: "https://m.media-amazon.com/images/I/71jKeGU9nKL._AC_UF1000,1000_QL80_.jpg",
      },
      {
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        genre: "Non-Fiction",
        description: "The story of Henrietta Lacks and how her cells contributed to science.",
        price: 17,
        image: "https://m.media-amazon.com/images/I/81MVJ9RAYFL._AC_UF1000,1000_QL80_.jpg",
      },
      {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        description: "A memoir of a woman who grows up in a strict and abusive household but escapes to find an education.",
        price: 20,
        image: "https://m.media-amazon.com/images/I/71-4MkLN5jL._AC_UF350,350_QL50_.jpg",
      }
    ];

    await Book.insertMany(books);
    console.log("Database seeded successfully with new books");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// User Registration Route
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Login API route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Fetch all books API route
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
