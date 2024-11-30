const express = require("express");
const { Client, Databases, Query } = require("node-appwrite");
const path = require("path");


const app = express();
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "frontend"))); 

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") 
    .setProject("674ab92e000110d38081") 
    .setKey("standard_a11c2b401b95a20703ea289981d62eb23225f28b110396ce48d22c6a5ef83ee247941b7583d8a7087052ef714dff173529b8dafc74c9ab417758ce94859336469e50d1121ed8eda1dcaab338478aca88e4fd30cfd0435f875c216444579ccb734d5c7aeba73629b2fdd5da02f7117e45c90aea276116dca5fba9793b1394d945"); // Replace with your API key

const database = new Databases(client);
const databaseId = "674ab96b003a6b6d83b5";
const collectionId = "674ab9cc00360ba3d51a"; 

app.get("/leaderboard", async (req, res) => {
    try {
        const result = await database.listDocuments(databaseId, collectionId, [
            Query.orderDesc("score"),
        ]);
        res.json(result.documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/update-score", async (req, res) => {
    const { name, score } = req.body;

    try {
        const existingUser = await database.listDocuments(databaseId, collectionId, [
            Query.equal("name", name),
        ]);

        if (existingUser.documents.length > 0) {
            const userId = existingUser.documents[0].$id;
            await database.updateDocument(databaseId, collectionId, userId, { score });
        } else {
            await database.createDocument(databaseId, collectionId, "unique()", {
                name,
                score,
            });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
