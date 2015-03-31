FROM ubermuda/phantomjs

ADD https://raw.githubusercontent.com/ariya/phantomjs/master/examples/rasterize.js /rasterize.js

ADD hello_world.js /hello_world.js
ADD serverkeepalive.js /serverkeepalive.js

VOLUME ["/srv"]
WORKDIR /srv

EXPOSE 80

# ENTRYPOINT ["/phantomjs/bin/phantomjs", "/rasterize.js"]
# ENTRYPOINT ["/phantomjs/bin/phantomjs", "/hello_world.js"]
ENTRYPOINT ["/phantomjs/bin/phantomjs", "/serverkeepalive.js", "80"]
