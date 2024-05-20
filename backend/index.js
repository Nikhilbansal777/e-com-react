const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Path to your service account key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-com-react-4b613-default-rtdb.firebaseio.com/"
});

const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Get data endpoint
app.get('/api/getData', async (req, res) => {
    try {
        const snapshot = await db.collection('mycollection').get();
        console.log(snapshot);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/api/adminCreds', async (req, res) => {
    try {
        const snapshot = await db.collection('admincred').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


// Post data endpoint
app.post('/api/postData', async (req, res) => {
    try {
        const data = req.body;
        await db.collection('mycollection').add(data);
        res.status(200).send("Document successfully written!");
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
