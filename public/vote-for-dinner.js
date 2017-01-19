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


    /**
     * TODO: Add an event listener (and the corresponding HTML to the
     * index.html) so users can add new dinner options.
     * 
     * This is how you can create a new dinner option in the database;
     * 
     *     var dinnerReference = dinnersDatabaseReference.push();
     *     dinnerReference.set(YOUR_DINNER_OBJECT_GOES_HERE);
     */


    /**
     * TODO: Whenever a new dinner is added to the database, this anonymous
     * callback function wil be called. This function is also called
     * for every dinner in the dinners database when the app is first loaded.
     * 
     * When a dinner is added, add it to the DOM.
     * 
     * These may come in handy:
     *   This is how to store a vote for a particular userId and dinnerId:
     *     firebase.database().ref('votes/' + userId).set({dinnerId: dinnerId});
     * 
     *   This is how to remove a dinner from the database:
     *     firebase.database().ref('dinners/' + dinnerId).remove();
     * 
     *   This is how to search the votes database and remove all votes for a
     *   a particular dinnerId:
     * 
     *     votesDatabaseReference.once('value', function(votesSnapshot) {
     *       votesSnapshot.forEach(function(voteSnapshot) {
     *         if (voteSnapshot.val()['dinnerId'] === dinnerId) {
     *           firebase.database().ref('votes/' + voteSnapshot.key).remove();
     *         }
     *       });
     *     });
     */
    dinnersDatabaseReference.on('child_added', function(snapshot) {
        // dinnerId will be unique for every dinner added
        var dinnerId = snapshot.key;

        // dinnerData will be the YOUR_DINNER_OBJECT_GOES_HERE object that was
        // saved when the dinner was added
        var dinnerData = snapshot.val();
    });


    /**
     * TODO: Whenever a dinner is removed from the database, this anonymous
     * callback function will be called.
     * 
     * When a dinner is removed, remove it from the DOM.
     */
    dinnersDatabaseReference.on('child_removed', function(snapshot) {
        // dinnerId will be unique for every dinner added
        var dinnerId = snapshot.key;
    });


})(window, document);
