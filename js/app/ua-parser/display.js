$(function()
{
    var parser = new UAParser();
    var os = parser.getOS();
    var device = parser.getDevice();

    var metaString = [
        '<div id="meta">',
            '<p>' + os.name + ' ' + os.version + '</p>',
            '<p>' + device.vendor + ' ' + device.model + '</p>',
        '</div>'
    ].join('');

    $('#mass-tester').prepend(metaString);
});
