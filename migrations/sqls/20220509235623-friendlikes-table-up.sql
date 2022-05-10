create table friendlikes (
   id varchar(32) primary key not null,
   timestamp varchar(64) not null,
   send_to_user_id varchar(128) not null,
   liked_by_user_id varchar(128) not null,
   liked_by_user_name varchar(128) not null,
   track_name varchar(128) not null,
   artist_name varchar(128) not null,
   track_uri varchar(128) not null,
   artist_uri varchar(128) not null
);