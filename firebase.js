// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtM_PPj1hmxD0vQBN_Dbmf1dz3s5FZ7KI",
  authDomain: "doces-380a0.firebaseapp.com",
  projectId: "doces-380a0",
  storageBucket: "doces-380a0.appspot.com",
  messagingSenderId: "389035551948",
  appId: "1:389035551948:web:fc325e0b258d93ebb8e669",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to add a new entry to Firestore
function addEntry(title, date, image, author) {
  return db.collection("entries").add({
    title,
    date,
    image,
    author,
  });
}

// Function to fetch all entries from Firestore
function fetchEntries() {
  return db
    .collection("entries")
    .get()
    .then((snapshot) => {
      const entries = [];
      snapshot.forEach((doc) => entries.push(doc.data()));
      return entries;
    });
}

// Example usage:
document.getElementById("newEntryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image").value;
  const author = document.getElementById("author").value;

  addEntry(title, date, image, author)
    .then(() => {
      console.log("Entry added successfully");
      // Clear the form after successful submission
      document.getElementById("newEntryForm").reset();
      // Fetch and display all entries again to update the list
      fetchEntries().then((entries) => renderEntries(entries));
    })
    .catch((error) => console.error("Error:", error));
});

function renderEntries(entries) {
  const entriesContainer = document.querySelector(".entries");
  entriesContainer.innerHTML = ""; // Clear existing entries

  entries.forEach((entry) => {
    entriesContainer.innerHTML += `
        <div class="card">
          <img src="${entry.image}" alt="${entry.title}" class="card-img">
          <div class="card-info">
            <div class="card-title-date">
              <h2>${entry.title}</h2>
              <p>${entry.date}</p>
            </div>
            <div class="card-person">
              <p>${entry.author}</p>
            </div>
          </div>
        </div>
      `;
  });
}

// Fetch and display entries on page load
fetchEntries().then((entries) => renderEntries(entries));
