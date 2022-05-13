insert into branches(branchName, branchAdress) values 
    ('GM', 'Andijon'),
    ('Xalq', 'Tashkent'),
    ('Ravon', 'Tashkent');

insert into staffs(staffName, branchId, password, birthdate, gender) values 
    ('Xayrulloh', 1, 'xx2002abd', '2002-10-07', 'male'), 
    ('Shirina', 2, 'xx2002ab', '2006-10-07', 'female'), 
    ('Abror', 3, 'xx2002a', '2004-10-07', 'male');

insert into permissions(staffId, add_transport, change_transport, delete_transport, add_branch, change_branch, delete_branch, toAll, read_transport, read_branch, read_permission, read_stuff) 
    values 
    (1, '1-3', '1', '3', true, '1-2', '1', true, true, true, true, true),
    (2, '1-3', '2', '2-3', true, '1-3-2', '1-2', false, false, false, true, true),
    (3, '1-2', '3', '3-1', true, '2', '3', false, false, false, true, false);

insert into transports(branchId, model, color, img) values 
    ('1', 'Cobalt', 'black', 'Cobalt.png'),
    ('2', 'Tracker', 'white', 'Tracker.png'),
    ('3', 'Gentra', 'black', 'Gentra.png');
