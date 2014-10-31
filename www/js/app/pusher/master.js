$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('presence-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        commands.bind('register-device', function registerDevice(data)
        {
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
