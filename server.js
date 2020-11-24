if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: true,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user is connected', socket.id);

  socket.on('send message', function (msg) {
    io.emit('receive message', msg);
  });

  socket.on('disconnect', () => {
    console.log('...and disconnected');
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
