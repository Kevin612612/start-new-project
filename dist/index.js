"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// create express app
const app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
app.use(corsMiddleware);
const jsonBodyMiddleware = body_parser_1.default.json();
app.use(jsonBodyMiddleware);
const port = process.env.PORT || 5000;
let videos = [{
        id: 1,
        title: 'title',
        author: 'it-incubator.eu'
    }];
// const products = [{id: 1, title: "tomato"}, {id: 2, title: 'orange'}]
// const addresses = [{id: 1, value: 'Nezalezhnasti 12'}, {id: 2, value: "Selickaga 11"}]
app.get('/', (req, res) => {
    res.send("Hello IT-INCUBATOR.EU???");
});
app.get('/videos', (req, res) => {
    res.send(videos);
});
app.post('/videos', (req, res) => {
    let title = req.body.title;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [{
                    "message": "Incorrect title",
                    "field": "Send correct video"
                }],
            resultCode: 1
        });
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: title,
        author: 'it-incubator.eu'
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
app.get('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const video = videos.find(y => y.id === id);
    if (video) {
        res.send(video);
    }
    else {
        res.send(404);
    }
});
app.put('/videos/:videoId', (req, res) => {
    let title = req.body.title;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [{
                    "message": "Incorrect title",
                    "field": "title"
                }],
            resultCode: 1
        });
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (video) {
        video.title = title;
        res.status(204).send(video);
    }
    else {
        res.send(404);
    }
});
app.delete('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const newVideos = videos.filter(v => v.id !== id);
    if (newVideos.length < videos.length) {
        videos = newVideos;
        res.send(204);
    }
    else {
        res.send(404);
    }
});
// app.get('/products', (req: Request, res: Response) => {
//     if (req.query.title) {
//         let searchString = req.query.title.toString()
//         res.send(products.filter(p=> p.title.indexOf(searchString) > -1))
//     } else {
//         res.send(products)
//     }
// })
//
// app.post('/products', (req: Request, res: Response) => {
//     const newProduct = {
//         id: 7,
//         title: req.body.title
//     }
//     products.push(newProduct)
//     res.status(201).send(newProduct)
// })
//
// app.get('/products/:id', (req: Request, res: Response) => {
//     let product = products.find(p=> p.id === +req.params.id)
//     if (product) {
//         res.send(product)
//     } else {
//         res.send(404)
//     }
// })
//
// app.delete('/products/:id', (req: Request, res: Response) => {
//     for (let i = 0; i < products.length; i++) {
//         if (products[i].id === +req.params.id) {
//             products.splice(i, 1)
//             res.send(201)
//             return;
//         }
//     }
//     res.send(404)
// })
//
// app.get('/addresses', (req: Request, res: Response) => {
//     res.send(addresses)
// })
//
// app.get('/addresses/:id', (req: Request, res: Response) => {
//     let address = addresses.find(p=> p.id === +req.params.id)
//     if (address) {
//         res.send(address)
//     } else {
//         res.send(404)
//     }
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
