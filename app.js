'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe.js');
var badges = require('./models/badges.js');

server.listen(3000, function(){
	console.log('the server is running on 3000');
});


app.use(express.static('express'));



app.get('/', function(request, response){
	console.log("entered");
	response.sendfile('./public/index.html');
});

io.sockets.on('connection', function(socket){
	badges.get(function(err, data){
		if(err){
			return;
		}
		data.forEach(function(badge){
			console.log("ok");
			socket.emit('badge', badge);
		});
	});
});

subSocket.on('message',function(message){
	console.log("hmmk");
	io.socket.emit('badge',message);
});
