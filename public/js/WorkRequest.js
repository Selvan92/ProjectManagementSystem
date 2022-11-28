const newFormHandler = async (event) => {
    event.preventDefault();

    const customerID = document.querySelector('#customer-id').value.trim();
    const job_description = document.querySelector('#job-description').value.trim();

    console.log(customerID);
    console.log(job_description);
    
    if (customerID&&job_description) {
        const response = await fetch ('/api/jobs', {
            method: 'POST',
            body: JSON.stringify({customerID,job_description}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok){
            document.location.replace('/jobs');
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
            document.location.replace('/user');
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