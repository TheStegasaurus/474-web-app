ALTER TABLE catalog ADD PRIMARY KEY (Prefix, Code);

ALTER TABLE enrollment ADD PRIMARY KEY (subject, number, nbr);
ALTER TABLE enrollment ADD FOREIGN KEY (subject, number) REFERENCES catalog (Prefix, Code);
