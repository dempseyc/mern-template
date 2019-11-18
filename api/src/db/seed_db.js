const async = require('async');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');
const Act = require('../models/Act');
const Contact = require('../models/Contact');

const mongoose = require('mongoose');

const cors = require('cors');
// const dbURL = 'mongodb://localhost:27017/cdb0';
mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// let userInstances = [];

// function log(err, results) {
//     if (err) {
//         console.log('ERROR:', err);
//     }
//     else {
//         console.log('results:', JSON.stringify(results)); 
//     }
// }

// function userCreate(userDetails, logger) {
//     bcrypt.hash(userDetails.pw_hash, saltRounds, function(err, hash) {
//         let details = {...userDetails, pw_hash: hash };
//         let user = new User(details);   
//         user.save(function (err) {
//             if (err) {
//                 logger(err, null);
//                 return;
//             }
//             userInstances.push(user);
//             logger(null,'New User: ' + JSON.stringify(user,null,4));
//         });
//     });
// }

// function actCreate(actDetails, logger) {
//     const act = new Act(actDetails);
//     act.save(function (err) {
//         if (err) {
//             logger(err, null);
//             return;
//         }
//     });
//     logger(null,'New Act: ' + JSON.stringify(act,null,4));
//     return act;
// }

// function contactCreate(contactDetails, logger) {
//     let contact = new Contact(contactDetails);
//     contact.save(function (err) {
//         if (err) {
//             logger(err, null);
//             return;
//         }
//     });
//     logger(null, 'New Contact: ' + JSON.stringify(contact,null,4));
//     return contact;
// }

// function create10Acts() {
//     let acts = [];
//     let newAct = function (i) {
//         return {
//             created_on: new Date(),
//             description: 'test act number '+i,
//             points: Math.floor(Math.random()*5)*5,
//             act_profile: {main_category: 'test_act'},
//             done: true
//         };
//     };
//     [...Array(10)].forEach( function (x,i) { acts.push(actCreate(newAct(i),log)); } );
//     return acts;
// }

// function create5Contacts() {
//     let contacts = [];
//     let newContact = function (i) {
//         return {
//             created_on: new Date(),
//             f_name: 'Contact'+i,
//             l_name: 'Test',
//             company: 'The '+i+' Company',
//             email: 'contact'+i+'@the'+i+'co.com',
//             phone: Math.floor(Math.random()*999)+1000000000
//         };
//     };
//     [...Array(5)].forEach( function (x,i) { contacts.push(contactCreate(newContact(i),log)); } );
//     return contacts;
// }

// function create4Users() {
//     async.series([
//         function(cb) {
//             let myActs = create10Acts();
//             let myContacts = create5Contacts();
//             userCreate({
//                 created_on: new Date(),
//                 f_name: 'ee',
//                 l_name: 'one',
//                 email: 'e1@e.com',
//                 pw_hash: '1e',
//                 acts: myActs,
//                 contacts: myContacts
//             },
//             log);
//             cb();
//         },
//         function(cb) {
//             let myActs = create10Acts();
//             let myContacts = create5Contacts();
//             userCreate({
//                 created_on: new Date(),
//                 f_name: 'ee',
//                 l_name: 'two',
//                 email: 'e2@e.com',
//                 pw_hash: '2e',
//                 acts: myActs,
//                 contacts: myContacts
//             },
//             log);
//             cb();
//         },
//         function(cb) {
//             let myActs = create10Acts();
//             let myContacts = create5Contacts();
//             userCreate({
//                 created_on: new Date(),
//                 f_name: 'ee',
//                 l_name: 'three',
//                 email: 'e3@e.com',
//                 pw_hash: '3e',
//                 acts: myActs,
//                 contacts: myContacts
//             },
//             log);
//             cb();
//         },
//         function(cb) {
//             let myActs = create10Acts();
//             let myContacts = create5Contacts();
//             userCreate({
//                 created_on: new Date(),
//                 f_name: 'ee',
//                 l_name: 'four',
//                 email:  'e4@e.com',
//                 pw_hash: '4e',
//                 acts: myActs,
//                 contacts: myContacts
//             },
//             log);
//             cb();
//         },
//         ],
//         function(){} // required closing fn?
//         );
// }

// async.series([ create4Users ],
// function(err, results) {
//     if (err) {
//         console.log('FINAL ERR:', err);
//     }
//     else {
//         console.log('userInstances:', JSON.stringify(userInstances));
        
//     }
//     mongoose.connection.close();
// });