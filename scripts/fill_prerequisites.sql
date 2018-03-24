--
-- Returns the course type, prefix, code, name, credits, 
-- semester typically offered, description, and prerequisite 
-- course name and number for classes with prereqs.
--

SELECT course_type, prefix, code, name, credits, typically_offered, description, prerequisite
FROM catalog
WHERE catalog.prerequisite is not NULL;
