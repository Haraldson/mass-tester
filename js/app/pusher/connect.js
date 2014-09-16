$(function()
{
    window.pusher = new Pusher('15e714e019131aecff4a');
    window.commands = pusher.subscribe('mass-tester');
});
