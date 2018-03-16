--
-- Returns courses offered for a specified major and their respective descriptions
--

DROP FUNCTION IF EXISTS major_course(subject text);

CREATE FUNCTION major_course(subject text)
RETURNS TABLE(Name text, Prefix text, Code text, Description text) AS $$

    SELECT "Prefix", "Code", "Name", "Description (Rendered no HTML)" AS "Description" 
    FROM ugcatalog 
    WHERE "Prefix" = $1 
    ORDER BY "Code";

$$ LANGUAGE SQL STABLE STRICT;

ALTER FNCTION major_course(subject text) OWNER TO seeds;
