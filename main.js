
let btn = document.getElementById("generateBtn");
let count = document.getElementById("userCount");
let output = document.getElementById("output");

btn.addEventListener("click", async function() {

    let number = Number(count.value);

    // requested number of profiles is valid or not
    if (number < 1 || number > 20 || !Number.isInteger(number)) {
        window.alert("Enter a number between 1 and 20");
        return;
    }

    try {
        output.innerHTML = "Loading users...";

        // ask User for the number of profiles entered in the form.
        let response = await fetch(`https://randomuser.me/api/?results=${number}`);

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        let data = await response.json();

        // Clear the loading message 
        output.innerHTML = "";

        // Show the photo and contact details 
        data.results.forEach(function(user) {
            output.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card p-3 text-center h-100 shadow-sm">

                        <img src="${user.picture.large}"
                             class="rounded-circle mx-auto mb-3"
                             width="120" height="120">

                        <h5>${user.name.first} ${user.name.last}</h5>

                        <p>Email: ${user.email}</p>

                        <p>Location: ${user.location.city},
                        ${user.location.country}</p>

                        <p>Phone: ${user.phone}</p>

                    </div>
                </div>
            `;
        });

    } catch (error) {
        // Let the user know if the request fails
        output.innerHTML = "<p class='text-danger'>Something went wrong!</p>";
        console.log(error);
    }

});
