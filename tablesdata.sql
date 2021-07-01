--Sample data
insert into users values ('saraasadi78','myemail@x.com','zxc123','2000/01/01','sara.png');
insert into users values ('aminerf77','aminmail@x.com','qwe987','2010/06/20','amin.png');

insert into channel values (7896,'TheEllenshow','2010/02/09','netflix','ellen.png');
insert into channel values (7897,'JimmyKimmelLive','2011/06/12','abc','jimmy.png');
insert into channel values (7899,'TheLateLateShow','2012/06/17','cbs','jamescorden.png');

insert into comment_txt values (987654,14865,'saraasadi78',987653,'it was awsome');
insert into comment_txt values (987653,14866,'aminerf77',987651,'lmao');

insert into playlist values (963852,'fun','aminerf77',true);
insert into playlist values (413146,'game','saraasadi78',false);

insert into playlist_video values (32145698,'fun',963852,54252521);
insert into playlist_video values (32145698,'game',963852,54252521);

insert into user_channel values (1455698,'aminerf77',7896);
insert into user_channel values (1455699,'saraasadi78',7899);

insert into video values (66558899,'how to run','2015/09/23',50,'in this video we are going to teach...','a.png');
insert into video values (16987813,'restore whatsapp backup','2021/04/30',60,'To restore your backup:','b.png');

insert into watch values ('saraasadi78',66558899,true,987654);
insert into watch values ('aminerf77',66558899,true,987653);
