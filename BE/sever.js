const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'demo',
    charset: 'utf8mb4'
})

app.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    db.query(sql, (err, data) => {
        if (err) return res.json({ Message: "Error" });
        return res.json(data);
    })
})

app.post('/category/create', (req, res) => {
    const sql = "INSERT INTO `category`(`Title`, `Icon`, `Type`) VALUES (?,?,?)";
    // const values = [
    //     req.body.Title,
    //     req.body.Icon,
    //     req.body.Type
    // ]
    db.query(sql, [req.body.Title, req.body.Icon, req.body.Type], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/category/:id', (req, res) => {
    const sql = "SELECT * FROM `category` WHERE id = (?)"
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put('/category/update/:id', (req, res) => {
    const sql = "UPDATE `category` SET `Title`=?,`Icon`=?,`Type`=? WHERE id = ?"
    const id = req.params.id;

    db.query(sql, [req.body.Title, req.body.Icon, req.body.Type, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/category/delete/:id', (req, res) => {
    const sql = "DELETE FROM `category` WHERE id = (?)"
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/transaction', (req, res) => {
    const sql = "SELECT transaction.id, category.Icon, category.Title, category.Type, transaction.Date, transaction.Amount FROM category JOIN transaction ON category.id = transaction.CategoryId";
    db.query(sql, (err, data) => {
        if (err) return res.json({ Message: "Error" });
        return res.json(data);
    })
})

app.post('/transaction/create', (req, res) => {
    const sql = "INSERT INTO `transaction`(`CategoryId`, `Amount`, `Note`, `Date`) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.body.Title, req.body.Amount, req.body.Note, req.body.Date], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/transaction/:id', (req, res) => {
    const sql = "SELECT * FROM `transaction` WHERE id = (?)"
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put('/transaction/update/:id', (req, res) => {
    const sql = "UPDATE `transaction` SET `CategoryId`=?,`Amount`=?,`Note`=?,`Date`=? WHERE id =?"
    const id = req.params.id;

    db.query(sql, [req.body.CategoryId, req.body.Amount, req.body.Note, req.body.Date, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/transaction/delete/:id', (req, res) => {
    const sql = "DELETE FROM `transaction` WHERE id = (?)"
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Listening")
})