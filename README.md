A web screenshot container based on [phantomjs](http://phantomjs.org/)'s [rasterize.js](https://raw.githubusercontent.com/ariya/phantomjs/master/examples/rasterize.js).

Based on my [phantomjs container](https://github.com/ubermuda/docker-phantomjs).

## Usage

Because phantomjs runs inside the container, you need to bind mount a volume to retrieve the screenshot.

The container is configured to write screenshots to `/srv`, so bind-mounting `$PWD` (or whatever directory you want to screenshot created in) to it seems like a good idea.

    $ docker run ubermuda/screenshot
    Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]
    paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"
    image (png/jpg output) examples: "1920px" entire page, window width 1920px
                                    "800px*600px" window, clipped to 800x600

    $ docker run -v $PWD:/srv ubermuda/screenshot http://www.google.com/ google.com.png 1920px

# ok, 

docker run -v $PWD:/srv ubermuda/screenshot http://kohaerenz.liaise-toolbox.eu/assets/matrizen/MatrixParam.html?ZZ.Matrix.Alle.csv+Alle%20Ziele+Ziele/Ziele AlleZiele.png

see
https://github.com/ariya/phantomjs/blob/master/examples/render_multi_url.js

see script
