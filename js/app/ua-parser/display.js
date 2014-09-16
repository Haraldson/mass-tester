$(function()
{
    var parser = new UAParser();
    var os = parser.getOS();
    var device = parser.getDevice();

    $('#mass-tester').prepend('<div id="meta">
        <p>' + os.name + ' ' + os.version + '</p>
        <p>' + device.vendor + ' ' + device.model + '</p>
    </div>');
});
