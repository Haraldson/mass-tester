$(function()
{
    Pusher.log = function(message) { console.log(message); };

    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        //commands.trigger('client-show', { url: 'http://www.aftenposten.no/' });
        commands.trigger('client-open',
        {
            url: 'itms-services://?action=download-manifest&url=https%3A%2F%2Frink.hockeyapp.net%2Fapi%2F2%2Fapps%2F3a328441c6a1bce051824ee937f219ed%2Fapp_versions%2F43%3F%26avtoken%3Da5f13f7e2985629adf954c1fee4df0341ae1cd7a%26udid%3Def5831d1ae09f95f965aded5989244c917e02af5%26iuid%3Db73b7b63a76ccf3356fb885526d20901'
        });
    });
});
