select count(*) from users;
explain select username from users;
create index idx_username on users (username);
show indexes in users;
analyze TABLE users;
explain select name from video;
create index idx_name on video (name);
show indexes in video;
analyze TABLE video;

