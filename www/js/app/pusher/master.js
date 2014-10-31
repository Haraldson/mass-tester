$(function()
{
    var $body = $('body');

    Pusher.log = console.log.bind(console);
    var pusher = new Pusher('15e714e019131aecff4a', { encrypted: true });
    var commands = pusher.subscribe('presence-mass-tester');

    var clientRegister = {};

    var renderDeviceOptions = function()
    {
        var hardwares = {};
        var softwares = {};

        $.each(clientRegister, function(key, value)
        {
            var hwHashed = CryptoJS.HmacSHA256(value.hw, 'hard');
            if(!(hwHashed in hardwares))
                hardwares[hwHashed] = value.hw;

            var swHashed = CryptoJS.HmacSHA256(value.sw, 'soft');
            if(!(swHashed in softwares))
            {
                softwares[swHashed] = {
                    text: value.sw,
                    chained: hwHashed
                };
            }
        });

        var hardwareOptions = '<option value="">All</option>';
        $.each(hardwares, function(key, value)
        {
            hardwareOptions += '<option value="hash-' + key + '">' + value + '</option>';
        });
        $('select#hardware').html(hardwareOptions);

        var softwareOptions = '<option value="" class="all">All</option>';
        $.each(softwares, function(key, value)
        {
            softwareOptions += '<option value="' + key + '" class="hash-' + value.chained + '">' + value.text + '</option>';
        });
        $('select#software').html(softwareOptions);

        $("select#software").chained("select#hardware");
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
            {
                data.hardware = data.hardware.replace(/hash-/, '');
                data.software = data.software.replace(/hash-/, '');
                commands.trigger('client-open', data);
            }
        });
    });
});
