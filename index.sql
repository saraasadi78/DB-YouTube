select * from users;
select count(*) from users;
explain select username from users;
create index idx_username on users (username);
show indexes in users;
analyze TABLE users;

