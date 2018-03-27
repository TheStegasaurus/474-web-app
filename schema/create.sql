DROP TABLE IF EXISTS enrollment;

CREATE TABLE enrollment (
    term integer NOT NULL,
    nbr integer NOT NULL,
    subject text NOT NULL,
    number text,
    room text,
    days text,
    beg_time text,
    end_time text,
    Instructor text,
    enrolled integer,
    enrl_cap integer
);

ALTER TABLE enrollment OWNER TO seeds;

COMMENT ON TABLE enrollment IS 'Enrollment information';


DROP TABLE IF EXISTS catalog;

CREATE TABLE catalog (
    Catalog_name text NOT NULL,
    Course_type text,
    Prefix text NOT NULL,
    Code text NOT NULL,
    Name text NOT NULL,
    Credits text,
    Typically_offered text,
    Description text,
    Prerequisite text,
    Corequisite text,
    isActive integer NOT NULL,
    Program_usage text
);

ALTER TABLE catalog OWNER TO seeds;

COMMENT ON TABLE catalog IS 'Course catalog information';


DROP TABLE IF EXISTS prereq;

CREATE TABLE prereq (
    prefix text NOT NULL,
    code text NOT NULL,
    req_prefix text NOT NULL,
    req_code text NOT NULL
);

ALTER TABLE prereq OWNER TO seeds;

COMMENT ON TABLE prereq IS 'Course prerequisite information';
