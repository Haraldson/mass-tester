$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a', { encrypted: true });
    var commands = pusher.subscribe('presence-mass-tester');

    var clientRegister = [];

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        
        commands.bind('client-register-device', function registerDevice(data)
        {
            clientRegister.push()
            console.log('register device', data);
        });

        $body.on('submit', 'form.open', function open(e)
        {
            e.preventDefault();

            var data = $(this).serializeObject();

            if('url' in data && data.url == '')
                commands.trigger('client-refresh', {});
            else
                commands.trigger('client-open', data);
        });
    });
});
