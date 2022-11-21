const newFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#customer-id').value.trim();
    const jobDescription = document.querySelector('#job-description').value.trim();
    
    if (username&&jobDescription) {
        const response = await fetch ('/api/jobs', {
            method: 'POST',
            body: JSON.stringify({username,jobDescription}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok){
            document.location.replace('/profile');
        } else {
            alert('Failed to create new job request');
        }
    }
};

const delButtonHandler = async(event) => {
    if (event.target.hasAttribute('data-id')){
        const id = event.target.hasAttribute('data-id');

        const response = await fetch(`/api/jobs/${id}`,{
            method: 'DELETE',
        });

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to deleted job');
        }
    }
}

document
    .querySelector('.new-job-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.job-list')
    .addEventListener('click',delButtonHandler);