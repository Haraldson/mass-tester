$(function()
{
    Pusher.log = function(message) { console.log(message); };

    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('mass-tester');

    commands.bind('pusher:subscription_succeeded', function subscribed()
    {
        commands.trigger('show', { url: 'http://www.aftenposten.no/' });
        commands.trigger('open',
        {
            url: 'https://rink.hockeyapp.net/api/2/apps/3a328441c6a1bce051824ee937f219ed/app_versions/42?format=ipa&pltoken=16593bdb59b399506c6660533dc4f5e2&avtoken=2c5ee1f30ec6a196549354f9acc158228deb0723&udid=6d096c887c18aa903046f066b79192b04dc96414'
        });
    });
});
