$(function()
{
    // Show a web page
    window.commands.bind('show', function(data)
    {
        console.log(data);
    });

    // Open a URL directly
    window.commands.bind('open', function(data)
    {
        console.log(data);
    });
});
