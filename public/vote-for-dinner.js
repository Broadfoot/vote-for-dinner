(function(window, document, undefined) {

    // A reference to each of the Firebase database "tables"
    var usersDatabaseReference = firebase.database().ref('users');
    var dinnersDatabaseReference = firebase.database().ref('dinners');
    var votesDatabaseReference = firebase.database().ref('votes');

    /**
     * TODO: Add an event listener (and the corresponding HTML to the
     * index.html) so users can "register" with their name.
     * 
     * This is how you can create a new user in the database;
     * 
     *     var userReference = usersDatabaseReference.push();
     *     userReference.set(YOUR_USER_OBJECT_GOES_HERE);
     * 
     */

    /**
     * TODO: Whenever a new user is added to the database, this anonymous
     * callback function will be called. This function is also called
     * for every user in the users database when the app is first loaded.
     * 
     * When a new user is added, add it to the DOM.
     * 
     * These may come in handy:
     *   This is how to remove a user from the databsae:
     *     firebase.database().ref('users/' + userId).remove();
     * 
     *   This is how to remove a user's votes from the database:
     *     firebase.database().ref('votes/' + userId).remove();
     */
    usersDatabaseReference.on('child_added', function(snapshot) {
        // userId will be unique for every user added
        var userId = snapshot.key;

        // userData will be the YOUR_USER_OBJECT_GOES_HERE object that was
        // saved when the user registered
        var userData = snapshot.val();
    });

    /**
     * TODO: Whenever a user is removed from the database, this anonymous
     * callback function will be called.
     * 
     * When a user is removed, remove it from the DOM.
     */
    usersDatabaseReference.on('child_removed', function(snapshot) {
        // userId will be unique for every user added
        var userId = snapshot.key;
    });


})(window, document);