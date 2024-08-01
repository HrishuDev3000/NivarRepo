const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sys",
    password: process.env.DB_PASS
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

// Define routes
app.get('/', (req, res) => {
    res.json("From Backend Side");
});

app.get('/sys', (req, res) => {
    const sql = "SELECT * FROM neem_formulation";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Error executing MySQL query' });
        }
        res.json(data);
    });
});

// POST route to add new data
app.post('/sys', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO neem_formulation SET ?';
    db.query(sql, newUser, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Error executing MySQL query' });
        }
        res.json({ id: results.insertId, ...newUser });
    });
});

// PUT route to update existing data
app.put('/sys/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const sql = 'UPDATE neem_formulation SET ? WHERE ID = ?';
    db.query(sql, [updatedUser, id], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Error executing MySQL query' });
        }
        res.json({ id, ...updatedUser });
    });
});

// DELETE route to remove data
app.delete('/sys/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM neem_formulation WHERE ID = ?';
    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Error executing MySQL query' });
        }
        res.json({ message: "Data deleted" });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





/* orginal data 
ID	Ingredient	Used	Weight	Unit Price	Nominal Price	Actual Price	Avg Density	Density	Price Grams	PPM	    GST Tax	        Description
1	AZARDATIN	1	10.500000	10.500000	95.000000	95.000000	0.000000	1.000000	828.580000	-1.000000	12.000000	    Neem Active ingredient	
2	MEOH%	  0	0.605000	0.000000	36.000000	0.000000	0.000000	0.790000	0.000000	0.000000	    18.000000	       Methanol	
3	NB	1	0.350000	0.350000	112.000000	112.000000	0.280000	0.800000	31.360000	0.000000	        18.000000	            Normal Butanol	
4	BA	0	0.000000	0.000000	0.000000	0.000000	0.000000	0.820000	0.000000	0.000000	        18.000000	            Butile Estate (Solvent)	
5	BP 8	0	0.015000	0.000000	480.000000	0.000000	0.000000	1.100000	0.000000	0.000000	    5.000000	        BP 8(Solvent based Emulsifyer/Surfactant)	
6	PS80	1	0.050000	0.050000	160.000000	160.000000	0.055000	1.100000	8.000000	0.000000	    18.000000	        PS80(Oil based Emulsifyer/Surfactant	
7	NEEM OIL	1	0.200000	0.200000	360.000000	360.000000	0.182000	0.910000	65.520000	0.600000	5.000000	    Neem tree Oil	
8	MICELLA	0	0.010000	0.000000	129.000000	0.000000	0.000000	0.840000	0.000000	0.000000	    13.000000       	Neem Kernel Extract with solvent	
9	ALTOCIN	0	0.050000	0.000000	700.000000	0.000000	0.000000	0.910000	0.000000	0.000000	    5.000000	        Leftover Altocin(Azardiractin based insectiside)	
10	AZTEK	0	0.050000	0.000000	700.000000	0.000000	0.000000	0.910000	0.000000	0.000000	    5.000000	        Leftover Aztek(Azardiractin based insectiside)	
11	K.Oli / S.Oil	1	0.400000	0.400000	95.000000	95.000000	0.364000	0.910000	34.580000	0.000000	5.000000    Sunflower Oil / PalmKernel Oil	
12	LINSEED	0	0.050000	0.000000	130.000000	0.000000	0.000000	0.910000	0.000000	0.000000	5.000000	        Linseed Oil	

*/
