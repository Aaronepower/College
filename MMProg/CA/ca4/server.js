/* jshint node: true, browser: false */
var app = require('express')()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
app.get('/', function (req, res) {
	res.sendFile(__dirname+'/index.html')
})

app.get('/style', function (req, res) {
	res.sendFile(__dirname +'/style.css')
})
app.get('/script', function (req, res) {
	res.sendFile(__dirname +'/script.js')
})
app.get('/raf', function (req, res) {
	res.sendFile(__dirname +'/raf.js')
})
app.get('/normalize', function (req, res) {
	res.sendFile(__dirname +'/normalize.css')
})
app.get('/pongwallbounce', function (req, res) {
	res.sendFile(__dirname +'/pongwallbounce.ogg')
})
app.get('/pongplayerbounce', function (req, res) {
	res.sendFile(__dirname +'/pongplayerbounce.ogg')
})

var players
  , readyPlayers
  , room = 'pong'
io.on('connection', function (socket) {
	socket.emit('socketId', socket.id)
	var sockets = getSockets()
	if (sockets.length < 2) {
		players = []
		io.emit('wait')
	}
	else if (sockets.length === 2) {
		players = sockets
		for (var i = 0; i < players.length; i++) {
			players[i].join(room)
			io.to(players[i].id).emit('ready', i)
		}
	}

	socket.on('movement', function (movement) {
		socket.broadcast.to(room).emit('movement', movement)
	})

	socket.on('reverseBall', function() {
		socket.broadcast.to(room).emit('reverseBall')
	})

	socket.on('playerMovement', function (player) {
		socket.broadcast.to(room).emit('playerMovement', player)
	})
	var dupCheck = true
	socket.on('score', function (player) {
		if (dupCheck) {
			io.to(room).emit('score', player)
			dupCheck = false
		}
		setTimeout(function() {
			dupCheck = true
		}, 1000);
	})

	socket.on('disconnect', function() {
		var clients = getSockets()
		if (clients.length < 2) {
			io.emit('wait')
		}
		else if (clients.length === 2) {
			players = clients
			for (var i = 0; i < players.length; i++) {
				players[i].join(room)
			}
			io.to(room).emit('ready')
		}
	})
})

server.listen(80)

/* jshint maxlen: 200*/
// Taken from: http://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients
function getSockets(roomId, namespace) {
    var res = []
    , ns = io.of(namespace ||'/')    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) 
                if(index !== -1) {
                    res.push(ns.connected[id])
                }
            } else {
                res.push(ns.connected[id])
            }
        }
    }
    return res
}