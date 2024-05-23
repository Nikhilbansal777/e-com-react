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

// Increase the payload limit before other middlewares
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(cors({ origin: true }));

// Get data endpoint
app.get('/api/getData', async (req, res) => {
    try {
        const snapshot = await db.collection('mycollection').get();
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


app.post("/api/signup", async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;

        // Check if email already exists
        const emailQuery = await db.collection('signup').where('email', '==', email).get();

        if (!emailQuery.empty) {
            // Email already exists
            res.status(400).send("Email already exists!");
        } else {
            // Email does not exist, add new document
            await db.collection('signup').add(data);
            res.status(200).send("Document successfully written!");
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const snapshot = await db.collection('signup').where('email', '==', email).get();

        if (snapshot.empty) {
            // If no users found with the provided email
            return res.status(400).json({ message: "Email not found. Please check your email and try again." });
        }

        // Assuming email is unique, we fetch the first document from the snapshot
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === password) {
            // If password matches, return success response
            res.status(200).json({ message: "Sign in successful!", user: userData });
        } else {
            // If password does not match, return error response
            res.status(400).json({ message: "Your authentication info is wrong, please enter correct details." });
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


app.post("/api/addNewProduct", async (req, res) => {
    try {
        const data = req.body;
        await db.collection('newProduct').add(data);
        res.status(200).send({ message: "Product added successfully!" });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/api/getProducts', async (req, res) => {
    try {
        const snapshot = await db.collection('newProduct').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/api/getCategoryProducts/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const snapshot = await db.collection('newProduct').where('category', '==', category).get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(products);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
