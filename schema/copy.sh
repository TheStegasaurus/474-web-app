#!/bin/sh

export PGHOST=data.cs.jmu.edu

echo COPY enrollment FROM jmu
psql -c "COPY (
    SELECT term, nbr, subject, number, room, days, beg_time, end_time, Instructor, enrolled, enrl_cap
    FROM enrollment
    WHERE number is not null
  ) TO STDOUT;" jmu | \
  psql -c "COPY enrollment FROM STDIN;" seeds

echo COPY ugcatalog FROM jmu
psql -c "COPY (
    SELECT \"Catalog Name\", \"Course Type\", \"Prefix\", \"Code\", \"Name\", \"Credits\", \"Typically Offered:\", \"Description (Rendered no HTML)\", \"Prerequisite: (Rendered no HTML)\", \"Corequisite: (Rendered no HTML)\", \"Is Active\", \"Program Usage\"
    FROM ugcatalog
    WHERE \"Code\" is not null
  ) TO STDOUT;" jmu | \
  psql -c "COPY catalog FROM STDIN;" seeds
