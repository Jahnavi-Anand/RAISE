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


//Info page
app.get('/info', (req, res) => {
  res.render('info'); // renders views/info.ejs
});

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
      stage: 'Growth',
      sector: 'Energy',
      city: 'Pune',
      valuation: '₹120 Cr',
      funding_percent: 60,
      min_investment: '₹10,000'
    },
    {
      id: 3,
      logo: '/img/slogo.jpeg',
      name: 'FinFlow Finance',
      description: 'A seamless, compliance-first digital lending platform.',
      stage: 'Pre-Seed',
      sector: 'FinTech',
      city: 'Mumbai',
      valuation: '₹25 Cr',
      funding_percent: 40,
      min_investment: '₹5,000'
    },
    {
      id: 4,
      logo: '/img/slogo.jpeg',
      name: 'HealthConnect 360',
      description: 'Remote patient monitoring and virtual care using IoT.',
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
      id: 6,
      logo: '/img/slogo.jpeg',
      name: 'RetailLoop Commerce',
      description: 'Omnichannel SaaS stack for small and mid-sized retailers.',
      stage: 'Expansion',
      sector: 'Retail',
      city: 'Chennai',
      valuation: '₹90 Cr',
      funding_percent: 55,
      min_investment: '₹20,000'
    },
    {
      id: 7,
      logo: '/img/slogo.jpeg',
      name: 'UrbanGrid Mobility',
      description: 'Shared EV infrastructure for last-mile logistics.',
      stage: 'Mature',
      sector: 'Technology',
      city: 'Gurugram',
      valuation: '₹300 Cr',
      funding_percent: 92,
      min_investment: '₹1,50,000'
    },
    {
      id: 8,
      logo: '/img/slogo.jpeg',
      name: 'MedSure Diagnostics',
      description: 'Affordable point-of-care diagnostic devices for Tier-2 cities.',
      stage: 'Seed',
      sector: 'Health',
      city: 'Jaipur',
      valuation: '₹35 Cr',
      funding_percent: 48,
      min_investment: '₹25,000'
    },
    {
      id: 9,
      logo: '/img/slogo.jpeg',
      name: 'CampusCloud Learning',
      description: 'Cloud-first LMS tailored for Indian universities.',
      stage: 'Growth',
      sector: 'Education',
      city: 'Ahmedabad',
      valuation: '₹110 Cr',
      funding_percent: 76,
      min_investment: '₹30,000'
    },
    {
      id: 10,
      logo: '/img/slogo.jpeg',
      name: 'RuPayRidge Fintech',
      description: 'Embedded finance rails for D2C brands and marketplaces.',
      stage: 'Early',
      sector: 'FinTech',
      city: 'Bangalore',
      valuation: '₹95 Cr',
      funding_percent: 63,
      min_investment: '₹40,000'
    }
  ];

  res.render('startup', { title: 'Startups - RAISE', startups });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
