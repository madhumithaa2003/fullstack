const express=require('express');
const {MongoClient}= require('mongodb');
const cors = require('cors');

const uri="mongodb://localhost:27017";
const client = new MongoClient(uri);
const db= client.db('Orders');
///const order_coll= db.createCollection('orders');
const order_coll=db.collection('orders');

const app=express();
const port=3000;
app.use(express.json());
app.use(cors());

client.connect()
        .then(()=>console.log("Connected to db"))
        .catch((err)=> console.log('error occured'));
    
app.post('/orders',async (req,res) =>{
    const {OrderID,CustomerName,Product,Quantity,OrderDate}=req.body;
    try{
        const new_order={OrderID,CustomerName,Product,Quantity,OrderDate};
        const response=await order_coll.insertOne(new_order);
        res.status(200).send('Order addded successfully!');
    }
    catch(err)
    {
        res.status(500).send('Cannot add order');
    }
});

app.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Received req.params:", req.params); // Log all params to check what is passed
    console.log("Received orderId:", id); // Log just the oid
    try {
        const order = await order_coll.findOne({ OrderID: id });
        if (!order) {
            return res.status(404).send("Order Not Found");
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send("Error! " + err.message);
    }
});

app.get('/allorders',async (req,res) => {
    try{
        const response = await order_coll.find({}).toArray();
        if(response.length>0){
            return res.status(200).json(response);
        }
        res.status(404).send("NO Orders");
    }
    catch(err){
        res.status(500).send("Error occured!");
    }
});

app.put('/update/:id',async (req,res) =>{
    const id = req.params.id;
    console.log("Received req.params:", id);
    try{
        const updated_data=req.body;
        const response =await order_coll.updateOne({OrderID : id},{$set : updated_data});
        if(response.matchedCount === 0)
        {
            return res.status(404).send("No order Found");
        }

        res.status(200).send("Updated");
    }
    catch(err){
        res.status(404).send("Error found");
    }
});

app.delete('/delete/:id',async(req,res) => {
    const id= req.params.id;
    try{
        const result=order_coll.deleteOne({OrderID : id});
        if((await result).deletedCount === 0)
        {
            return res.status(404).send("No such order exists");
        }
        res.status(200).send("Order deleted");
    }
    catch(err){
        res.status(500).send("error!!!");
    }
});

app.listen(port,()=>{
    console.log(`Running on port: ${port}`)
});