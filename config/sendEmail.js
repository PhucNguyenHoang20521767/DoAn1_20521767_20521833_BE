const axios = require("axios");
const ErrorResponse = require("../utils/errorResponse");

exports.sendEmail = async (to, subject, body) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
        ).toString("base64")}`
    };

    const data = JSON.stringify({
        Messages: [
            {
                From: {
                    Email: "nguyenshomefurniture@gmail.com",
                    Name: "NGUYEN'S HOME Furniture",
                },
                To: [{ Email: to }],
                Subject: subject,
                TextPart: body
            }
        ]
    });

    try {
        await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
    } catch (error) {
        console.error(error);
        throw new ErrorResponse("Error sending email", 500);
    }
};