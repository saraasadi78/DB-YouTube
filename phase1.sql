CREATE TABLE video (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    uploadDate date,
	duration int,
	description varchar(100),
	thumbnailimage varchar(200) 
	);
	
CREATE TABLE users (
    username varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	password int NOT NULL,
	membershipDate date NOT NULL,
	profileimage varchar(200) 
	);
	
CREATE TABLE playlist_video (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    playlistid int NOT NULL,
	videoid int NOT NULL
	);
	
CREATE TABLE channel (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    creationDate date NOT NULL,
	description varchar(100) NOT NULL,
	image varchar(200) 
	);
	
CREATE TABLE watch (
    username varchar(20) NOT NULL,
    videoid int NOT NULL,
	liked bool NOT NULL,
	commentid int NOT NULL
	);
	
CREATE TABLE comment_txt (
	commentid int NOT NULL,
	parentcommentid int NOT NULL
   	);
	
CREATE TABLE user_channel (
	id int NOT NULL,
	username varchar(20) NOT NULL,
	channelid int NOT NULL
   	);	
	
CREATE TABLE playlist (
    id int NOT NULL primary key,
    username varchar(20) NOT NULL,
	ispublic bool
	);
		
	
	
	