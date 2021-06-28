const io = require("socket.io-client");
const express = require('express')
const app = express()
const axios = require('axios')
const fs = require('fs')
const urls = ['/']

const socket = io("wss://pinger-hub.1nchpp.repl.co", {
  reconnection: true,
  reconnectionAttempts: 10000,
  reconnectionDelay: 6000,
  reconnectionDelayMax: 100000,
});

function send() {
  urls.forEach(url => {
    axios.get(url).then(s => {
      console.log('sent')
    })
  })
}

setInterval(send, 10000)

socket.on('ping', async m => {
  console.log(m)
  urls.push(m)
})

socket.on('connect', function() {
  console.log("e")
  if (fs.readFileSync('.replit').toString() == `language = "nodejs"
run = "npm i;node ."
`) axios.get('https://pinger-hub.1nchpp.repl.co/ping?url=https://' + process.env.REPL_SLUG + "." + process.env.REPL_OWNER + ".repl.co")
  console.log("ADDED")
  fs.writeFileSync('.replit', `language = "nodejs"
run = "node ."
`)
});

socket.on('disconnect', () => {
  setTimeout(() => {
    console.log("r")
    socket.connect()
  }, 6000)
})

app.get("/", async (req, res) => {
  res.end(`hi`)
})

app.listen(4000)
