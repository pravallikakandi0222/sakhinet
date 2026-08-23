const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');

const app = express();
app.use(cors({ origin: 'https://sakhinet.vercel.app' }));
app.use(express.json());

// Initialize Supabase with private SERVICE ROLE KEY (Server-only!)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Twilio client for sending real SMS
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/sos', async (req, res) => {
  const { userId, latitude, longitude, emergencyContacts } = req.body;

  try {
    // 1. Save alert into Supabase
    const { data, error } = await supabase
      .from('sos_alerts')
      .insert([{ user_id: userId, latitude, longitude }])
      .select();

    if (error) throw error;

    // 2. Dispatch real SMS messages to emergency contacts via Twilio
    const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    const smsMessage = `EMERGENCY ALERT: SakhiNet user needs help! Location: ${googleMapsLink}`;

    if (emergencyContacts && Array.isArray(emergencyContacts)) {
      for (let phone of emergencyContacts) {
        await twilioClient.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
      }
    }

    return res.status(200).json({ success: true, alertId: data[0]?.alert_id });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Production server running'));