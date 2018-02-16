# seeds
Spreading seed for those in need

# DESCRIPTION
Our application will allows students to easily view the course catalog and will replace the current solution.

# STEPS TO CREATE DATABASE
1. Run create.sql to create the tables with group ownership
2. Run copy.sh on data.cs.jmu.edu to copy data from the jmu database
3. Run alter.sql to add PRIMARY/FOREIGN key constraints (The data needs to be cleaned before this can be run)
4. Run stats.sql to count rows and analyze tables
