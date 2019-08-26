const express = require('express')
const path = require('path')
const socketio =require('socket.io')
const http = require('http')

const app = express();
const server =http.createServer(app)
const io = socketio(server) // io is a socketio server we create a socketio instance running on http server  

let usersockets = {}

app.use('/',express.static(path.join(__dirname, 'frontend')))

io.on('connection', (socket)=>{  // it recieves an event that connection has been made .and then it performs the work which is wwritten in callback()
    console.log("New socket formed from " + socket.id) // each socket has an id
    socket.emit('connected')


    socket.on('login',(data)=>{
        //username is in data.user
        usersockets[data.user]=socket.id
        console.log(usersockets)
    })

    socket.on('send_msg',(data)=>{


       // io.emit('recv_msg',data) by this everyone will get data.i.e all the sockets connected to it will get data
       // by this only others will get data.not us 
       if(data.message.startsWith('@'))  // to send data to a particular user 
       {  // data.message = "@:hello"
          //split at :,then remove @ from begining

          let recipent = data.message.split(":")[0].substr(1)
          let rcptSocket = usersockets[recipent]
          io.to(rcptSocket).emit('recv_msg',data)
       }
       else{
        socket.broadcast.emit('recv_msg',data)   // send to all other than us data. if a specific user  is not specified
       }
     
    })

})                                                        //by this we create connection to socket
server.listen(2223, ()=> console.log('website open on http://localhost:2223'))
   