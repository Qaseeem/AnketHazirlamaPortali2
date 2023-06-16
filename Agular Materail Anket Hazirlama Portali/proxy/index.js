const express = require("express");
const app = express();
const cors = require("cors")
const {createProxyMiddleware} =require("http-proxy-middleware")

app.use(cors())

app.get("/", createProxyMiddleware({target:'https://localhost:44300/api/', changeOrigin:true}))

app.listen(3000,()=>{
    console.log("proxy started")
})