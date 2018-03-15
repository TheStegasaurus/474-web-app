--
-- Finds the top 10 most enrolled courses by given major
--

DROP FUNCTION IF EXISTS top_enrolled(subject text);

CREATE FUNCTION top_enrolled(subject text)
RETURNS TABLE(number text, sum bigint) AS $$

    SELECT number, sum(enrolled)
    FROM (
        SELECT distinct term, nbr, subject, number, enrolled
        FROM enrollment
        WHERE subject = $1) sub
    GROUP BY subject, number
    ORDER BY sum DESC
    LIMIT 10;

$$ LANGUAGE SQL STABLE STRICT;

ALTER FUNCTION top_enrolled(subject text) OWNER TO seeds;
