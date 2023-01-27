#criando o data base the_resident_zombie_api

drop database if exists `the_resident_zombie_api`;
create database if not exists `the_resident_zombie_api`;
use `the_resident_zombie_api`;

#criando a tabela de sobreviventes
create table if not exists `sobreviventes`(
	`sobrevivente_id` int(11) auto_increment,
    `nome` varchar(255) not null,
    `idade` int(11) not null,
    `genero` varchar(255),
    `latitude` decimal(8,6) not null,
    `longitude` decimal(9,6) not null,
    `Status` varchar(255) not null,
		primary key(`sobrevivente_id`)
);

#criando tabela de iventario
create table if not exists `iventario`(
	`iventario_id` int(11) auto_increment,
    `item` varchar(255) not null,
    `sobrevivente_id` int(11) not null,
    foreign key(sobrevivente_id) references sobreviventes(sobrevivente_id) on update cascade on delete cascade,
		primary key(`iventario_id`)
);

create table if not exists `denuncias`(
	`denuncia_id` int(11) auto_increment,
    `id_denuciante` int(11) not null,
    `id_denunciado` int(11) not null,
    primary key(`denuncia_id`)
);

#inserindo dados para teste nas tabela
INSERT INTO `the_resident_zombie_api`.`sobreviventes` (`nome`, `idade`, `genero`, `latitude`, `longitude`, `Status`) VALUES ('maycon', '20', 'masculino', '11.114455', '111.256478', 'sobrevivente');
INSERT INTO `the_resident_zombie_api`.`sobreviventes` (`nome`, `idade`, `genero`, `latitude`, `longitude`, `Status`) VALUES ('alyson', '20', 'masculino', '12.152678', '251.112233', 'sobrevivente');
INSERT INTO `the_resident_zombie_api`.`sobreviventes` (`nome`, `idade`, `genero`, `latitude`, `longitude`, `Status`) VALUES ('gabriel', '37', 'masculino', '15.125789', '381.222389', 'infectado');

INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('faca', '1');
INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('ak47', '1');
INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('agua', '1');
INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('comida', '1');
INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('katana', '2');
INSERT INTO `the_resident_zombie_api`.`iventario` (`item`, `sobrevivente_id`) VALUES ('glock_s', '2');
 

select s.*,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id;




