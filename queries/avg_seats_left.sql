--
-- Finds the average number of seats left over in each class for given major
-- NOTE: This can return negatives
--

DROP FUNCTION IF EXISTS avg_seats_left(subject text);

CREATE FUNCTION avg_seats_left(subject text)
RETURNS TABLE(number text, avg_left numeric) AS $$

    SELECT number, avg(enrl_cap - enrolled) as avg_left
    FROM (
	    SELECT distinct term, nbr, subject, number, enrolled, enrl_cap
	    FROM enrollment
	    WHERE subject = $1
	    AND enrl_cap > 0) sub
    GROUP BY number

$$ LANGUAGE SQL STABLE STRICT;

ALTER FUNCTION avg_seats_left(subject text) OWNER TO seeds;
