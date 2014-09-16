$(function()
{
    var parser = new UAParser();
    var os = parser.getOS();
    var device = parser.getDevice();

    var metaString = [
        '<div id="meta">',
            '<p>' + device.vendor + ' ' + device.model + '</p>',
            '<p>' + os.name + ' ' + os.version + '</p>',
        '</div>'
    ].join('');

    $('#mass-tester').prepend(metaString);
});
