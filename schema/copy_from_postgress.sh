#!/bin/sh
rm -f ../*.csv

export PGHOST=data.cs.jmu.edu


psql seeds -c "\copy (SELECT * FROM catalog) To '../catalog.csv' With CSV DELIMITER '|';"
psql seeds -c "\copy (SELECT * FROM enrollment) To '../enrollment.csv' With CSV DELIMITER '|';"
psql seeds -c "\copy (SELECT * FROM prereq) To '../prereq.csv' With CSV DELIMITER '|';"
