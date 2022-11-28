const newFormHandlerWO = async (event) => {
    event.preventDefault();

    const jobID = document.querySelector('input[name="job-id"]').value.trim();
    const employeeID = document.querySelector('input[name="employee-id"]').value.trim();
    const Hours_worked = document.querySelector('input[name="hours-worked"]').value.trim();
    const Date_worked = document.querySelector('input[type="date"]').value.trim();

    console.log(jobID);
    
    if (jobID&&employeeID&&Hours_worked&&Date_worked) {
        const response = await fetch ('/api/time', {
            method: 'POST',
            body: JSON.stringify({jobID,employeeID,Hours_worked,Date_worked}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok){
            document.location.replace('/timeRecords');
        } else {
            alert('Failed to create new time entry');
        }
    }
};



document
    .querySelector('.new-WO-form')
    .addEventListener('submit', newFormHandlerWO);

