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

// imitate routes in api/auth/login and api/users/show and create
// export default function handler(req, res) {
    
//     const {path} = req.query;

//     const user_id = "mock-user-id";
//     const token = "mock-token";
//     let email = "";

//     try {
//         if (path[0] === "users" && path[1] === "mock-user-id") {
//             return res.status(200).json({
//                 image: "/blank-profile-picture-973460_1280.webp",
//                 _id: user_id,
//                 username: "mock-user",
//                 email: "mock-email",
//                 pw_hash: "secured",
//                 created_on: "2022-07-18T23:32:54.109Z",
//                 recently_active_on: "2022-07-18T23:32:54.109Z",
//                 __v: 0
//               });
//         }
        
//         if ((path[0] === "auth" && path[1] === "login")) {
//             const auth = req.headers.authorization.split(' ')[1];
//             const details = Buffer.from(auth, 'base64').toString().split(':');
//             email = details[0].toString();
//             let username = email.split('@')[0];
//             return res.status(200).json({ email: email, username: username, user_id: user_id, token: token })
//         }

//         if (path[0] === "users" && path[1] === "create") {
//             email = req.body.user.email;
//             let username = email.split('@')[0];
//             console.log(user_id, email, username);
//             return res.status(200).json({ email: email, username: username, user_id: user_id, token: token })
//         }
        
//     } catch(error) {
//         console.log('mock api error')
//         return res.status(401).json({message: 'failure in mock API'});
//     }
//   }
