delimiter $$
 CREATE TRIGGER language_alert
     AFTER INSERT ON countrylanguage
     FOR EACH ROW
     BEGIN
       DECLARE language_count INT;
       SET language_count = (SELECT COUNT(*) FROM countrylanguage WHERE CountryCode = NEW.CountryCode);
      
      IF language_count >= 10 THEN
         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Total number of languages equals or exceeds 10';
      END IF;
     END //



 delimiter ;

