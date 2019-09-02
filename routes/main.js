const express = require('express');
const router = express.Router();
// const FileStore = require("session-file-store")(session)
let session = require('express-session')
const FileStore = require("session-file-store")(session)
const handlebars = require('express-handlebars');
const path = require('path');
const Place = require("../models/place");
const User = require("../models/user");
const Plans = require("../models/plans");




let sessionConfig = {
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}


const hbs = handlebars.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views')
});

const list = async function (req, res, next) {
    const template = await hbs.getTemplate("views/list.hbs", {
        precompiled: true
    });
    req.list = template;
    next();
}

const last = async function (req, res, next) {
    const template = await hbs.getTemplate("views/last.hbs", {
        precompiled: true
    });
    req.last = template;
    next();
}

router.get("/", function (req, res) {
    req.session.destroy()
    res.render('main')
})

router.get("/:formname", function (req, res) {
    res.render("form", {
        type: req.params.formname
    })
})

router.post("/registration", async function (req, res) {
    let user = new User({ login: req.body.login })
    user.password = user.createHash(req.body.password)
    console.log(user)
    await user.save()
    req.session.user = user.login
    res.json({ user: req.session.user });

})

router.post("/login", async function (req, res) {
    let user = await User.findOne({ login: req.body.login });
    if (user.checkHash(req.body.password)) {
        req.session.user = user.login;
        res.json({ t: true })
    }
    else {
        res.json({ t: false })
    }
})

router.get("/main/quik", list, function (req, res) {
    if (req.session) {
        res.render("quik", {
            user: req.session.user,
            list: req.list
        });
    }
    else {
        res.render("quik", {
            list: req.list
        })
    }
})

router.get("/profile/:id", last, async function (req, res) {
    let plans= await Plans.find({user: req.session.user, counter:0})
    console.log(plans)
    let cool = await Plans.find({user: req.session.user, counter:1})
    
    

    res.render("profile", { plans : plans, plan : cool, last: req.last});
})
 router.post("/cat", async function(req,res){

 })

router.post("/plans", async function (req, res) {
    let place = new Place({
        title: req.body.title,
        adress: req.body.adr,
        cat: req.body.cat
    })
    let plans = new Plans({
        user: req.session.user,
        place: place.title,
        cat: req.body.cat,
        adress: req.body.adr,
        counter: 0
    })
    if(req.session){
    await place.save();
    await plans.save();
    }
    res.end()
})

router.post("/plans/del", async function(req, res){
    console.log(req.body.title)
   await Plans.findOneAndDelete({
        user: req.session.user,
        place: req.body.title
    })
    res.end();
})

router.post("/plans/p", async function(req, res){
    await Plans.findOneAndUpdate({
        user: req.session.user,
        place: req.body.title
    }, {$set:{counter:1}})
    let p = await Plans.findOne({user: req.session.user, place: req.body.title })
    res.json(p);
})

module.exports = router;