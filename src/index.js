document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const tableBody = document.getElementById('table-body');
    let currentDogId = null;

    function fetchDogs() {
        fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(dogs => renderTable(dogs));
    }

    function renderTable(dogs) {
        tableBody.innerHTML = '';
        dogs.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td>
                    <button class="edit-btn" data-id="${dog.id}">Edit</button>
                </td>
            `;
            row.querySelector('.edit-btn').addEventListener('click', () => {
                currentDogId = dog.id;
                dogForm.name.value = dog.name;
                dogForm.breed.value = dog.breed;
                dogForm.sex.value = dog.sex;
            });
            tableBody.appendChild(row);
        });
    }

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!currentDogId) return;

        const updatedDog = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        };

        fetch(`http://localhost:3000/dogs/${currentDogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDog)
        })
        .then(() => {
            fetchDogs();
            dogForm.reset();
            currentDogId = null;
        });
    });

    fetchDogs();
});
