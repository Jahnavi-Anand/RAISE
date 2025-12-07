// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

dotenv.config();

const User = require('./models/User');

const app = express();

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (for dev: MemoryStore is OK; production => use Mongo store)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-session-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Make user available in all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// -------------------- MongoDB Connection --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('Mongo error:', err));

// -------------------- Auth Middleware --------------------
function ensureAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

function ensureRole(role) {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
}

// -------------------- Dummy data helpers --------------------
function getSampleStartups() {
  return [
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
      min_investment: '₹50,000',
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
      min_investment: '₹10,000',
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
      min_investment: '₹5,000',
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
      min_investment: '₹75,000',
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
      min_investment: '₹15,000',
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
      min_investment: '₹1,00,000',
    },
  ];
}

// -------------------- Routes --------------------

// Landing page (public)
app.get('/', (req, res) => {
  const startups = getSampleStartups();
  res.render('landing', { title: 'Landing Page', startups });
});

// Startups listing (public)
app.get('/startup', (req, res) => {
  const startups = getSampleStartups();
  res.render('startup', { title: 'Startups - RAISE', startups });
});

//Info page
app.get('/info', (req, res) => {
  res.render('info'); // renders views/info.ejs
});

// -------------------- Auth Pages (GET) --------------------
app.get('/login', (req, res) => {
  // optional: pass flash message via query (?error=...)
  res.render('login', {
    title: 'Login - RAISE',
    error: req.query.error || null,
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Signup - RAISE',
    error: req.query.error || null,
  });
});

// -------------------- Auth Actions (POST) --------------------

// Signup
// Expecting body: name, email, password, confirmPassword, role (startup | investor)
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.redirect('/signup?error=' + encodeURIComponent('All fields are required.'));
    }

    if (password !== confirmPassword) {
      return res.redirect('/signup?error=' + encodeURIComponent('Passwords do not match.'));
    }

    if (!['startup', 'investor'].includes(role)) {
      return res.redirect('/signup?error=' + encodeURIComponent('Invalid role selected.'));
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.redirect('/signup?error=' + encodeURIComponent('Email already registered.'));
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
    });

    // Store minimal data in session
    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Redirect to correct dashboard
    if (user.role === 'startup') {
      return res.redirect('/dashboard/startup');
    } else {
      return res.redirect('/dashboard/investor');
    }
  } catch (err) {
    console.error('Signup error:', err);
    return res.redirect('/signup?error=' + encodeURIComponent('Something went wrong. Try again.'));
  }
});

