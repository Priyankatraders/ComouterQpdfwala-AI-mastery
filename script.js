const regSection = document.getElementById('registration-section');
const regNameInput = document.getElementById('reg-name');
const regAgeInput = document.getElementById('reg-age');
const regButton = document.getElementById('register-button');

const profileLink = document.getElementById('profile-link');
const profileSection = document.getElementById('profile-section');
const editProfileSection = document.getElementById('edit-profile-section');
const profileDetails = document.getElementById('profile-details');
const editProfileButton = document.getElementById('edit-profile');
const saveProfileButton = document.getElementById('save-profile');
const profileNameInput = document.getElementById('profile-name');
const profileAgeInput = document.getElementById('profile-age');

const newPostSection = document.getElementById('new-post');
const postContent = document.getElementById('post-content');
const postButton = document.getElementById('post-button');
const postContainer = document.getElementById('post-container');
const postMedia = document.getElementById('post-media');

let profile = {
    name: "",
    age: ""
};

function displayProfile() {
    profileDetails.innerHTML = `<p><strong>Name:</strong> ${profile.name}</p><p><strong>Age:</strong> ${profile.age}</p>`;
}

regButton.addEventListener('click', () => {
    profile.name = regNameInput.value.trim();
    profile.age = regAgeInput.value.trim();

    if (profile.name === "" || profile.age === "") {
        alert("Please enter both name and age.");
        return;
    }

    const age = parseInt(profile.age);
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    regSection.style.display = 'none';
    newPostSection.style.display = 'block';
    profileSection.style.display = 'block';
    displayProfile();

    alert("Your registration is successful! Now you may post.");
});

profileLink.addEventListener('click', (e) => {
    e.preventDefault();  // This is crucial

    if (profileSection.style.display === 'none') {
        profileSection.style.display = 'block';
        newPostSection.style.display = 'none'; // Hide the post section
        editProfileSection.style.display = 'none';
        displayProfile();
    } else {
        profileSection.style.display = 'none';
    }
});



editProfileButton.addEventListener('click', () => {
    profileSection.style.display = 'none';
    editProfileSection.style.display = 'block';
    profileNameInput.value = profile.name;
    profileAgeInput.value = profile.age;
});

saveProfileButton.addEventListener('click', () => {
    profile.name = profileNameInput.value;
    profile.age = profileAgeInput.value;
    displayProfile();
    profileSection.style.display = 'block';
    editProfileSection.style.display = 'none';
});

postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    const mediaFile = postMedia.files[0];

    if (content === "" && !mediaFile) {
        alert("Please enter some text or select media to post.");
        return;
    }

    const newPost = document.createElement('div');
    newPost.classList.add('post');

    const postAuthor = document.createElement('div');
    postAuthor.classList.add('post-author');
    postAuthor.textContent = profile.name + ":";
    newPost.appendChild(postAuthor);

    if (content !== "") {
        const postContentDiv = document.createElement('div');
        postContentDiv.classList.add('post-content');
        postContentDiv.textContent = content;
        newPost.appendChild(postContentDiv);
    }

    if (mediaFile) {
        const mediaElement = document.createElement(mediaFile.type.startsWith('image/') ? 'img' : 'video');
        mediaElement.src = URL.createObjectURL(mediaFile);
        mediaElement.controls = mediaFile.type.startsWith('video/');
        mediaElement.style.maxWidth = '100%';
        newPost.appendChild(mediaElement);
    }

    const timestampDiv = document.createElement('div');
    timestampDiv.classList.add('post-timestamp');
    const now = new Date();
    const timestamp = now.toLocaleString();
    timestampDiv.textContent = timestamp;
    newPost.appendChild(timestampDiv);

    postContainer.insertBefore(newPost, postContainer.firstChild);
    postContent.value = '';
    postMedia.value = '';
});

