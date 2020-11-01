BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT into login (hash, email) values('asdahdkahdkjadkashdkjashd hash hash hash', 'jessie@gmail.com');

COMMIT;