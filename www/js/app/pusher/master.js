$(function()
{
    var $body = $('body');

    Pusher.log = console.log;
    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        $body.on('submit', 'form.open', function(e)
        {
            e.preventDefault();
            console.log(commands);
            console.log($(this).serializeObject());
            commands.trigger('client-open', $(this).serializeObject());
        });
    });
});
