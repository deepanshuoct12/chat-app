let socket = io();
socket.on('connected',()=>{
    console.log("connected " + socket.id)  
})

$(function(){
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div')
     let loginbtn = $('#loginbtn')
     let loginbox = $('#loginbox')


     let user = ''  // where is user??

    sendbtn.click(function(){
       // let msg = msgbox.val()
        socket.emit('send_msg',{
            user:user,          // we will send user (object)details also
            message: msgbox.val()  // we send message to server.from front end .

        
        })
    })

    loginbtn.click(function(){
          
        user = loginbox.val()
        chatDiv.show()
        loginDiv.hide()  // when we login then we enter chat box and login btn will disappear
           socket.emit('login',{
               user:user 
           })

    })
    socket.on('recv_msg',function(data){         // it get data from other end of pipe i.e server
            msglist.append($('<li>' + data.user + ':' + data.message + '</li>')) // reflect changes on frontend

        })
    

    
})