FROM ubermuda/phantomjs

ADD https://raw.githubusercontent.com/ariya/phantomjs/master/examples/rasterize.js /rasterize.js
ADD server.js /server.js

VOLUME ["/srv"]
WORKDIR /srv

ENV PAGE_URL http://kohaerenz.liaise-toolbox.eu/assets/matrizen/MatrixScreenshot.html?

EXPOSE 80

# ENTRYPOINT ["/phantomjs/bin/phantomjs", "/rasterize.js"]
ENTRYPOINT ["/phantomjs/bin/phantomjs", "/server.js", "80"]
