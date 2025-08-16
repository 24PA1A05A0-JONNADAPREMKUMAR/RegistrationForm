window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const userEntries = document.getElementById("user-entries");

  // Load saved data
  let entries = JSON.parse(localStorage.getItem("user-entries")) || [];
  displayEntries();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    // Validate DOB (18–55 years)
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    const entry = {
      name,
      email,
      password,
      dob,
      termsAccepted
    };

    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));
    displayEntries();
    form.reset();
  });

  function displayEntries() {
    userEntries.innerHTML = "";
    entries.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.termsAccepted}</td>
      `;
      userEntries.appendChild(row);
    });
  }
});