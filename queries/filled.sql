--
-- Finds the times that this course has seats left open
-- NOTE: we should probably change this to take in a major, number 
--       that returns the number of seats left over for each class
--       then could display a chart that shows the percentage of
--       seats left over

DROP FUNCTION IF EXISTS filled(subject text, number text);

CREATE FUNCTION filled(subject text, number text)
RETURNS TABLE(term integer, enrolled integer, enrl_cap integer) AS $$

    SELECT term, enrolled, enrl_cap
    FROM (
        SELECT distinct term, nbr, subject, number, enrolled, enrl_cap
        FROM enrollment
        WHERE subject = $1
	    AND number = $2) sub
    WHERE enrolled < enrl_cap
    ORDER BY term;

$$ LANGUAGE SQL STABLE STRICT;

ALTER FUNCTION filled(subject text, number text) OWNER TO seeds;
