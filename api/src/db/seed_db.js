require('dotenv').config();
const db = require('mongoose');
const cors = require('cors')

const dbURL = process.env.DB_URL;

db.connect(dbURL, {
    // useFindAndModify: false, 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
    // useCreateIndex: true
    });

const async = require('async')

const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require('../models/User')
const Trope = require('../models/Trope')

db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

let userInstances = []

let tropes = [
    {   
        description: "Falls into arms",
        bonus:  ["bonus for 'from ladder'", "bonus for 'ice/ice-skating"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Job depends on it",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Mean Boss",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Honored to work with them",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Mr./Miss Wrong",
        bonus:  ["bonus for another Wrong"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Christmas Tree Buying\/Selling",
        bonus:  ["bonus for Tree Farm"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Christmas Tree Loading\/Unloading",
        bonus:  ["bonus for mishap"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Christmas Tree Decorating",
        bonus:  ["bonus for mishap"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Gift Shop/shopping",
        bonus:  ["bonus for secrecy", "bonus for look in the window"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Small Business Failing",
        bonus:  ["bonus for holiday-based business"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Haunted by Christmas Past",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Lost then found Christmas Spirit",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "A Dog",
        bonus:  ["bonus for 'story is not dog-based'"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Cooking",
        bonus:  ["bonus for 'cooking contest'"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Baking",
        bonus:  ["bonus for 'baking contest'"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Special Ornament",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "A Handwritten Note/Letter",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "A Marriage",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "A very Christmassy town",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Ice Skating",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Santa",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Secretly an Angel/Elf/Santa?",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Bumps into someone and drops things",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Pretending to be a couple",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Glamorous career in the Big City",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "From The City to The Country",
        bonus:  ["bonus for vice-versa"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Bonding over decorations",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Music is much louder in this scene",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Divorcee",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Widow/Widower",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Pressured to take part in another family's tradition",
        bonus:  ["bonus for family photo"],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	50
    },
    {
        description: "Wisdom from an elder",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Wisdom from a child",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Old people get some too",
        bonus:  ["bonus for twist (pets/non-olds)"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Snowball fight",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Hot chocolate",
        bonus:  ["bonus if it is the best"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Coffee",
        bonus:  ["bonus for Folgers"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Noticably not been dating",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Dislike at first sight",
        bonus:  ["bonus for It's Mutual"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	0
    },
    {
        description: "The Ex Returns",
        bonus:  ["bonus for another Ex"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Local Holiday Event of the Year",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Kiss Interruptus",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Christmas Misunderstanding",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Intervening Best Friend",
        bonus:  ["bonus for sibling/family-member", "bonus for co-worker"],
        ubiquity: 0,
        bonus_style: "single",
        bonus_pts:	50
    },
    {
        description: "Eavesdropping/Overhearing",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Tree lighting",
        bonus:  ["bonus for mishap"],
        ubiquity: 0,
        bonus_style: "doubles",
        bonus_pts:	50
    },
    {
        description: "Chivalrous Jacket/Scarf Lending",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Baking Christmas Cookies",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Build a Snowman Together",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Making Snow Angels",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Grand Gesture",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Real Estate Problem",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    },
    {
        description: "Christmas magic sound effect",
        bonus:  ["bonus for repeating"],
        ubiquity: 0,
        bonus_style: "each",
        bonus_pts:	50
    },
    {
        description: "Christmas Caroling",
        bonus:  [],
        ubiquity: 0,
        bonus_style: "none",
        bonus_pts:	0
    }
];

// old man turns out to be santa
// save town pageant / talent show

function log(error, results) {
    if (error) {
        console.log('ERROR:', error)
    }
    else {
        console.log('results:', JSON.stringify(results)) 
    }
}

function userCreate(userDetails, logger) {
    bcrypt.hash(userDetails.pw_hash, saltRounds, function(err, hash) {
        let details = {...userDetails, pw_hash: hash }
        let user = new User(details)   
        user.save(function (error) {
            if (error) {
                logger(error, null)
                return
            }
            userInstances.push(user._id)
            logger(null,'New User: ' + JSON.stringify(user,null,4))
        })
    })
}

function tropeCreate(tropeDetails, logger) {
    let details = {...tropeDetails}
    let trope = new Trope(details)   
    trope.save(function (error) {
        if (error) {
            logger(error, null)
            return
        }
        logger(null,'New Trope: ' + JSON.stringify(trope,null,4))
    })
}

const create1User = (callback) => {
    userCreate({
        created_on: new Date(),
        username: 'u2',
        email: 'u2@u.com',
        pw_hash: '2u',
        data: {games:[],finds:[],contributions:[]}
    }, log)
    callback(null, 'SUCCESS - created user');
}

const createTropes = () => {
    console.log(userInstances[0], "user current")
    tropes.forEach( (trope) => {
        console.log(tropes)
        tropeCreate({
            created_by: userInstances[0],
            description: trope.description,
            bonus:  trope.bonus,
            ubiquity:	trope.ubiquity,
            bonus_style: trope.bonus_style,
            bonus_pts: trope.bonus_pts,
            finds: [],
        }, log)
        return
    })
}

const dropDB = function(callback) {
    
    // MongoClient.connect(dbURL, function(err, db) {
    
    //     if(err) throw err;
        
        // Drop database which is an asynchronous call
        db.connection.dropDatabase(function(err, result) {
            if (err) {
                console.log(err)
                return
            }
            console.log("dropped DB")
            // After successfully dropping database, force 
            // close database which is another asynchronous call 
            // db.connection.close(true, function(err, result) {

                // Close successful so execute callback so second 
                // function in async.serial gets called
                callback(null, 'SUCCESS - dropped database');
            });
        // };
    // });
}

async.series([ dropDB, create1User, createTropes ],
function(error, results) {
    if (error) {
        console.log('FINAL ERR:', error)
    }
    else {
        console.log('userInstances:', JSON.stringify(userInstances))
        
    }
    mongoose.connection.close()
})