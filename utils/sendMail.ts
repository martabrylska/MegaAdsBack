import nodemailer from "nodemailer";
import {AdRecord} from "../records/ad.record";
import {mailConfig} from "../config/mail-config";

export const sendMailToAdmin = (ad: AdRecord) => {
    const transporter = nodemailer.createTransport({
        service: mailConfig.service,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
        }
    });

    const mailOptions = {
        from: 'MegaAds',
        to: 'tomica.marta@gmail.com',
        subject: `New advertisement added: ${ad.name}`,
        html: `<h1>Nazwa: ${ad.name}</h1>
                   <p>Opis: ${ad.description}</p>
                    <p>Cena: ${ad.price}</p>
                    <p>Url1: ${ad.url1}</p>
                    <p>Url2: ${ad.url2}</p>
                    <p>Url3: ${ad.url3}</p>
                    <p>Dł. geograficzna: ${ad.lat}</p>
                    <p>Szer. geograficzna: ${ad.lon}</p>
                    <p><a href="http://localhost:3000/accept/${ad.id}">Zaakceptuj</a></p>
`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


