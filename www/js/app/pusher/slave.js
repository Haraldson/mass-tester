$(function()
{
    var $body = $('body');
    $body.on('animationend webkitAnimationEnd', function()
    {
        $(this).removeClass('flash');
    });

    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    // Show a web page
    commands.bind('client-show', function(data)
    {
        console.log('show', data);
    });

    // Open a URL directly
    commands.bind('client-open', function(data)
    {
        $body.addClass('flash');
        window.location = data.url;
        window.setTimeout(History.go.bind(History, -1), 500);
    });
});
