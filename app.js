function displayProfile(profile) {
    const profileDiv = $('#profile');
    profileDiv.html(`
    <hr>
    <section class="section about-section" id="about">
        <div class="">
            <div class="row align-items-center flex-row-reverse">
                <div class="col-lg-6">
                    <div class="about-text go-to">
                        <h3 class="dark-color">${profile.name}</h3>
                        <span class="mb-3">${profile.bio}</span>
                        <div class="row about-list">
                            <div class="col-md-6">
                                <div class="media">
                                    <label><i class="fa fa-map-marker"></i></label>
                                    <p>${profile.location}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="media">
                                    <label><i class="fa fa-building"></i></label>
                                    <p>${profile.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-avatar">
                        <center><img src="${profile.avatar_url}"  alt="Profile Picture"></center>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="counter">
                <div class="row">
                    <div class="col-6 col-lg-4">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="500" data-speed="500">${profile.public_repos}</h6>
                            <p class="m-0px font-w-600"><i class="fa fa-folder-open"></i> Public Repositories</p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-4">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="150" data-speed="150">${profile.followers}</h6>
                            <p class="m-0px font-w-600"><i class="fa fa-users"></i> Followers</p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-4">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="850" data-speed="850">${profile.following}</h6>
                            <p class="m-0px font-w-600"><i class="fa fa-user-plus"></i> Following</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`);
}

function displayRepositories(repos) {
    const repoDiv = $('#repositories');
    repoDiv.html('<h5 class="mt-4">Repositories:</h5>');
    const ul = $('<ul></ul>').addClass('list-group');
    repos.forEach(repo => {
        const repoLink = $('<a></a>').attr('href', repo.html_url).attr('target', '_blank').text(repo.full_name);
        const li = $('<li></li>').addClass('list-group-item').append(repoLink);
        ul.append(li);
    });
    repoDiv.append(ul);
}


const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');


if (username) {
    fetchProfile();
}
function fetchProfile() {
    const profileDiv = $('#profile');
    const loader = $('#loader');

    loader.css('display', 'block');

    $.ajax({
        url: `https://api.github.com/users/${username}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.message === "Not Found") {
                profileDiv.html('<p class="text-danger">User not found</p>');
            } else {
                displayProfile(data);
                fetchRepositories();
            }
        },
        error: function (error) {
            console.error('Error fetching data:', error);
            profileDiv.html('<p class="text-center text-danger"><i class="fa fa-times-circle"></i> No Data Found.</p>');
        },
        complete: function () {
            loader.css('display', 'none');
        }
    });
}

// Function to fetch user's repositories
function fetchRepositories() {
    $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayRepositories(data);
        },
        error: function (error) {
            console.error('Error fetching repositories:', error);
            $('#repositories').html('<p class="text-center text-danger">Error fetching repositories.</p>');
        }
    });
}