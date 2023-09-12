import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import nodemailer from "nodemailer";

export const adRouter = Router()

    .get('/search/:name?', async (req, res) => {
        const ads = await AdRecord.findAll(req.params.name ?? '')
        res.json(ads);
    })

    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        res.json(ad);
    })

    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tomica.marta@gmail.com',
                pass: 'wtkaqzlxdcznzzei'
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

        res.json(ad);
    })

    .patch('/accept/:id', async (req, res) => {
        console.log(req.params.id);
        const ad = await AdRecord.getOne(req.params.id);
        console.log(ad);
        res.json(await ad.updateAccepted());
    })


    .patch('/update-views/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        console.log(ad);
        res.json(await ad.updateViews());
    })


