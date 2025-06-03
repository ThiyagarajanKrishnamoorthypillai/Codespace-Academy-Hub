// helpers/jwt.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com"); // 🔁 Replace with real client ID

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    console.log('Received Token:', token); // ✅ log here
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com", // 🔁 Replace again here
    });

    const payload = ticket.getPayload();
    req.user = {
      email: payload.email,
      name: payload.name,
      googleId: payload.sub,
    };

    next();
  } catch (err) {
    console.error('Invalid Google Token', err);
    res.status(401).send('Invalid token.');
  }
};
