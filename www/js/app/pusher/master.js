$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
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
