$(function() {

    const $usernameInput = $('.usernameInput');
    const $chatPage = $('.chatPage');
    const $loginName = $('.loginName');
    const $inputMessage = $('.inputMessage');
    const $messageTxt = $('#messageTxt');
    const $messages = $('#messages');

    let username;
    let $currentInput = $usernameInput.focus();

    const socket = io();


    // Prevents input from having injected markup
    function cleanInput (input) {
        return $('<div/>').text(input).html();
    }

    // Sets the client's username
    function setUsername () {
    username = cleanInput($usernameInput.val().trim());
        // If the username is valid
        if (username) {
            $('.loginPage').fadeOut('slow');
            $chatPage.show();
            socket.emit('add user', $('#userName').val());
        }
    }

    //submit events

    //loginName submit
    $loginName.submit(() => {
        setUsername();
        return false;
    });

    //inputMessage submit
    $inputMessage.submit(() => {
        socket.emit('chat message', $messageTxt.val());
        $messageTxt.val('');
        return false;
    });

    // Socket events

    //Whenever the server emits 'chat message' update the chat body
    socket.on('chat message', (data) => {
        if(data.username===$('#userName').val()){
            $messages.append(("<li class='mymessage'><span class='mymessageTxt'>" + data.message + "</span></li>"));
        }else{
            $messages.append(("<li><span class='userName'>" + data.username + "</span><span class='messageTxt'>" + data.message + "</span></li>"));
        }
    });
});
