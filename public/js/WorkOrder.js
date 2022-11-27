const newFormHandlerWO = async (event) => {
    event.preventDefault();

    const jobid = document.querySelector('#job-id').value.trim();
    const employeeid = document.querySelector('#employee-id').value.trim();
    const hourworked = document.querySelector('#hours-worked').value.trim();
    const dateworked = document.querySelector('#date-worked').value.trim();

    
    if (jobid && employeeid && hourworked && dateworked) {
        const response = await fetch ('/api/time', {
            method: 'POST',
            body: JSON.stringify({jobid,employeeid,hourworked,dateworked}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok){
            document.location.replace('/user'); //we need to render the workrequest list page here, need to change the route,not /user
        } else {
            alert('Failed to enter the Work Order details request');
        }
    }
};



document
    .querySelector('.new-WO-form')
    .addEventListener('submit', newFormHandlerWO);

