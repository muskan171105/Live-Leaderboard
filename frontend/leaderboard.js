const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1")  
  .setProject("674c1377002c0b1b98d9"); 

const databases = new Appwrite.Databases(client);

const databaseId = "674c139a000e63d9ae2c"; 
const collectionId = "6757f9740038df24bcdb"; 

async function getLeaderboard() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [], 50);  
    
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
setInterval(getLeaderboard, 5000);  
