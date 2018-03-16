--
-- Returns a table that shows all currently available courses for a specified major
--
DROP FUNCTION IF EXISTS avail_course(subject text);

CREATE FUNCTION avail_course(subject text)
RETURNS TABLE(term integer, nbr integer, subject text, number text) AS $$

    SELECT distinct term, nbr, subject, number
    FROM enrollment
    WHERE subject = $1
    AND enrolled < enrl_cap
	AND term = 1181
    ORDER BY term, number;

$$ LANGUAGE SQL STABLE STRICT;

ALTER FUNCTION avail_course(subject text) OWNER TO seeds;
