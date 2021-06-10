# Slim Realtime Chat

A basic real-time chat made using only socket.io and React.

You can view the demo [here](http://slim-realtime-chat.herokuapp.com)
## QuickStart
Clone the project, copy `client/.env.example` to `client/.env` and just run
`
docker-compose up
`
and you're ready to go. 
Just go to http://localhost:3001 and you will see the client app.
#### TODO:
- [x] Show active users
- [x] Let users change their nicknames
- [x] Show users who are currently typing
- [x] Format markdown messages and highlight codes!
- [ ] Let user send photos in the cat.
- [ ] Gif searcher is a must.
- [ ] Send notifications about new messages to active users
- [ ] Auth features, so we can have user based features.
- [ ] Let users upload photos and show them near the messagebox.
- [ ] Chat rooms and private messages!
- [ ] Save chat history in redis.
- [ ] P2P audio and video calls using WebRTC!
