$(function()
{
    var pusher = new Pusher('15e714e019131aecff4a');
    var commands = pusher.subscribe('private-mass-tester');

    $body = $('body');
    $body.on('animationend webkitAnimationEnd', function()
    {
        $(this).removeClass('flash');
    });

    // Show a web page
    commands.bind('client-show', function(data)
    {
        console.log('show', data);
    });

    // Open a URL directly
    commands.bind('client-open', function(data)
    {
        $body.addClass('flash');
        console.log(data);

        $('<a href="' + data.url + '"></a>')
            .appendTo($body)
            .click()
            .delay(200)
            .remove();
    });
});
