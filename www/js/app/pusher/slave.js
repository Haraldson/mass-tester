$(function()
{
    var $body = $('body');
    $body.on('animationend webkitAnimationEnd', function()
    {
        $(this).removeClass('flash');
    });

    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('presence-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        // Gather device info
        var parser = new UAParser();
        var os = parser.getOS();
        var device = parser.getDevice();

        commands.trigger('register-device',
        {
            device: device.vendor + ' ' + device.model,
            os: os.name + ' ' + os.version
        });

        // Show a web page
        commands.bind('client-show', function show(data)
        {
            console.log('show', data);
        });

        // Open a URL directly
        commands.bind('client-open', function open(data)
        {
            $body.addClass('flash');
            window.location.href = data.url;
            window.setTimeout(window.location.reload.bind(window.location), 1000); // After animation (hard-coded right now)
        });

        commands.bind('client-refresh', window.location.reload.bind(window.location));
    });
});
