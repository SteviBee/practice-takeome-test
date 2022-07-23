var express = require('express');
var router = new express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();
const axios = require('axios')

// MY ADD
// var User = require('./users');
// console.log("userssfdsfsdfdsfsdfds", users);

// TEST BULK ROUTE - To show all API DATA - users and admin
// router.get('/', function(req, res) {
//     res.render('index.html');
// });

// OLD CODE START
const request = require('request');

let url = "http://localhost:3000/users";
let urlRemove = "http://localhost:3000/users";

// DATA -   {
//     id: 5,
//     email: 'alex@getyodlr.com',
//     firstName: 'Alexandra',
//     lastName: 'Betts',
//     state: 'pending'
//   }
// ]


// LEFT CODE - to see what NOT to do

// router.get('/', async function (req, res, next) {
//     try {
//         let options = {json: true};
//         let data = await request(url, options, (error, res, body) => {
//             if (error) {
//                 return  console.log(error)
//             };

//             if (!error && res.statusCode == 200) {
//                 return body
//                 // console.log("SUCCECSS HOLY SHIT", body);
//             };
//         });
//         console.log("DATA",data);
//         res.render('index', { "data": data });
//     } catch (error) {
//         console.error("ERROR from testing", error);
//         return next(error)
//     }
//     // res.render('index.html', {"data": users});
// });

// (async () => {
//     try {
//       const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')

//     } catch (error) {
//       console.log(error.response.body);
//     }
//   })();

router.get('/', async function (req, res, next) {
    try {
        // const data = await axios.get(url)
        // console.log("DATA", data.data);
        res.render('index');
    } catch (error) {
        console.error("ERROR from testing", error);
        return next(error)
    }
    // res.render('index.html', {"data": users});
});

// router.get('/admin', function (req, res, next) {
//     res.render("admin.html")
// })

router.get('/admin/', async function (req, res, next) {
    try {
        const data = await axios.get(url)
        console.log("DATA", data.data);
        res.render('admin.html', { "data": data.data });
    } catch (error) {
        console.error("ERROR from testing", error);
        return next(error)
    }
    // res.render('index.html', {"data": users});
});

// Delte route
router.post('/delete/:id', async function (req, res, next) {
    try {
        const remove = await axios.delete(urlRemove + "/" + req.params.id)
        const data = await axios.get(url)
        console.log("deleted user with ID: ", req.params.id);
        res.render(`admin.html`, { "data": data.data });
    } catch (error) {
        console.error("ERROR from testing", error);
        return next(error)
    }
    // res.render('index.html', {"data": users});
});

// SIGN IUP

router.get('/signup', async function (req, res, next) {
    try {
        res.render('signup.html');
    } catch (error) {
        console.error("ERROR from testing", error);
        return next(error)
    }
    // res.render('index.html', {"data": users});
});

router.post("/signup/", async function (req, res, next) {
    try {
        //   const firstName = req.body.firstName;
        //   const lastName = req.body.lastName;
        //   const email = req.body.email;  

        const signup = await axios.post(url, req.body)     

        return res.render(`index`);
    } catch (err) {
        return next(err);
    }
});


module.exports = router;