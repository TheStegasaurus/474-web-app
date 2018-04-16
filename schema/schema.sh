export PGHOST=data.cs.jmu.edu

echo Creating schema
echo Creating tables in seeds

psql seeds < create.sql

echo Copying data

./copy.sh

echo Finding prereqisites
./clean.sh

echo Exporting csv files
./copy_from_postgress.sh
