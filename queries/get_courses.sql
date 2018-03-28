--
-- Returns courses offered for a specified major and their respective descriptions
--

DROP FUNCTION IF EXISTS major_course(subject text);

CREATE FUNCTION major_course(subject text)
RETURNS TABLE(prefix text, code text, name text, description text) AS $$

    SELECT prefix, code, name, description
    FROM catalog
    WHERE prefix = $1
    ORDER BY code;

$$ LANGUAGE SQL STABLE STRICT;

ALTER FUNCTION major_course(subject text) OWNER TO seeds;
