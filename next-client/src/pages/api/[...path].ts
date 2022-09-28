import httpProxy from 'http-proxy'

const API_URL = process.env.REACT_APP_DEV_API_URL
const proxy = httpProxy.createProxyServer()
// Make sure that we don't parse JSON bodies on this route:

console.log(API_URL, "API_URL")

export const config = {
    api: {
        bodyParser: false
    }
}
const proxyInit = (req, res) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true })
}

export default proxyInit

/*
 * Use Above for external API
 * Below is mocked response for demo
*/

// get path from /[...path]
// make this imitate routes in api/auth/login and api/users/show and create
// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }

//   exports.show = function(req,res) {
//     console.log(res.locals.user)
//     if (res.locals.user) {
//         User.findById(res.locals.user._id, function(error,response) {
//             if (error) {
//                 return res.send(error);
//             } else {
//                 response.pw_hash = 'secured';
//                 return res.json(response);
//             }
//         });
//     } else {
//         res.status(400).json({message: 'Invalid Password/Email'});
//     }
// }

// const extractUN = (email) => {
//     return email.split('@')[0];
// }

// exports.create = function(req, res) {
//     let params = req.body.user;
//     bcrypt.hash(params.password, saltRounds, function(error, hash) {
//         params.pw_hash = hash;
//         params.username = extractUN(params.email);
//         let user = new User(params);
//         user.save(function (error, response) {
//             if (error) {
//                 return res.send(error);
//             } else {
//                 res.json(response);
//             }
//         });
//         // catch (error)
//     });
//  };

// exports.login = function (req,res){
//     if (res.locals.details) {
//         try {
//             User.findOne({email: res.locals.details[0].toString()}, function (err,user) {
//             if (err) {
//                 console.log(`some mongoose err, ${err}`);
//                 return res.status(401).json({message: 'Invalid Password/Email 0'});
//             }
//             else if (user) {
//                 console.log('user', user);
//                 bcrypt.compare(res.locals.details[1], user.pw_hash.toString(), (err, isMatch) => {
//                     if (err) {
//                         console.log(`err from bcrypt`);
//                         return res.status(401).json({message: 'Invalid Password/Email 1'});
//                     } else if (isMatch) {
//                         var token = jwt.sign({user_id: user._id}, process.env.TOKEN_KEY);
//                         return res.status(200).json({
//                             user_id: user._id,
//                             email: user.email,
//                             username: user.username,
//                             token: token,
//                         });
//                     } else {
//                         console.log(`bad pw`);
//                         return res.status(401).json({message: 'Invalid Password/Email 2'});
//                     }
//                 });
//             } else { 
//                 console.log(`no user, no err?`);
//                 res.status(401).json({message: 'Invalid Password/Email 3'})
//                 return res.end();
//             }
//         })
//         } catch (error) {
//             console.log(`findOne error--> ${error}`);
//             return res.status(401).json({message: 'Invalid Password/Email 4'});
//         }
//     } else {
//         console.log(`no details`);
//         return res.status(400).json({message:'No Auth Details'});
//     }
// };


// // create response
  // just logs in user with credentials
    
  
  // // login response 
  {
      user_id: new ObjectId("62d5eda691ce42cf1d6e9a9e"),
      email: 'u3@u.com',
      username: 'u3',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJkNWVkYTY5MWNlNDJjZjFkNmU5YTllIiwiaWF0IjoxNjY0Mzg1MzYwfQ.wlX3l17VCBYFV0m1-UQxSUH03JoPv2M739RJDaF9_fc'
    }

 // // fetch one response
  {
    image: '/blank-profile-picture-973460_1280.webp',
    _id: new ObjectId("62d5eda691ce42cf1d6e9a9e"),
    username: 'u3',
    email: 'u3@u.com',
    pw_hash: 'secured',
    created_on: 2022-07-18T23:32:54.109Z,
    recently_active_on: 2022-07-18T23:32:54.109Z,
    __v: 0
  }

