var fs = require('fs'), path = require('path');

module.exports = function (context) {

    var platformRoot = path.join(context.opts.projectRoot, 'platforms/ios/cordova/lib');
    var podFile = path.join(platformRoot, 'Podfile.js');

    if (fs.existsSync(podFile)) {

        fs.readFile(podFile, 'utf8', function (err, data) {

            if (err) {
                throw new Error('Unable to find Podfile: ' + err);
            }

            data = data.replace("8.0", "9.3");
            data = data.replace(" do\\n", " do\\n\\tuse_frameworks!\\n");
            data = data.replace("Creating new Podfile in platforms/ios","Creating new Podfile in platforms/ios MY MY MY");

            fs.writeFile(podFile, data, 'utf8', function (err) {
                if (err) throw new Error('Unable to write into Podfile.js ' + err);
            });
        });
    } else {
        throw new Error("Coudn't find Podfile.js ");
    }
}
