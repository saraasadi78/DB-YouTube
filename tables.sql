CREATE TABLE users (
    username varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(80) NOT NULL,
	membership_date date NOT NULL,
	profile_image varchar(200),
	PRIMARY KEY (username)
);
	
CREATE TABLE channel (
    channel_id SERIAL,
    name varchar(20) NOT NULL,
    creation_date date NOT NULL,
	description varchar(100),
	image varchar(200),
	PRIMARY KEY (channel_id)
);
	
CREATE TABLE user_channel (
	id SERIAL,
	username varchar(20) NOT NULL,
	channel_id int NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_user
      FOREIGN KEY(username) 
	  REFERENCES users(username)
	  ON DELETE CASCADE,
	CONSTRAINT fk_channel
      FOREIGN KEY(channel_id) 
	  REFERENCES channel(channel_id)
	  ON DELETE CASCADE
);


CREATE TABLE video (
    video_id SERIAL,
	channel_id int NOT NULL,
    name varchar(200) NOT NULL,
    upload_date date NOT NULL,
	duration int NOT NULL,
	description varchar(100) NOT NULL,
	thumbnail_image varchar(200) NOT NULL,
	PRIMARY KEY (video_id),
	CONSTRAINT fk_channel
      FOREIGN KEY(channel_id) 
	  REFERENCES channel(channel_id)
	  ON DELETE SET NULL
);


CREATE TABLE playlist (
    playlist_id SERIAL,
	name varchar(20),
    username varchar(20) NOT NULL,
	is_public boolean NOT NULL default false,
	PRIMARY KEY (playlist_id),
	CONSTRAINT fk_user
      FOREIGN KEY(username) 
	  REFERENCES users(username)
	  ON DELETE CASCADE
);
	
CREATE TABLE playlist_video (
    id SERIAL,
    playlist_id int NOT NULL,
	video_id int NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_playlist
      FOREIGN KEY(playlist_id) 
	  REFERENCES playlist(playlist_id)
	  ON DELETE CASCADE,
	CONSTRAINT fk_video
      FOREIGN KEY(video_id) 
	  REFERENCES video(video_id)
	  ON DELETE CASCADE

);
	

CREATE TABLE comment (
	comment_id SERIAL,
	text varchar(300) NOT NULL,
	parent_comment_id int,
	PRIMARY KEY (comment_id)
);

CREATE TABLE watch (
	id SERIAL,
    username varchar(20) NOT NULL,
    video_id int NOT NULL,
	liked boolean,
	comment_id int,
	PRIMARY KEY (id),
	CONSTRAINT fk_user
      FOREIGN KEY(username) 
	  REFERENCES users(username)
	  ON DELETE SET NULL,
	CONSTRAINT fk_video
      FOREIGN KEY(video_id) 
	  REFERENCES video(video_id)
	  ON DELETE CASCADE,
	CONSTRAINT fk_comment
      FOREIGN KEY(comment_id) 
	  REFERENCES comment(comment_id)
	  ON DELETE SET NULL
);
	
		
		
	
	
	
