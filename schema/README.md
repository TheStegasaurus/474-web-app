# GROUP NAME

Absent-Minded Professors ("absent")


# DESCRIPTION

Our application enables policy makers to view and update a list of divisions,
schools, and colleges in Virginia. The data is based on last year's VLDS fall
membership and additional data from NCES.


# STEPS TO CREATE DATABASE

1. Download the "NCES IPEDS Colleges List" from:
http://www.weebly.com/uploads/1/1/1/0/11104538/nces_ipeds_2010_listings_vaonly.csv

   * NCES = National Center for Education Statistics
   * IPEDS = Integrated Post Secondary Education System

2. Use a spreadsheet to save columns A-F to college.csv.

3. Run create.sql to create tables with group ownership.

4. Run copy.sh on data.cs.jmu.edu to copy data from VDOE.

5. Run alter.sql to add PRIMARY/FOREIGN key constraints.

6. Run stats.sql to count rows and analyze the tables.
