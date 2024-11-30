const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1")  
  .setProject("674ab92e000110d38081"); 

const databases = new Appwrite.Databases(client);

const databaseId = "674ab96b003a6b6d83b5"; 
const collectionId = "674ab9cc00360ba3d51a"; 

async function getLeaderboard() {
  try {
    // Fetch documents from the Appwrite database (leaderboard collection)
    const response = await databases.listDocuments(databaseId, collectionId, [], 50);  // Adjust limit as needed
    
    const leaderboard = response.documents;

    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = "";

    leaderboard.forEach((player, index) => {
      const row = document.createElement("tr");

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

document.addEventListener("DOMContentLoaded", function() {
  getLeaderboard();
});
// Update the leaderboard every 5 seconds
setInterval(getLeaderboard, 5000);  // 5000ms = 5 seconds
