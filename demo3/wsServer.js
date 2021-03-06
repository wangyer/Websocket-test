var ws = require("nodejs-websocket")
var PORT = 3000

var clientCount = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickname = 'usr' + clientCount
	broadcast(conn.nickname + 'comes in')
	conn.on("text", function (str) {
		console.log("Received "+str)
		broadcast(str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast(conn.nickname + "left")
	})
	conn.on("error", function(err) {
		console.log("handle err");
		console.log(err);
	})
}).listen(PORT)

function broadcast(str) {
	//取到server下的所有连接
	server.connections.forEach(function(connection) {
		connection.sendText(str)
	})
}