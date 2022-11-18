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
        id: 0,
        title: "title",
        author: "author",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2022-11-18T08:06:01.781Z",
        publicationDate: "2022-11-19T08:06:01.781Z",
        availableResolutions: ["P144"]
    }];
let countOfPost = 0;
app.get('/', (req, res) => {
    res.send("Hello IT-INCUBATOR.EU???");
});
app.delete('/testing/all-data', (req, res) => {
    videos.splice(0);
    res.send(204);
});
app.get('/videos', (req, res) => {
    res.send(videos);
});
app.post('/videos', (req, res) => {
    countOfPost++;
    let title = req.body.title;
    let author = req.body.author;
    // let availableResolutions: Array<string> = []
    // for (let i = 0; i < req.body.availableResolutions.length; i++) {
    //     availableResolutions.push(req.body.availableResolutions[i])
    // }
    let availableResolutions = req.body.availableResolutions;
    let arrayOfErrors = new Array();
    const errors = { errorsMessages: arrayOfErrors };
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        arrayOfErrors.push({ message: "Incorrect title", field: "title" });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        arrayOfErrors.push({ message: "Incorrect author", field: "author" });
    }
    // само значение, оно должно входить в массив [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ]
    for (let i = 0; i < availableResolutions.length; i++) {
        if (["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"].indexOf(availableResolutions[i]) == -1) {
            arrayOfErrors.push({ message: "Incorrect availableResolutions", field: "availableResolutions" });
        }
    }
    if (availableResolutions.length <= 1) {
        arrayOfErrors.push({ message: "Incorrect availableResolutions", field: "availableResolutions" });
    }
    if (arrayOfErrors.length >= 1) {
        res.status(400).send(errors);
        return;
    }
    const newVideo = {
        id: countOfPost,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2022-11-18T08:06:01.781Z",
        publicationDate: "2022-11-19T08:06:01.781Z",
        availableResolutions: availableResolutions
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
    let author = req.body.author;
    let availableResolutions = req.body.availableResolutions;
    let canBeDownloaded = req.body.canBeDownloaded;
    let minAgeRestriction = req.body.minAgeRestriction;
    let publicationDate = req.body.publicationDate;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40 ||
        !author || typeof author !== 'string' || !author.trim() || author.length > 20 ||
        availableResolutions.legth <= 1 || typeof canBeDownloaded !== "boolean" ||
        minAgeRestriction < 1 || minAgeRestriction > 18 || typeof publicationDate !== "string") {
        res.status(400).send({
            errorsMessages: {
                message: "Incorrect title",
                field: "Send correct video"
            }
        });
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (video) {
        video.title = title;
        video.author = author;
        video.availableResolutions = availableResolutions;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
