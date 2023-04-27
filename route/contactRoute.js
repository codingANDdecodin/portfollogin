const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
    let data = req.body;
    if (data.name.length === 0 || data.email.length === 0 || data.message.length === 0) {
        return res.json({ msg: "please fill all fields" })

    }

    let smptTransporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'ajitbhogade02@gmail.com',
            pass: 'ftinrwgrputyuaqu'
        },
    });

    let mailOptions = {
        from: data.email,
        to: 'ajitbhogade02@gmail.com',
        subject: `message from ${data.name}`,
        html: `
        
        <h3>Informations</h3>
        <ul>
        <li>Name:${data.name}</li>
        <li>Email:${data.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}</p>
        
        `
    };


    smptTransporter.sendMail(mailOptions, (error) => {
        try {
            if (error) return res.statusCode(400).json({ msg: "please fill the filds" })
            res.status(200).json({ msg: "thank you for connecting Ehizeex!" })

        } catch (error) {
            if (error) return res.statusCode(500).json({ msg: "there is server error" })

        }
    })


})
module.exports = router;