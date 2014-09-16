$(function()
{
    var parser = new UAParser();
    var browser = parser.getBrowser();
    var engine = parser.getEngine();
    var os = parser.getOS();
    var device = parser.getDevice();

    $('#mass-tester').prepend('<div id="meta">' + os + ' ' + device + '</div>');
});
