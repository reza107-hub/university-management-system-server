const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dbnnr0s.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors())
app.use(express.json())



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        // ----------------------------------------------------------
        // mongo db collection

        const usersCollection = client.db("muDatabase").collection("users");
        const usersAdditionalInformationCollection = client.db("muDatabase").collection("usersAdditionalInformation");
        const admissionRequestCollection = client.db("muDatabase").collection("admissionRequest");
        const adminCollection = client.db("muDatabase").collection("admin");
        const studentsCollection = client.db("muDatabase").collection("students")

        //------------------------------------------------------------------------
        // users list information get

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        // -----------------------------------
        // users additional information get
        app.get('/users-additional-information', async (req, res) => {
            const result = await usersAdditionalInformationCollection.find().toArray()
            res.send(result)
        })

        // ----------------------------------------------------------------
        // admin list get
        app.get('/admin-list', async (req, res) => {
            try {
                const result = await adminCollection.find().toArray()
                res.send(result)
            } catch (err) {
                console.log(err.message);
            }
        })

        //--------------------------------------------
        // students list get
        app.get('/students', async (req, res) => {
            try {
                const result = await studentsCollection.find().toArray()
                res.send(result)
            } catch (err) {
                console.log(err.message);
            }
        })


        //----------------------------------------
        // admission request get

        app.get('/admission-request', async (req, res) => {
            const result = await admissionRequestCollection.find().toArray()
            res.send(result)
        })

        //----------------------------------------

        // getting users are admin orr not

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;

            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result);
        })

        // ----------------------------------------------------------------

        // making students

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'student',
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result)
        })

        //----------------------------------------------------------------
        // students collection making

        app.post('/students', async (req, res) => {

            try {
                const details = req.body
                const date = new Date()
                const currentMonth = date.getMonth() + 1
                const lastTwoDigitsOfYear = (Number(details?.yearOfRegistration) % 100);

                const department = details?.department

                const lastStudent = await usersCollection
                    .find({ role: "student", dept: department }, { std_id: 1, _id: 0 })
                    .sort({ std_id: -1 })
                    .limit(1)
                    .toArray();

                const lastStudentId = lastStudent[0]?.std_id;  //001

                let currentId = (0).toString();//000
                let currentStudentYear = lastTwoDigitsOfYear.toString()
                let lastStudentYear = lastStudentId?.substring(0, 2)
                let currentSemesterCode;
                if (currentMonth == 12 || currentMonth == 1 || currentMonth == 2) {
                    currentSemesterCode = 1
                } else {
                    currentSemesterCode = 2
                }

                let lastStudentSemesterCode = lastStudentId?.substring(2, 3)


                let currentDeptCode;

                if (details?.department === 'CSE') {
                    currentDeptCode = '115'
                }
                else {
                    currentDeptCode = '116'
                }

                let lastStudentDeptCode = lastStudentId?.substring(4, 7)



                if (lastStudent && lastStudentYear == currentStudentYear && lastStudentSemesterCode == currentSemesterCode && currentDeptCode == lastStudentDeptCode) {
                    currentId = lastStudentId.substring(8)
                }
                let incrementId = (Number(currentId) + 1).toString().padStart(3, '0');
                let finalId = currentStudentYear + currentSemesterCode + '-' + currentDeptCode + '-' + incrementId

                details.studentId = finalId;

                const result = await studentsCollection.insertOne(details);
                res.send(result);

                if (result.insertedId) {
                    const admissionResult = await admissionRequestCollection.deleteOne({ _id: new ObjectId(details?._id) })
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
            }
        })

        //----------------------------------------------------------------

        // admin making

        app.patch('/users/admin/:id', async (req, res) => {
            try {
                const body = req.body;
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: {
                        role: 'admin'
                    },
                };

                const result = await usersCollection.updateOne(filter, updateDoc);

                if (result.modifiedCount === 1) {
                    const adminResult = await adminCollection.insertOne(body);
                    res.send(adminResult);
                } else {
                    res.send(result);
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
            }
        });


        //----------------------------------------------------------------
        // admin remove

        app.patch('/users/remove/admin/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const deleteFilter = { userId: id };
                const updateDoc = {
                    $set: {
                        role: 'user'
                    },
                };

                const result = await usersCollection.updateOne(filter, updateDoc);

                if (result.modifiedCount === 1) {
                    const adminResult = await adminCollection.deleteOne(deleteFilter)
                    res.send(adminResult);
                } else {
                    res.send(result);
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
            }

        })

        // ----------------------------------------------
        // users post

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }
            const result = await usersCollection.insertOne(req.body)
            res.send(result)
        })

        // ----------------------------------------------

        // users additional information post

        app.post('/users-additional-information', async (req, res) => {
            const data = req.body
            const existingData = await usersAdditionalInformationCollection.findOne({ email: data.email })
            const user = await usersCollection.findOne({ email: data.email });
            if (existingData) {
                return res.send({ message: 'already exists' })
            }
            const result = await usersAdditionalInformationCollection.insertOne(data)
            result.message = 'Information Added successfully'

            const filter = { _id: new ObjectId(data.userId) };
            const updateDoc = {
                $set: {
                    hasAdditionalInfo: true
                },
            };
            const updatedResult = await usersCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // -------------------------------------
        // admission request post

        app.post('/admission-request', async (req, res) => {
            try {
                const data = req.body;
                const existingData = await admissionRequestCollection.findOne({ email: data.email });
                if (existingData) {
                    return res.send({ message: 'Already requested for admission' })
                }
                const result = await admissionRequestCollection.insertOne(data)
                result.message = "Admission request Successful"
                res.send(result)
            } catch (error) {
                console.log(error);
            }
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello university')
})

app.listen(port)
