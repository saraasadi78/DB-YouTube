CREATE TABLE users (
    username varchar(20) NOT NULL PRIMARY KEY,
	email varchar(50) NOT NULL,
	password varchar(20) NOT NULL,
	membershipDate date NOT NULL,
	profileimage varchar(200) 
	);
	
CREATE TABLE video (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    uploadDate date NOT NULL,
	duration int NOT NULL,
	description varchar(100) NOT NULL,
	thumbnailimage varchar(200) NOT NULL
	);
	
CREATE TABLE channel (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    creationDate date NOT NULL,
	description varchar(100) NOT NULL,
	image varchar(200) NOT NULL
	);
	
CREATE TABLE user_channel (
	id int NOT NULL,
	username varchar(20) NOT NULL,
	channelid int NOT NULL
   	);		
	
CREATE TABLE playlist_video (
    id int NOT NULL primary key,
    name varchar(20) NOT NULL,
    playlistid int NOT NULL,
	videoid int NOT NULL
	);
	
CREATE TABLE watch (
    username varchar(20) NOT NULL,
    videoid int NOT NULL,
	liked bool NOT NULL,
	commentid int NOT NULL
	);
	
CREATE TABLE comment_txt (
	commentid int NOT NULL primary key,
	videoid int,
	userid varchar(20),
	parentcommentid int NOT NULL,
	text varchar(1000) NOT NULL
   	);
		
CREATE TABLE playlist (
    id int NOT NULL primary key,
	name varchar(20),
    username varchar(20) NOT NULL,
	ispublic bool
	);
		
	
	
	
