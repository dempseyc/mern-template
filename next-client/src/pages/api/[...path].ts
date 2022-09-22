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