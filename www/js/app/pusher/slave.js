$(function()
{
    var $body = $('body');
    $body.on('animationend webkitAnimationEnd', function() { $(this).removeClass('flash'); });

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a', { encrypted: true });
    var commands = pusher.subscribe('presence-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed(data)
    {
        // Gather device info
        var parser = new UAParser();
        var os = parser.getOS();
        var device = parser.getDevice();

        var deviceData = {
            hw: device.vendor + ' ' + device.model,
            sw: os.name + ' ' + os.version
        };

        var deviceDataHashed = {
            hw: CryptoJS.HmacSHA256(deviceData.hw, 'hard'),
            sw: CryptoJS.HmacSHA256(deviceData.sw, 'soft')
        };

        commands.trigger('client-register',
        {
            id: data.me.id,
            device: deviceData
        });

        // Show a web page
        commands.bind('client-show', function show(data)
        {
            console.log('show', data);
        });

        // Open a URL directly
        commands.bind('client-open', function open(data)
        {
            var targeted =
                (data.hardware == '' && data.software == '') ||
                (data.hardware == deviceDataHashed.hw && data.software == deviceDataHashed.sw) ||
                (data.hardware == deviceDataHashed.hw && data.software == '') ||
                (data.hardware == '' && data.software == deviceDataHashed.sw);

            if(!targeted)
                return;

            $body.addClass('flash');
            window.location.href = data.url;
            window.setTimeout(window.location.reload.bind(window.location), 1000); // After animation (hard-coded right now)
        });

        commands.bind('client-refresh', window.location.reload.bind(window.location));
    });
});
