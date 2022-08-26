require('dotenv').config();

const app = require('express')();
const server = require('http').createServer(app);


const bcrypt = require('bcrypt');
const saltRounds = 10;

const morgan = require('morgan');
const logger = require('./logger');
const bodyParser = require('body-parser');

const db = require('./db/db'); //mongostuff //db is nothing
const cors = require('cors');

const jwt = require('jsonwebtoken');

const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

const tropesRouter = require('./routes/tropesRouter');

const User = require('./models/User');
// const FacebookTokenStrategy = require('passport-facebook-token');
// const passport = require('passport');
// required below ('express-session');

// passport.use(new FacebookTokenStrategy({
//     clientID: process.env.FB_ID,
//     clientSecret: process.env.FB_SECRET,
// }, function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ "facebook_id": profile.id }, function (err, user) {
//         console.log('user', user, err);
//         return done(error,user);
//     });
// }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
// passport.deserializeUser(function(id, done) {
//     done(null, id);
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

const extractDetails = function(req,res,next) {
    const auth = req.headers.authorization.split(' ')[1];
    try {
        const details = Buffer.from(auth, 'base64').toString().split(':');
        res.locals.details = details;
        next();
    } catch(error) {
        console.log('auth with details error')
        return res.status(401).json({message: 'Invalid Password/Email -1'});
    }
};

app.use('/api/auth/login', extractDetails);
// app.use('/api/auth/fb', passport.authenticate('facebook-token'), function(error, user) {
//     console.log('hit /fb route', user);
//     //respond or next here
// });
app.use('/api/auth', authRouter);

////////////////////////////////////////////// SOCKET STUFF

// const io = require('socket.io')(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  }
});

io.on('connection', (socket) => {
  //
  // seems like some of my logic would be here, but maybe broken out into other files
  //
//   socket.broadcast.emit("hello", "world");
  //
  socket.broadcast.emit("greeting",socket.id)
  console.log("greeting",socket.id)
  socket.on('subscribeToTimer', (interval) => {
    console.log("socket is subscribing to timer with interval ", interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
});

server.listen(8000, ()=> console.log("io on 8000"));

////////////////////////////////////////////////
function exclude(path, middleware) {
    return function (req,res,next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req,res,next);
        }
    }
}

app.use('/api/users', exclude('/create',tokenCheck));
app.use('/api/users', usersRouter);
app.use('/api/users/:id/update', pwCheck);

app.use('/api/tropes', tokenCheck);
app.use('/api/tropes', tropesRouter);


function tokenCheck (req,res,next) {
    console.log('inside tokencheck');
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_KEY, function (err, payload) {
            if (payload) {
                User.findById(payload.user_id).then(
                    (doc) => {
                        console.log('token ok')
                        res.locals.user = doc;
                        next();
                    }
                )
            } else {
                console.log('user not found', req.headers);
                res.status(401).json({message: 'Unauthorized'});
            }
        })
    } catch(error) {
        console.log('token not found', req.headers);
        res.status(401).json({message: 'Unauthorized'});
    }
}

function pwCheck (req,res,next) {
    try {
        bcrypt.compare(req.body.password, res.locals.user.pw_hash.toString(), (err, isMatch) => {
            if (err) {
                throw err;
            } else if (isMatch) {
                next();
            } else {
                res.status(401).json({message: 'Invalid Password/Email'});
            }
        })
    } catch(error) {
        console.log('catch in check pw')
        res.status(400).json({message: 'Editing Wrong User'});
    }
}

// default route blank 
// app.get('/', function (req, res) {
//     logger.debug('Debug statement');
//     logger.info('Info statement');
//     res.send('Hello World!');
// });

app.listen(process.env.PORT||3002, function () {
  console.log('Example app listening on port 3002!')
});

module.exports = app;

