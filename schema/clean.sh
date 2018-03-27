rm -f *.class, *.csv
psql -h data.cs.jmu.edu jmu -c "\copy (     SELECT \"Prefix\", \"Code\", \"Prerequisite: (Rendered no HTML)\" FROM ugcatalog) To 'temp.csv' With CSV DELIMITER '|';"
javac clean.java
java clean < temp.csv

psql -h data.cs.jmu.edu seeds -c "\copy prereq FROM 'prereq.csv' delimiter '|' csv;"

rm -f clean.class
rm -f *.csv
