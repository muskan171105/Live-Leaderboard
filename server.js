const express = require("express");
const { Client, Databases, Query } = require("node-appwrite");
const path = require("path");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") 
    .setProject("674c1377002c0b1b98d9") 
    .setKey("standard_33d2f2ea27970f47d1fc0fec49d7e4324d168c29008080930d9da6682f7076af872b94312d5de80ae82f4dda7e5a33b52a6bf69908429b995ddd4e8d097f2f7f4aa8fc47f4927822ba268788e892c7f42d36d4355e823f3e5ac2427a61f0636d49beb162eaaec151b3ba84a5ea95ffb5d3d385dc11e92317eded3c8f2b81b816"); 

const database = new Databases(client);
const databaseId = "674c139a000e63d9ae2c"; 
const collectionId = "6757f9740038df24bcdb"; 

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
