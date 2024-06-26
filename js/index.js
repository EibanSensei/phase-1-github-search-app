document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const query = searchInput.value;
      searchUsers(query);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = ''; 
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" width="50" height="50">
          <p><strong>${user.login}</strong></p>
          <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        userItem.addEventListener('click', () => {
          fetchUserRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">Repository</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });