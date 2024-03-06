const usernameForm = document.getElementById('usernameForm');
const usernameInput = document.getElementById('usernameInput');
const profileContainer = document.getElementById('profile');

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('User not found');
                }
            })
            .then(data => {
                const profileInfo = `
                    <div class="profile-info">
                        <a href="${data.html_url}" target="_blank">View on GitHub</a>
                    </div>
                `;
                profileContainer.innerHTML = profileInfo;
                profileContainer.style.display = 'block';
            })
            .catch(error => {
                profileContainer.innerHTML = `<p>${error.message}</p>`;
                profileContainer.style.display = 'block';
            });
    }
});
