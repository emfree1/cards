const StarWars = axios.create({
    baseURL: 'https://swapi.dev/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const deleteUser = async (userId) => {
    try {
        const deletePeople = await StarWars + '/people/' + userId;
        console.log('deletePeople: ', deletePeople);
    } catch (err) {
        console.log('error in deleteUser: ', err);
    }
}

const renderUsers = (usersAll) => {
    const container = document.querySelector('.users');
    usersAll.forEach(element => {
        const userElement = document.createElement('div');
        userElement.classList.add('user')
        userElement.innerHTML = `
        <h4>Name - ${element.name}</h4>
        <h5>Birth year - ${element.birth_year}</h5>`;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', () => {
            userElement.remove();
        })

        userElement.append(removeBtn)
        container.append(userElement)
    });

}

const loadUsers = async () => {

    const users = await StarWars.get('/people');
    const usersAll = users.data.results;
    renderUsers(usersAll);

};
const loadBtn = document.querySelector('.load-users')
loadBtn.addEventListener('click', loadUsers);