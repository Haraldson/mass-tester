$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a', { encrypted: true });
    var commands = pusher.subscribe('presence-mass-tester');

    var clientRegister = {};

    var renderDeviceOptions = function()
    {
        var hardwareSelect = $('<select name="hardware"></select>');
        var hardwareOptions = '';
        $.each(clientRegister, function()
        {
            console.log(arguments);
        });

        var softwareSelect = $('<select name="software"></select>');

        //$body.find('form').append('<select name="hardware"></select>')
    };

    commands.bind('pusher:member_added', function(member)
    {
        clientRegister[member.id] = {};
    });

    commands.bind('pusher:member_removed', function(member)
    {
        delete clientRegister[member.id];
        renderDeviceOptions();
    });

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        commands.bind('client-register', function registerDevice(data)
        {
            clientRegister[data.id] = data.device;
            renderDeviceOptions();
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
