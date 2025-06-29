// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 🧪 Mock external API: like quiz results
app.get('/mock-api/customer-profile', (req, res) => {
  const customerId = req.query.customer_id;

  // Simulate quiz results → recommended product IDs
  const mockData = {
    '23131448443251': [{ id: 52697678578035, handle: 'example-shirt'},{id: 52697678971251, handle:'example-pants'}],
    '12345678912342': [{ id: 52697678578035, handle: 'example-shirt'},{id: 52697678971251, handle:'example-pants'}],
  };

  const recommendations = mockData[customerId] || ['52697678578035']; // default if not found
  res.json({ recommendations });
});

// 🔁 Shopify App Proxy route
app.get('/proxy/recommendation', async (req, res) => {
  const customerId = req.query.customer_id;

  // Simulate calling the mock external API
  const response = await fetch(`http://localhost:${PORT}/mock-api/customer-profile?customer_id=${customerId}`);
  const data = await response.json();

  res.json({ recommendedProductIds: data.recommendations });
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
