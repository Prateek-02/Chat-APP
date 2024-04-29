document.getElementById("loginBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const userName = document.getElementById("userName").value.trim();
    const password = document.getElementById("pwd").value.trim();
    
    // Basic validation logic
    if (userName === "") {
        alert("Please enter a username.");
    } 
    else if(password === ""){
        alert("Please enter a valid password.");
    }
    else {
        // Redirect to index.html
        window.location.href = "index.html";
        // Store username in localStorage for use in index.html
        localStorage.setItem("username", userName);
    }
});