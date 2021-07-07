
Declare @username varchar
declare @email varchar
declare @password varchar
declare @membershipDate date
declare @profileimage varchar
insert into users values (@username,@email,@password,@membershipDate,@profileimage);

Declare @name varchar
Declare @creationDate date 
Declare @description varchar
Declare @image varchar
insert into channel values(default,@name,@creationDate,@description, @image);

Declare @username varchar
Declare @videoid int
Declare @liked bool
Declare @commentid int
insert into watch values(@username,@videoid,@liked,@commentid)

select @id= insert into channel values();
insert into user_channel valuse(@username,@id)


