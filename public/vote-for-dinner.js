(function(window, document, undefined) {

    // A reference to each of the Firebase database "tables"
    var usersDatabaseReference = firebase.database().ref('users');
    var dinnersDatabaseReference = firebase.database().ref('dinners');
    var votesDatabaseReference = firebase.database().ref('votes');

    var userLookup = {};
    var dinnerLookup = {};
 
    /**
     * TODO: Add an event listener (and the corresponding HTML to the
     * index.html) so users can "register" with their name.
     * 
     * This is how you can create a new user in the database;
     * 
     *     var userReference = usersDatabaseReference.push();
     *     userReference.set(YOUR_USER_OBJECT_GOES_HERE);
     */

     document.getElementById("adduser")
             .addEventListener("click", function(event) {
               var userName = document.getElementById("userName").value;

               var userListItem = document.createElement("li");
               userListItem.innerText = userName;

               var userList = document.getElementById("users");
               userList.appendChild(userListItem);
             });
          });




     document.getElementById('addNewUser')
             .addEventListener('click', function() {
               // get the user input and clear
               var userName = document.getElementById('userName').value;
               document.getElementById('userName').value = '';

               // create a new user and set the name
               var userRef = usersDatabaseReference.push();
               userRef.set({name: userName});
             });


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
        // get the user information from the snapshot
        var userId = snapshot.key;
        var userData = snapshot.val();
        var userName = userData.name;

        // store a local reference
        userLookup[userId] = userName;

        // create the list item that will parent the user components
        var userListItem = document.createElement('li');
        userListItem.id = 'user-' + userId;

        // create a radio button so users will be able to select
        // themselves when voting
        var userRadio = document.createElement('input');
        userRadio.type = 'radio';
        userRadio.name = 'userName';
        userRadio.value = userId;
        userListItem.appendChild(userRadio);

        // create a text node to display the name
        var nameNode = document.createTextNode(userName);
        userListItem.appendChild(nameNode);

        // create a delete button so users will be able
        // to remove themselves from the system
        var deleteButton = document.createElement('button');
        deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function(event) {
          // remove the user from the users database
          firebase.database().ref('users/' + userId).remove();

          // remove vote mapping
          firebase.database().ref('votes/' + userId).remove();
        });
        userListItem.appendChild(deleteButton);
        
        // append the user list item to the user list
        document.getElementById('userList').appendChild(userListItem);     
    });


    /**
     * TODO: Whenever a user is removed from the database, this anonymous
     * callback function will be called.
     * 
     * When a user is removed, remove it from the DOM.
     */
    usersDatabaseReference.on('child_removed', function(snapshot) {
      // get the user information from the snapshot
      var userId = snapshot.key;

      // remove the user list item
      document.getElementById('user-' + userId).remove();

      // remove the local reference
      delete userLookup[userId];
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
    document.getElementById('addNewDinner')
            .addEventListener('click', function() {
              var dinnerName = document.getElementById('dinnerName').value;
              document.getElementById('dinnerName').value = '';

              // create a new dinner option and set the name
              var dinnerRef = dinnersDatabaseReference.push();
              dinnerRef.set({name: dinnerName});
            });

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
      // get the dinner information from the snapshot
      var dinnerId = snapshot.key;
      var dinnerData = snapshot.val();
      var dinnerName = dinnerData.name;

      // store a local reference
      dinnerLookup[dinnerId] = dinnerName;

      // create the list item that will parent the user components
      var dinnerListItem = document.createElement('li');
      dinnerListItem.id = 'dinner-' + dinnerId;

      // set the text to display the name
      dinnerListItem.innerText = dinnerName;

      // create a button for voting
      var voteButton = document.createElement('button');
      voteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
      voteButton.innerText = 'Vote';
      voteButton.addEventListener('click', function() {
        var selectedUserName;

        var userNames = document.getElementsByName('userName');

        for (var i = 0; i < userNames.length; i++) {
          if (userNames[i].checked) {
            selectedUserName = userNames[i];
            break;
          }
        }

        if (selectedUserName) {
          // get the user information from the selected radio
          var userId = selectedUserName.value;

          // save the user vote
          firebase.database().ref('votes/' + userId).set({dinnerId: dinnerId});
        } else {
          alert('You did not select a username!');
        }
      });
      dinnerListItem.appendChild(voteButton);

      // create a button for deleting the dinner option
      var deleteButton = document.createElement('button');
      deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', function() {
        // remove the dinner from the dinners database
        firebase.database().ref('dinners/' + dinnerId).remove();

        // query the votes database and remove everything
        // with a matching dinner vote
        votesRef.once('value', function(votesSnapshot) {
          votesSnapshot.forEach(function(voteSnapshot) {
            if (voteSnapshot.val()['dinnerId'] === dinnerId) {
              firebase.database().ref('votes/' + voteSnapshot.key).remove();
            }
          });
        });
      });
      dinnerListItem.appendChild(deleteButton);

      // append the dinner list item to the dinner list
      document.getElementById('dinnerList').appendChild(dinnerListItem);
    });


    /**
     * TODO: Whenever a dinner is removed from the database, this anonymous
     * callback function will be called.
     * 
     * When a dinner is removed, remove it from the DOM.
     */
    dinnersDatabaseReference.on('child_removed', function(snapshot) {
      // get the dinner information from the snapshot
      var dinnerId = snapshot.key;

      // remove the dinner list item
      document.getElementById('dinner-' + dinnerId).remove();

      // remove the local reference
      delete dinnerLookup[dinnerId];
    });


    /**
     * TODO: Whenever a vote is added to the database, this anonymous
     * callback function will be called. This function is also called
     * for every vote in the votes database when the app is first loaded.
     * 
     * When a vote is added, add it to the DOM.
     */
    votesDatabaseReference.on('child_added', function(snapshot) {
      // get the user information from the snapshot
      var userId = snapshot.key;
      var voteData = snapshot.val();
      var dinnerId = voteData.dinnerId;

      // create the list item
      var voteListItem = document.createElement('li');
      voteListItem.id = 'vote-' + userId;
      voteListItem.innerText = userLookup[userId] + ' voted for ' + dinnerLookup[dinnerId];

      // append the vote list item to the vote list
      document.getElementById('voteList').appendChild(voteListItem);  
    });


    /**
     * TODO: Whenever a vote is changed, this anonymous callback function
     * will be called.
     * 
     * When a vote is changed, update the DOM.
     */
    votesDatabaseReference.on('child_changed', function(snapshot) {
      // get the user information from the snapshot
      var userId = snapshot.key;
      var voteData = snapshot.val();
      var dinnerId = voteData.dinnerId;

      document.getElementById('vote-' + userId).innerText = userLookup[userId] + ' voted for ' + dinnerLookup[dinnerId];
    });


    /**
     * TODO: Whenever a vote is removed from the database, this anonymous
     * callback function will be called. If everything is working correctly,
     * votes should be removed if a user or dinner is deleted.
     * 
     * When a vote is removed, remove it from the DOM.
     */
    votesDatabaseReference.on('child_removed', function(snapshot) {
      // get the user information from the snapshot
      var userId = snapshot.key;

      // remove the vote list item
      document.getElementById('vote-' + userId).remove();
    });

})(window, document);
