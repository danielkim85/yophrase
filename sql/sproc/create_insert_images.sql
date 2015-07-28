CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `ext` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
DELIMITER $$
CREATE DEFINER=`yophrase`@`%` PROCEDURE `insert_images`(IN my_owner varchar(45), IN ext varchar(45))
BEGIN
	start transaction;
	insert into images(owner,ext) values(my_owner, ext);
    select last_insert_id();
    commit;
END$$
DELIMITER ;
