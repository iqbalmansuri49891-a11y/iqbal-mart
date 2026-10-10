const Razorpay = require('razorpay');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let amount = 100;
    if (req.body) {
      let body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (body && body.amount) {
        amount = body.amount;
      }
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error("RAZORPAY ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};
