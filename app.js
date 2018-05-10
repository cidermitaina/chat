const express = require('express'); // express モジュールを使う
const app = express(); // express アプリ
const http = require('http').Server(app);
const io = require('socket.io')(http); // http サーバを立てる
const PORT = process.env.PORT || 3000;

// ルートへのアクセス要求があったら
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// ルートの静的ファイルへのアクセス許可
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('add user', (username) => {
    socket.username = username;
    io.emit('add user', username);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', {
      username: socket.username,
      message: data
    });
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
