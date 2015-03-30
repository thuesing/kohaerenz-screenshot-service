#!/bin/sh
# needs 1 params for Sektor Massnahme  
if [ $# -ne 3 ] 
 then 
  echo "Hi. Wrong param list. Awaiting script [*.csv Filename] [Achse1] [Achse2] Bsp.: [ZZ.Matrix.Alle.csv] [Biodiv] [Rohstoffe]"
  exit
 fi

docker run -v $PWD:/srv ubermuda/screenshot http://kohaerenz.liaise-toolbox.eu/assets/matrizen/MatrixScreenshot.html?$1+$2/$3 $2+$3.png


# get last exit code
RET=$?
if [ $RET != 0 ]
  then
    exit $RET
fi


echo "done"




