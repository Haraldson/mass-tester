var express = require('express');
var Pusher = require('pusher');

var app = express(express.logger());
app.use(express.bodyParser());

var pusher = new Pusher(
{
    appId: '89619',
    key: '15e714e019131aecff4a',
    secret: '7f8f536675c058a2008c'
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/www'));

var userIds = [];

app.post('/pusher/auth', function(req, res)
{
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;

    var user_id = userIds.length + 1;
    userIds.push(user_id);

    var presenceData = {
        user_id: user_id,
        user_info: {
            name: 'Slave ' + user_id,
            req: req
        }
    };

    var auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

app.listen(app.get('port'), function()
{
    console.log("Node app is running at localhost:" + app.get('port'));
});
