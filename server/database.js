const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const saltRounds = 10; // Number of salt rounds for password hashing

// Create a MySQL database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "aetuqdgjwcb,_A123",
  database: process.env.DB_DATABASE || "Park_Vehicules",
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const session = require("express-session");

app.use(
  session({
    secret: "secret", // Replace with a strong, secret key
    resave: false,
    saveUninitialized: true,
    // You can customize other options as needed, such as cookie settings
  })
);
function isAuthenticated(req, res, next) {
  // if (req.session.user) {
  //   // User is logged in, allow access to the route
     next();
  // } else {
  //   // User is not logged in, deny access and redirect to the login page
  //   res.status(401).json({ error: "Unauthorized. Please log in." });
  // }
}
// Endpoint for user registration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Proceed with database insertion, storing the hashed password
    const [result] = await pool.execute(
      "INSERT INTO Users (Nom, Prénom, departement, password, email, Role, cds) VALUES ('admin', 'admin', 'admin', ?, ?, 'admin', 'CE 201 SAIDA')",
      [ hashedPassword, email]
    );

    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user." });
  }
});

// Endpoint for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!password || !email) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Retrieve the user's data from the database
    const [rows] = await pool.execute(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No such user" });
    }

    const user = rows[0];

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = { username: user.username, email: user.email };

      res.status(200).json({ message: "User exists." });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error authenticating user." });
  }
});

// Endpoint for creating a new car record
app.post("/createcar", async (req, res) => {
  try {
    const {
      cds,
      district,
      code_v,
      matricule,
      num_chassis,
      annee_service,
      poids,
      energie,
      marque,
      type_v,
      type_moyen,
    } = req.body;
    console.log("Request Body:", req.body);
    // Proceed with database insertion
    const result = await pool.execute(
      "INSERT INTO moyens_transport (cds, district, code, matricule, num_chassis, année_service, poids, energie, marque, type_v, type_moyen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        cds,
        district,
        code_v,
        matricule,
        num_chassis,
        annee_service,
        poids,
        energie,
        marque,
        type_v,
        type_moyen,
      ]
    );

    console.log(result);
    res.status(200).json({ message: "Car created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering car." });
  }
});


// Endpoint to retrieve a list of cars
app.get("/getcars",isAuthenticated, async (req, res) => {
  try {
    // Execute the SQL query to select all rows from the "vehicules" table
    const [rows] = await pool.execute("SELECT * from moyens_transport");
    console.log(rows);
    // Send the retrieved data as a JSON response
    res.status(200).json({ message: "Cars retrieved successfully.", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving cars." });

  }
});
app.get("/getcar", isAuthenticated, async (req, res) => {
  console.log("body :",req.query)
  try {
    const { code} = req.query; // Retrieve code_v from query parameters
    console.log("code_v aaaaaaaaa: ", code);

    const [rows] = await pool.execute("SELECT * from moyens_transport WHERE code = ?", [code]);
    // Send the retrieved data as a JSON response
    res.status(200).json({ message: "Car retrieved successfully.", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving car." });
  }
});

app.get("/getcontrols", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.query; // Retrieve code_v from query parameters
    console.log("id : ", id);
    console.log("id : ", req.query);

  


    const [rows] = await pool.execute("SELECT * from controle WHERE id_v = ?", [id]);
    // Send the retrieved data as a JSON response
    res.status(200).json({ message: "controls retrieved successfully.", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving controls." });
  }
});
app.get("/getactivecontrols",  async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * from controle WHERE  etat=? ", ["courant"]);
    // Send the retrieved data as a JSON response
    res.status(200).json({ message: "controls retrieved successfully.", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving controls." });
  }
});

app.post("/createControl", async (req, res) => {
  try {
    const { etat, type_controle, date_début, date_fin,police , montant , organisme,num_pv, numero_carte_rouge ,id_v} = req.body;
    console.log('req.body = ', req.body)
    const [result] = await pool.execute(
      "INSERT INTO controle (etat,type_controle ,date_début,date_fin,montant , police , organisme , num_pv, numero_carte_rouge , id_v) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [etat,type_controle,date_début,date_fin,  montant ,police , organisme,num_pv, numero_carte_rouge,id_v ]
    );

    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user." });
  }
});

app.post("/updateControl", async (req, res) => {
  try {
    const { id, etat } = req.body; // You may need to include the 'id' of the control you want to update
    console.log('req.body = ', req.body);

    // Assuming you have an 'id' field in your 'controle' table that uniquely identifies the record you want to update
    const [result] = await pool.execute(
      "UPDATE controle SET etat = ? WHERE id = ?",
      ['archivé', id]
    );

    res.status(200).json({ message: "Control updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating control." });
  }
});
