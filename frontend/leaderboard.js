// Initialize the Appwrite Client
const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1")  // Your Appwrite endpoint
  .setProject("674ab92e000110d38081");  // Your Appwrite project ID

// Initialize Appwrite Databases SDK
const databases = new Appwrite.Databases(client);

// Set your database and collection IDs
const databaseId = "674ab96b003a6b6d83b5";  // Your Appwrite database ID
const collectionId = "674ab9cc00360ba3d51a";  // Your collection ID

// Get leaderboard data from Appwrite and display it
async function getLeaderboard() {
  try {
    // Fetch documents from the Appwrite database (leaderboard collection)
    const response = await databases.listDocuments(databaseId, collectionId, [], 50);  // Adjust limit as needed
    
    const leaderboard = response.documents;

    // Get table body element where leaderboard data will be displayed
    const tableBody = document.getElementById("table-body");

    // Clear the table before updating
    tableBody.innerHTML = "";

    // Add each player's data to the table
    leaderboard.forEach((player, index) => {
      const row = document.createElement("tr");

      // Create each table cell (rank, name, score)
      row.innerHTML = `
        <td class="px-4 py-2 border text-center">${index + 1}</td>
        <td class="px-4 py-2 border text-center">${player.name}</td>
        <td class="px-4 py-2 border text-center">${player.score}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}

// Call the function to load the leaderboard when the page loads
document.addEventListener("DOMContentLoaded", function() {
  getLeaderboard();
});
// Update the leaderboard every 5 seconds
setInterval(getLeaderboard, 5000);  // 5000ms = 5 seconds
