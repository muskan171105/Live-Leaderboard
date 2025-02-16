const client = new Appwrite.Client()
  .setEndpoint("https://cloud.appwrite.io/v1")  
  .setProject("6749aac90038687908b7"); 

const databases = new Appwrite.Databases(client);

const databaseId = "6749aaef0034b73295d6"; 
const collectionId = "679656b300020ec3e00b"; 

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

document.addEventListener("DOMContentLoaded", getLeaderboard);
setInterval(getLeaderboard, 5000);
