function openProfileInNewTab() {
    const username = $('#username').val();
    if (username.trim() === '') {
        $('#msg').html('<p class="text-danger"><i class="fa fa-info-circle"></i> Please enter a valid username.</p>');
        $('#username').focus();
        return;
    }
    window.open(`profile.html?username=${username}`);
}
var input = document.getElementById("username");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        openProfileInNewTab();
    }
});

// '_blank'