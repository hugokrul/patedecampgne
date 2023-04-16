GroupID:
-Group 5

Authors:
-Koen Vermeulen, 4729382
-Hugo Krul, 8681929
-Sem Houtman, 4216768

Link to the website:
http://webtech.science.uu.nl/group5/

Brief explanation of the website:

Our website consist of a homepage displaying movies that are playing in the cinema right now, and if you click the “soon” button it changes to display movies that are coming to cinemas soon. 
When you click one of the movies displayed on the homepage you are redirected to a page containing information about the movie; title, plot, actors, etcetera. 
On this page it is also possible to put items in your cart so that you can order them later on. On the cart page you can see the payment details saved in your account and all the items that are currently in your cart. 
If you are not logged in yet, a link to the log-in page shows up here. 
On the log-in page it is possible to log in of course, but if you aren’t a registered user yet, you can register using the button in the top-right corner.
Once logged in it is also possible to visit the profile page, here all profile details are shown. The order history of your account is displayed here too. It shows all the movies you bought tickets for, including the date of the showing and the amount of tickets purchased.

In our database we created different tables for actors and movies because these two have a many to many relationship and it is easier to store them in two tables.
All the different users and their order history are stored in the database as well. Their passwords and creditcard details are encrypted of course.


List of the logins and passwords of all registered users:
-User1: sergey@pate.com, password: sergey
-User2: aditya@pate.com, password: aditya
-User3: koen@pate.com, password: koen
-User4: sem@pate.com, password: sem
-User5: hugo@hugo.nl, password:hugo

CREATE TABLE statements:

CREATE TABLE actor (
    actorId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL;
);

CREATE TABLE actorInMovie (
    actorId INTEGER NOT NULL,
    movieId INTEGER NOT NULL,
    CONSTRAINT actorInMovie_fk_actor FOREIGN KEY (actorId)
        REFERENCES actor(actorId),
    CONSTRAINT actorInMovie_fk_movie FOREIGN KEY (movieId)
        REFERENCES movies(movieId);
);

CREATE TABLE movies (
    movieId INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    title TEXT NOT NULL,
    movieLength INTEGER NOT NULL,
    director TEXT NOT NULL,
    playingSpan TEXT NOT NULL,
    plot TEXT NOT NULL,
);

CREATE TABLE orderHistory (
    orderId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    movieId INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    dateTimeSlot TEXT NOT NULL,
    CONSTRAINT order_fk_user FOREIGN KEY (userId)
        REFERENCES users(userId),
    CONSTRAINT order_fk_movie FOREIGN KEY (movieId)
        REFERENCES movies(movieId);
)

CREATE TABLE users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    password_iv TEXT NOT NULL,
    fullName TEXT NOT NULL,
    address TEXT NOT NULL,
    creditCard TEXT NOT NULL,
    creditCard_iv TEXT NOT NULL;
);
