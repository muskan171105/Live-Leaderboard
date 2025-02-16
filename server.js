const express = require("express");
const { Client, Databases, Query } = require("node-appwrite");
const path = require("path");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") 
    .setProject("6749aac90038687908b7") 
    .setKey("standard_1a385caafdcb5c90115c1685d9ffbd01b43ae4672367c329176fe7cd3d04189a91549abb92f7b0102d78ebed45a52991cc2fb30efdd7aab35b92171d2641c263c85252863b8480ea5a9a514a9fc908cb1ed5068ca5e1397a04ea5e57613bbf4f5a0d41e2a57a858812dc4a626437a314232a243c474ce75c260b8e4ec22af089"); 

const database = new Databases(client);
const databaseId = "6749aaef0034b73295d6"; 
const collectionId = "679656b300020ec3e00b"; 

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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});