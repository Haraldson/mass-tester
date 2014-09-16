$(function()
{
    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    // Show a web page
    commands.bind('client-show', function(data)
    {
        console.log(data);
    });

    // Open a URL directly
    commands.bind('client-open', function(data)
    {
        console.log(data);
    });
});
