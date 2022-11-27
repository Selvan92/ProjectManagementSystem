const loginFormHandler = async (event) => {
    event.preventDefault();
    
    //Collect the values from the login form
    const username = document.querySelector('#username-login').ariaValueMax.trim();
    const password = document.querySelector('#password-login').ariaValueMax.trim();

    if(username && password){
        //Send a POST request to the API endpoint to check if the login is correct
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });

        if(response.ok){
            //If the login is accepted, the browser will be directed to the the profile page
            document.location.replace('/user');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.logon_form')
  .addEventListener('submit', loginFormHandler);


