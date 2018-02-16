DROP TABLE IF EXISTS division;

CREATE TABLE division (
    div_num integer NOT NULL,
    div_name text NOT NULL
);

ALTER TABLE division OWNER TO absent;

COMMENT ON TABLE division IS 'all divisions in Virginia';


DROP TABLE IF EXISTS school;

CREATE TABLE school (
    div_num integer NOT NULL,
    sch_num integer NOT NULL,
    sch_name text NOT NULL
);

ALTER TABLE school OWNER TO absent;

COMMENT ON TABLE school IS 'all schools in Virginia';


DROP TABLE IF EXISTS enroll;

CREATE TABLE enroll (
    sch_year integer NOT NULL,
    div_num integer NOT NULL,
    sch_num integer NOT NULL,
    race text NOT NULL,
    gender text NOT NULL,
    disabil text NOT NULL,
    lep text NOT NULL,
    disadva text NOT NULL,
    grade_num integer NOT NULL,
    fall_cnt integer NOT NULL
);

ALTER TABLE enroll OWNER TO absent;

COMMENT ON TABLE enroll IS 'fall membership counts';


DROP TABLE IF EXISTS college;

CREATE TABLE college (
    unitid integer NOT NULL,
    instnm text NOT NULL,
    addr text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip text NOT NULL
);

ALTER TABLE college OWNER TO absent;

COMMENT ON TABLE college IS 'colleges and universities';
