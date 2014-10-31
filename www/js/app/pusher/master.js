$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a', { encrypted: true });
    var commands = pusher.subscribe('presence-mass-tester');

    var clientRegister = {};

    var renderDeviceOptions = function()
    {
        var $form = $body.find('form');

        var hardwareOptions = [];
        var softwareOptions = [];
        $.each(clientRegister, function(key, value)
        {
            if(hardwareOptions.indexOf(value.hw) == -1)
                hardwareOptions.push(value.hw);

            if(softwareOptions.indexOf(value.sw) == -1)
                softwareOptions.push(value.sw);
        });

        var $hardwareSelect = $('<select name="hardware"></select>');
        $.each(hardwareOptions, function(index, value)
        {
            $hardwareSelect.append($('<option value="' + value + '">' + value + '</option>'));
        });
        $form.find('select.hardware').remove();
        $form.append($hardwareSelect);

        var $softwareSelect = $('<select name="software"></select>');
        $.each(softwareOptions, function(index, value)
        {
            $softwareSelect.append($('<option value="' + value + '">' + value + '</option>'));
        });
        $form.find('select.software').remove();
        $form.append($softwareSelect);
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