// Login
// Expecting body: email, password
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.redirect('/login?error=' + encodeURIComponent('Email and password required.'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/login?error=' + encodeURIComponent('Invalid credentials.'));
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.redirect('/login?error=' + encodeURIComponent('Invalid credentials.'));
    }

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (user.role === 'startup') {
      return res.redirect('/dashboard/startup');
    } else {
      return res.redirect('/dashboard/investor');
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.redirect('/login?error=' + encodeURIComponent('Something went wrong. Try again.'));
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// -------------------- Startup Dashboard --------------------
app.get('/dashboard/startup', ensureAuth, ensureRole('startup'), async (req, res) => {
  const user = req.session.user;

  // For now: dummy data; later you can fetch from Startup model
  const startup = {
    _id: user.id,
    name: user.name + ' Startup',
    founderName: user.name,
    profileCompletion: 72,
    totalRaised: 0,
    currentRound: 'Pre-Seed',
    targetAmount: 10000000,
    committedAmount: 3500000,
    minTicketSize: 500000,
    runwayMonths: 12,
  };

  const tasks = [
    { title: 'Send follow-up to 3 interested investors', due: 'Today', priority: 'High' },
    { title: 'Upload latest traction & metrics', due: 'Tomorrow', priority: 'Medium' },
    { title: 'Shortlist 10 more investors in your sector', due: 'This week', priority: 'Low' },
  ];

  const interestedInvestors = [
    { _id: 1, name: 'Ananya Capital', type: 'Micro VC', ticket: '₹25–50L', status: 'In discussion' },
    { _id: 2, name: 'Dev Singh', type: 'Angel', ticket: '₹10–15L', status: 'Requested deck' },
    { _id: 3, name: 'NorthBridge Ventures', type: 'VC', ticket: '₹50L–1Cr', status: 'Warm intro' },
    { _id: 4, name: 'Harbor Angels', type: 'Angel Network', ticket: '₹15–30L', status: 'Reviewing' },
  ];

  const activeIntrosCount = interestedInvestors.length;
  const lastActivity = 'Today';

  res.render('startup-dashboard', {
    title: 'Startup Dashboard',
    startup,
    tasks,
    interestedInvestors,
    activeIntrosCount,
    lastActivity,
  });
});

// -------------------- Investor Dashboard --------------------
app.get('/dashboard/investor', ensureAuth, ensureRole('investor'), async (req, res) => {
  const user = req.session.user;

  // Query params for filters
  const query = {
    search: req.query.search || '',
    stage: req.query.stage || '',
    sector: req.query.sector || '',
    location: req.query.location || '',
    ticket: req.query.ticket || '',
  };

  // For now: same static startups as listing; later filter in DB
  const allStartups = [
    {
      _id: 1,
      name: 'RuralPay',
      city: 'Indore',
      stage: 'Seed',
      sector: 'Fintech',
      ticket: '₹25–50L',
      brief: 'Financial infrastructure for rural Kirana stores.',
      traction: '₹30L monthly GMV • 800 merchants',
    },
    {
      _id: 2,
      name: 'BusRoute AI',
      city: 'Jaipur',
      stage: 'Pre-Seed',
      sector: 'Mobility',
      ticket: '₹10–25L',
      brief: 'AI-optimised bus routes for tier-2 cities.',
      traction: '3 city pilots • 15% cost reduction',
    },
    {
      _id: 3,
      name: 'HealthNest',
      city: 'Lucknow',
      stage: 'Seed',
      sector: 'HealthTech',
      ticket: '₹25–75L',
      brief: 'Digitising small clinics in tier-3 India.',
      traction: '120 clinics • 40k patients/month',
    },
  ];

  const startups = allStartups; // TODO: filter using query if you want

  const pipeline = {
    shortlisted: ['RuralPay', 'HealthNest', 'BusRoute AI', 'TownMart', 'AgroGrid', 'SwasthCare'],
    inDiscussion: ['RuralPay', 'HealthNest'],
    committedTotal: 5000000,
    committedCount: 3,
  };

  const investor = {
    _id: user.id,
    name: user.name,
  };

  res.render('investor-dashboard', {
    title: 'Investor Dashboard',
    investor,
    startups,
    pipeline,
    query,
  });
});

// -------------------- SAFE Generator --------------------

// GET form + preview
app.get('/safe', ensureAuth, ensureRole('investor'), (req, res) => {
  res.render('safe-generator', {
    title: 'AI SAFE Generator',
    safeText: null,
  });
});

// POST generate SAFE (stub AI – template-based draft)
app.post('/safe/generate', ensureAuth, ensureRole('investor'), (req, res) => {
  const {
    companyName,
    companyJurisdiction,
    investorName,
    governingLaw,
    otherLaw,
    investmentAmount,
    valuationCap,
    discountRate,
    safeType,
    proRataRights,
    mfn,
    closingDate,
    targetRound,
    customClauses,
  } = req.body;

  const finalGoverningLaw = governingLaw === 'Other' && otherLaw ? otherLaw : governingLaw;
  const includeProRata = proRataRights === 'true';
  const includeMfn = mfn === 'true';

  // Basic SAFE-style text (you can later replace this with a real AI call)
  const safeText = `
SAFE (Simple Agreement for Future Equity)

This SAFE is made between:

Company: ${companyName || '__________'}, a company incorporated under ${companyJurisdiction || '__________'} (the "Company"),
and
Investor: ${investorName || '__________'} (the "Investor").

Investment Amount
The Investor agrees to invest ${investmentAmount || '__________'} (the "Purchase Amount") in the Company pursuant to the terms of this SAFE.

Type of SAFE
This is a ${safeType || 'post-money'} SAFE, subject to the valuation and discount mechanics described below.

Valuation Cap and Discount
- Valuation Cap: ${valuationCap && valuationCap.trim() ? valuationCap : 'No specific valuation cap (if left blank).'}
- Discount: ${discountRate || 0}% applied to the price per share in the Equity Financing (if applicable).

Equity Financing
Upon the closing of the next bona fide equity financing of the Company (the "Equity Financing"), the Purchase Amount will convert into the number of shares of the Capital Stock of the Company determined in accordance with the standard SAFE mechanics (using the Valuation Cap and/or Discount, as applicable).

Liquidity Event
If, prior to the Equity Financing, there is a Liquidity Event (such as a sale of the Company or IPO), the Investor will be entitled to receive, at the Investor's election, either:
(a) a cash payment equal to the Purchase Amount; or
(b) the amount payable on the number of shares of Capital Stock into which this SAFE would have converted.

Dissolution Event
If, prior to conversion or repayment, there is a Dissolution Event, the Investor will be entitled to receive a portion of available proceeds (if any) in priority to holders of ordinary shares, up to the amount of the Purchase Amount.

${includeProRata ? `Pro-Rata Rights
The Investor shall have the right (but not the obligation) to participate on a pro-rata basis in future financings of the Company, on standard market terms, in order to maintain its fully diluted equity ownership percentage.` : ''}

${includeMfn ? `Most Favoured Nation (MFN) Clause
If the Company issues any subsequent SAFE or other convertible instruments with terms more favourable to investors, the Investor may elect to amend this SAFE to benefit from such more favourable terms.` : ''}

Target Round and Timeline
The parties expect the next priced equity round to occur as follows:
- Target Round / Notes: ${targetRound || '__________'}
- Closing Date (expected): ${closingDate || '__________'}

Governing Law
This SAFE shall be governed by and construed in accordance with the laws of ${finalGoverningLaw || '__________'}.

Additional / Custom Clauses
${customClauses && customClauses.trim().length > 0 ? customClauses : '(No additional custom clauses specified.)'}

IMPORTANT: This is an automatically generated draft based on your inputs and general SAFE concepts.
It is NOT legal advice. Please have this document reviewed and customised by qualified legal counsel before signing.
  `.trim();

  res.render('safe-generator', {
    title: 'AI SAFE Generator',
    safeText,
  });
});

// -------------------- Server --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

