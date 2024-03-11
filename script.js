function openProfileInNewTab() {        //openProfileInNewTab() -> this func. is just used to open a new tab 
    const username = $('#username').val();  //#username -> it fetches the data of the username that we enter 
                                         //val-> it reads the value that we enter in input box
    if (username.trim() === '') {        // trim is used to to remove the white spaces from the starting and the end
                                        // func. checks that value we entered is empty or containing spaces
        $('#msg').html('<p class="text-danger"><i class="fa fa-info-circle"></i> Please enter a valid username.</p>'); //if username is empty it shows error message 
        $('#username').focus();          //focus -> is used to get back focus on the html element that we enter again
        return;                       // simply return 
    }
    window.open(`profile.html?username=${username}`); //is username that we enter is valid it opens a new page.
}
var input = document.getElementById("username");                   ///
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {                                    // from line 12 to line 18 
                                                                    // this function is created after we enter the username
                                                                    // if we click on enter button result will display
        event.preventDefault();
        openProfileInNewTab();
    }
});                                                                                 ///

// '_blank'