// Get request url contain sometimes the favicon, do POST??
var port, server, service,
    system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: server.js <portnumber>');
    phantom.exit(1);
} else {
    port = system.args[1];
    server = require('webserver').create();

    service = server.listen(port, { keepAlive: false }, function (request, response) {
        console.log('Request at ' + new Date());
        console.log(JSON.stringify(request, null, 4));

        var body = JSON.stringify(request, null, 4);
        rasterize(request, response);
    });

    if (service) {
        console.log('Web server running on port ' + port);
    } else {
        console.log('Error: Could not create web server listening on port ' + port);
        phantom.exit();
    }
}

function rasterize(request, response) {
    var page = require('webpage').create(),
        system = require('system'),
        url = system.env['PAGE_URL'],
        t = Date.now();
        console.log('request.url: ' + decodeURIComponent(request.url));
        //decodeURIComponent(request.url)
        var queryString = "ZZ.Matrix.Alle.csv+Ziele/Ziele";
        // TODO remove slash here + screenshot.html
        // TODO give defaults, eval params, give Status from Screenshot html
        var address = url + queryString;
        var params = queryString.split("+");
        var output = params[1].replace("/", "+") + ".png" || "Test.png";
        //address = "http://kohaerenz.liaise-toolbox.eu/assets/matrizen/MatrixScreenshot.html?ZZ.Matrix.Alle.csv+Ziele/Ziele";
        //var output = "Test.png";
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/plain',
         //   'Connection': 'Keep-Alive',
         //   'Keep-Alive': 'timeout=5, max=100',
        };
        response.write('URL: ' + url + "\n");
        response.write('Params: ' + queryString + "\n");
        response.write('Data file: ' + params[1] + "\n");
        /*
        page.onError = function(msg, trace) {            
          var msgStack = ['  ERROR: ' + msg];
          system.stderr.writeLine(msg + "\n");
          if (trace) {
              msgStack.push('  TRACE:');
              trace.forEach(function(t) {
                  msgStack.push('    -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
              });
          }
          system.stderr.writeLine(msgStack.join('\n'));
        };
        // does not fire :-|
        page.onResourceTimeout = function(request) {
            console.log('ResourceTimeout');
            console.log(JSON.stringify(request));
            //console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
        };              
        page.settings.resourceTimeout = 15000;
        */
        //page.viewportSize = { width: 600, height: 600 };
        page.open(address, function (status) {
            console.log('Loading: ' + address);
            if (status !== 'success') {
                var msg = 'Unable to load the address: ' + address;
                console.log(msg);
                system.stderr.writeLine(msg);
                response.statusCode = 400;
                response.write('Error');
                response.close();
            } else {
                window.setTimeout(function () {
                    page.render(output);
                    t = Date.now() - t;
                    console.log(output + ' rendered in '+ t + ' msec');

                    response.statusCode = 200;
                    response.write('Success\n');
                    response.write('Image file: ' + output + "\n");
                    response.write('Render time: ' + t + ' msec');
                    response.close();
                }, 2000);
            }
        });
 
} // rasterize
