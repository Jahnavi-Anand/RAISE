const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
  const startups = [
    // --- 8 Sample Startups ---
    {
      id: 1,
      logo: '/img/slogo.jpeg',
      name: 'QuantumSphere AI',
      description: 'Developing next-gen AI models for computational biology.',
      stage: 'Seed',
      sector: 'Technology',
      city: 'Bangalore',
      valuation: '₹80 Cr',
      funding_percent: 85,
      min_investment: '₹50,000'
    },
    {
      id: 2,
      logo: '/img/slogo.jpeg',
      name: 'GreenWave Energy',
      description: 'Sustainable solar solutions for industrial rooftops.',
      stage: 'Seed',
      sector: 'Energy',
      city: 'Pune',
      valuation: '₹40 Cr',
      funding_percent: 60,
      min_investment: '₹10,000'
    },
    {
      id: 3,
      logo: '/img/slogo.jpeg',
      name: 'FinFlow Finance',
      description: 'A seamless, decentralized lending platform.',
      stage: 'Pre-Seed',
      sector: 'FinTech',
      city: 'Mumbai',
      valuation: '₹25 Cr',
      funding_percent: 95,
      min_investment: '₹5,000'
    },
    {
      id: 4,
      logo: '/img/slogo.jpeg',
      name: 'HealthConnect 360',
      description: 'Remote patient monitoring system using IoT.',
      stage: 'Early',
      sector: 'Health',
      city: 'Delhi',
      valuation: '₹120 Cr',
      funding_percent: 70,
      min_investment: '₹75,000'
    },
    {
      id: 5,
      logo: '/img/slogo.jpeg',
      name: 'EduSpark Labs',
      description: 'Interactive learning tools powered by AR/VR.',
      stage: 'Seed',
      sector: 'Education',
      city: 'Hyderabad',
      valuation: '₹30 Cr',
      funding_percent: 88,
      min_investment: '₹15,000'
    },    
    {
      id: 8,
      logo: '/img/slogo.jpeg',
      name: 'DataForge Security',
      description: 'Zero-trust security solutions for cloud environments.',
      stage: 'Growth',
      sector: 'Technology',
      city: 'Bangalore',
      valuation: '₹200 Cr',
      funding_percent: 92,
      min_investment: '₹1,00,000'
    }
  ];
  res.render('landing', { title: 'Landing Page', startups });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - RAISE' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup - RAISE' });
});

app.get('/startup', (req, res) => {
  const startups = [
    {
      id: 1,
      logo: '/img/slogo.jpeg',
      name: 'QuantumSphere AI',
      description: 'Developing next-gen AI models for computational biology.',
      stage: 'Seed',
      sector: 'Technology',
      city: 'Bangalore',
      valuation: '₹80 Cr',
      funding_percent: 85,
      min_investment: '₹50,000'
    },
    {
      id: 2,
      logo: '/img/slogo.jpeg',
      name: 'GreenWave Energy',
      description: 'Sustainable solar solutions for industrial rooftops.',
      stage: 'Seed',
      sector: 'Energy',
      city: 'Pune',
      valuation: '₹40 Cr',
      funding_percent: 60,
      min_investment: '₹10,000'
    },
    {
      id: 3,
      logo: '/img/slogo.jpeg',
      name: 'FinFlow Finance',
      description: 'A seamless, decentralized lending platform.',
      stage: 'Pre-Seed',
      sector: 'FinTech',
      city: 'Mumbai',
      valuation: '₹25 Cr',
      funding_percent: 95,
      min_investment: '₹5,000'
    },
    {
      id: 4,
      logo: '/img/slogo.jpeg',
      name: 'HealthConnect 360',
      description: 'Remote patient monitoring system using IoT.',
      stage: 'Early',
      sector: 'Health',
      city: 'Delhi',
      valuation: '₹120 Cr',
      funding_percent: 70,
      min_investment: '₹75,000'
    },
    {
      id: 5,
      logo: '/img/slogo.jpeg',
      name: 'EduSpark Labs',
      description: 'Interactive learning tools powered by AR/VR.',
      stage: 'Seed',
      sector: 'Education',
      city: 'Hyderabad',
      valuation: '₹30 Cr',
      funding_percent: 88,
      min_investment: '₹15,000'
    },    
    {
      id: 8,
      logo: '/img/slogo.jpeg',
      name: 'DataForge Security',
      description: 'Zero-trust security solutions for cloud environments.',
      stage: 'Growth',
      sector: 'Technology',
      city: 'Bangalore',
      valuation: '₹200 Cr',
      funding_percent: 92,
      min_investment: '₹1,00,000'
    }
  ];
  res.render('startup', { title: 'Startups - RAISE', startups });
});



// MongoDB connection (replace with your actual connection string in .env)
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  //.then(() => console.log("MongoDB connected"))
  //.catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
