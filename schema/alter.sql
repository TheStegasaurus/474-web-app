ALTER TABLE division ADD PRIMARY KEY (div_num);

ALTER TABLE school ADD PRIMARY KEY (div_num, sch_num);
ALTER TABLE school ADD FOREIGN KEY (div_num) REFERENCES division;

ALTER TABLE college ADD PRIMARY KEY (unitid);
