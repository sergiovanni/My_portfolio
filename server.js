require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const RECEIVER_EMAIL = 'sergiovanni100@gmail.com';

app.use(express.json());
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ ok: false, error: 'Merci de remplir votre nom, votre email et un message.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ ok: false, error: "L'adresse email n'est pas valide." });
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio - ${name}" <${process.env.GMAIL_USER}>`,
            to: RECEIVER_EMAIL,
            replyTo: email,
            subject: `[Portfolio] ${subject || 'Nouveau message'}`,
            text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
            html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
        });

        res.json({ ok: true });
    } catch (err) {
        console.error('Erreur envoi mail:', err.message);
        res.status(500).json({ ok: false, error: "Erreur serveur, le message n'a pas pu etre envoye." });
    }
});

app.listen(PORT, () => {
    console.log(`Portfolio en ligne sur http://localhost:${PORT}`);
});
