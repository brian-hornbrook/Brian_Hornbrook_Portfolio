const overView = document.querySelector(".overview");
const githubUrl = "https://api.github.com";
const username = "brian-hornbrook";
const reposArea = document.querySelector(".repos");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const backToRepoGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


// profile
const profile = async function () {
    const userData = await fetch(`${githubUrl}/users/${username}`);
    const user = await userData.json();
    displayProfile(user);
};
profile();

const displayProfile = function (user) {
    const userProfile = document.createElement("div");
    userProfile.classList.add("user-info");
    if (user.message === "Not Found") {
        userProfile.innerHTML = "<p>Couldn't find GitHub $GitHub</p>"
    } else {
        userProfile.innerHTML =
            `<figure>
                <img src="${user.avatar_url}" alt="user avatar">
            </figure>
            <div>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Bio:</strong> ${user.bio}</p>
                <p><strong>Location:</strong> ${user.location}</p>
                <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
            </div>`;
        loadRepos();
    }
    overView.append(userProfile);
};

// repos
const loadRepos = async function () {
    filterInput.classList.remove("hide");
    const userRepos = await fetch(`${githubUrl}/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await userRepos.json();
    displayRepos(repos);
};

const displayRepos = function (repos) {
    if (repos.message === "Not Found") {
        const eachRepo = document.createElement("li");
        eachRepo.innerHTML = "<h3>Repos not Found!</h3>";
        eachRepo.style.border = "0";
        eachRepo.style.fontSize = "1.5em";
        repoList.append(eachRepo);
    } else {
        repos.forEach(repo => {
            const eachRepo = document.createElement("li");
            eachRepo.innerHTML = `<h3 class="repo">${repo.name}</h3>`;
            repoList.append(eachRepo);
        });
    }
};

// clicking repos
repoList.addEventListener("click", e => {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        loadRepoData(repoName);
    }
});

const loadRepoData = async function (repoName) {
    const retrieveRepoData = await fetch(`${githubUrl}/repos/${username}/${repoName}`);
    const repoInfo = await retrieveRepoData.json();
    const retrieveLanguagesData = await fetch(repoInfo.languages_url);
    const languagesData = await retrieveLanguagesData.json();
    const languages = [];
    for (let key in languagesData) {
        languages.push(key);
    }
    loadRepoInfo(repoInfo, languages);
};

const loadRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="https://github.com/${username}/${repoInfo.name}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.classList.remove("hide");
    reposArea.classList.add("hide");
    backToRepoGallery.classList.remove("hide");
};

// go back to repos
backToRepoGallery.addEventListener("click", () => {
    repoData.classList.add("hide");
    reposArea.classList.remove("hide");
});

// filter search for a repo
filterInput.addEventListener("input", e => {
    const inputValue = e.target.value.toLowerCase();
    const repos = document.querySelectorAll(".repo-list li");
    repos.forEach(repo => {
        if (repo.innerText.toLowerCase().includes(inputValue)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    });
});