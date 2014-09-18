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
            commands.trigger('client-open', $(this).serializeObject());
        });

        $body.on('click', 'button.client-refresh', function clientRefresh(e)
        {
            e.preventDefault();
            commands.trigger('client-refresh');
        });
    });
});
