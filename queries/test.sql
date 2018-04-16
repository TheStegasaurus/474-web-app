use c9;
DELIMITER //

DROP PROCEDURE IF EXISTS avg_seats_left //

CREATE PROCEDURE 
  avg_seats_left(s  text)
BEGIN  
    SELECT number, avg(enrl_cap - enrolled) as avg_left
    FROM (
	    SELECT distinct term, nbr, subject, number, enrolled, enrl_cap
	    FROM enrollment
	    WHERE subject = s
	    AND enrl_cap > 0) sub
    GROUP BY number
   ;  
END 
//

DELIMITER ;