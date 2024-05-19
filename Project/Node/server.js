const express = require("express");
const sql = require("msnodesqlv8");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const braintree = require("braintree");
const connectionString = "DSN=shopdb";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/signup", async (req, res) => {
  const { username, email, password, location, interests, dob } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    const query = `
      INSERT INTO users (username, email, password, location, interests, dob)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [username, email, hashedPassword, location, interests, dob];
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("User signed up successfully");
        res.status(200).json({ message: "User signed up successfully" });
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/checkemail", (req, res) => {
  const { email } = req.body;
  const query = `
    SELECT COUNT(*) AS count
    FROM users
    WHERE email = ?
  `;
  const params = [email];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Check if email exists
      const exists = result[0].count > 0;
      res.status(200).json({ exists: exists });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  const query = `
    SELECT id, email, password
    FROM users
    WHERE email = ?
  `;
  const params = [email];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const user = result[0];
      bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
        if (bcryptErr) {
          console.error("Error comparing passwords:", bcryptErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (!bcryptRes) {
          return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ userID: user.id });
      });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

const admins = [
  { email: "admin1@gmail.com", password: "awan2002" },
  { email: "admin2@gmail.com", password: "awan2002" },
];

app.post("/api/adminsignin", (req, res) => {
  const { email, password } = req.body;
  const isAdmin = admins.some(
    (admin) => admin.email === email && admin.password === password
  );
  res.json({ success: isAdmin });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the folder where you want to save the images
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/creategame", upload.single("image"), async (req, res) => {
  const { name, price, genre, description, rating } = req.body;
  const imagePath = req.file.path;

  // Log the data type of each parameter
  console.log("name:", typeof name);
  console.log("price:", typeof price);
  console.log("genre:", typeof genre);
  console.log("description:", typeof description);
  console.log("rating:", typeof rating);
  console.log("imagePath:", typeof imagePath);

  try {
    const query = `
      INSERT INTO games (name, price, genre, description, rating, img_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [name, price, genre, description, rating, imagePath];
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Game created successfully");
        res
          .status(201)
          .json({ success: true, message: "Game created successfully" });
      }
    });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/adminviewgames/:id", (req, res) => {
  const gameId = req.params.id;
  const query = `
    SELECT name, price, description, rating, genre, img_path
    FROM games
    WHERE id = ?
  `;
  const params = [gameId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Game not found" });
      } else {
        const gameData = result[0];
        res.status(200).json(gameData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/createconsole", upload.single("image"), async (req, res) => {
  const { name, price, variant, generation, description } = req.body;
  const imagePath = req.file.path;

  try {
    const query = `
      INSERT INTO consoles (name, price, variant, generation, description, img_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [name, price, variant, generation, description, imagePath];
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Console created successfully");
        res
          .status(201)
          .json({ success: true, message: "Console created successfully" });
      }
    });
  } catch (error) {
    console.error("Error creating console:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/adminviewconsoles/:id", (req, res) => {
  const consoleId = req.params.id;
  const query = `
    SELECT name, price, variant, generation, description, img_path
    FROM consoles
    WHERE id = ?
  `;
  const params = [consoleId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Console not found" });
      } else {
        const consoleData = result[0];
        res.status(200).json(consoleData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/createaccessory", upload.single("image"), async (req, res) => {
  const { name, price, type, brand, description } = req.body;
  const imagePath = req.file.path;

  try {
    const query = `
      INSERT INTO accessories (name, price, type, brand, description, img_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [name, price, type, brand, description, imagePath];
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Accessory created successfully");
        res
          .status(201)
          .json({ success: true, message: "Accessory created successfully" });
      }
    });
  } catch (error) {
    console.error("Error creating accessory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/adminviewaccessories/:id", (req, res) => {
  const accessoryId = req.params.id;
  const query = `
    SELECT name, price, type, brand, description, img_path
    FROM accessories
    WHERE id = ?
  `;
  const params = [accessoryId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Accessory not found" });
      } else {
        const accessoryData = result[0];
        res.status(200).json(accessoryData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post(
  "/api/createSubscription",
  upload.single("image"),
  async (req, res) => {
    const { name, price, duration, region, description } = req.body;
    const imagePath = req.file.path;

    try {
      const query = `
      INSERT INTO subscription (name, price, duration, region, description, img_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
      const params = [name, price, duration, region, description, imagePath];
      sql.query(connectionString, query, params, (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          console.log("Subscription created successfully");
          res.status(201).json({
            success: true,
            message: "Subscription created successfully",
          });
        }
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/adminviewsubscriptions/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const query = `
    SELECT name, price, duration, region, description, img_path
    FROM subscription
    WHERE id = ?
  `;
  const params = [subscriptionId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        const subscriptionData = result[0];
        res.status(200).json(subscriptionData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
// API route to get games
app.get("/api/games", (req, res) => {
  const query = `
    SELECT id, name, price
    FROM games
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
// API route to get consoles
app.get("/api/consoles", (req, res) => {
  const query = `
    SELECT id, name, price
    FROM consoles
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
// API route to get accessories
app.get("/api/accessories", (req, res) => {
  const query = `
    SELECT id, name, price
    FROM accessories
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
// API route to get subscriptions
app.get("/api/subscriptions", (req, res) => {
  const query = `
    SELECT id, name, price
    FROM subscription
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.delete("/api/deleteproduct/:type/:id", (req, res) => {
  const { type, id } = req.params;
  const query = `
    DELETE FROM ${type}
    WHERE id = ?
  `;
  const params = [id];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Product deleted successfully");
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/editgamedata/:id", (req, res) => {
  const gameId = req.params.id;
  const query = `
    SELECT name, price, genre, rating, description
    FROM games
    WHERE id = ?
  `;
  const params = [gameId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Game not found" });
      } else {
        const gameData = result[0];
        res.status(200).json(gameData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.put("/api/editgame/:id", (req, res) => {
  const gameId = req.params.id;
  const { name, price, genre, rating, description } = req.body;

  const query = `
    UPDATE games
    SET name=?, price=?, genre=?, rating=?, description=?
    WHERE id=?
  `;
  const params = [name, price, genre, rating, description, gameId];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        console.log("GAME NOT FOUND");
        res.status(404).json({ error: "Game not found" });
      } else {
        res.status(200).json({ message: "Game updated successfully" });
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/editconsoledata/:id", (req, res) => {
  const consoleId = req.params.id;
  const query = `
    SELECT name, price, variant, generation, description
    FROM consoles
    WHERE id = ?
  `;
  const params = [consoleId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Console not found" });
      } else {
        const consoleData = result[0];
        res.status(200).json(consoleData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.put("/api/editconsole/:id", (req, res) => {
  const consoleId = req.params.id;
  const { name, price, variant, generation, description } = req.body;

  const query = `
    UPDATE consoles
    SET name=?, price=?, variant=?, generation=?, description=?
    WHERE id=?
  `;
  const params = [name, price, variant, generation, description, consoleId];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Console not found" });
      } else {
        res.status(200).json({ message: "Console updated successfully" });
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/editaccessorydata/:id", (req, res) => {
  const accessoryId = req.params.id;
  const query = `
    SELECT name, price, brand, type
    FROM accessories
    WHERE id = ?
  `;
  const params = [accessoryId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Accessory not found" });
      } else {
        const accessoryData = result[0];
        res.status(200).json(accessoryData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.put("/api/editaccessory/:id", (req, res) => {
  const accessoryId = req.params.id;
  const { name, price, brand, type } = req.body;

  const query = `
    UPDATE accessories
    SET name=?, price=?, brand=?, type=?
    WHERE id=?
  `;
  const params = [name, price, brand, type, accessoryId];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        console.log("ACCESSORY NOT FOUND");
        res.status(404).json({ error: "Accessory not found" });
      } else {
        res.status(200).json({ message: "Accessory updated successfully" });
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/editsubscriptiondata/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const query = `
    SELECT name, price, duration, region, description
    FROM subscription
    WHERE id = ?
  `;
  const params = [subscriptionId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        const subscriptionData = result[0];
        res.status(200).json(subscriptionData);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.put("/api/editsubscription/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const { name, price, duration, region, description } = req.body;

  const query = `
    UPDATE subscription
    SET name=?, price=?, duration=?, region=?, description=?
    WHERE id=?
  `;
  const params = [name, price, duration, region, description, subscriptionId];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.status(200).json({ message: "Subscription updated successfully" });
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
app.post("/api/contacts", (req, res) => {
  const { email, message } = req.body;
  const query = `
    INSERT INTO contacts (email, message)
    VALUES (?, ?)
  `;
  const params = [email, message];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({ message: "Message sent successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/feedbacks", (req, res) => {
  const query = `
    SELECT email, datetime, message
    FROM contacts
    ORDER BY datetime DESC
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

// Express route to fetch messages for a user
app.get("/api/getmessage/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM messages WHERE sender = '${userId}' OR receiver = '${userId}' ORDER BY datetime DESC`;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Error fetching messages" });
    } else {
      res.json(result);
    }
  });
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
// Express route to send a message
app.post("/api/sendmessage", (req, res) => {
  const { sender, receiver, message } = req.body;
  const query = `INSERT INTO messages (sender, receiver, message) VALUES ('${sender}', '${receiver}', '${message}')`;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error sending message:", err);
      res.status(500).json({ error: "Error sending message" });
    } else {
      res.status(201).json({ message: "Message sent successfully" });
    }
  });
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
// Express route to fetch latest messages from each sender (excluding support)
app.get("/api/latestmessages", async (req, res) => {
  try {
    const queryString = `
      SELECT 
        u.username AS sender, 
        m.message, 
        m.datetime,
        m.sender as id
      FROM 
        messages m
      JOIN 
        users u ON u.id = m.sender
      WHERE 
        m.datetime IN (
          SELECT MAX(datetime)
          FROM messages
          WHERE sender = m.sender
        )
      AND 
        m.sender != 'support';
    `;
    sql.query(connectionString, queryString, (err, result) => {
      if (err) {
        console.error("Error fetching latest messages:", err);
        res.status(500).json({ error: "Error fetching latest messages" });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
app.get("/api/getadminmessage/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT * 
    FROM messages 
    WHERE sender = '${userId}' OR receiver = '${userId}' 
    ORDER BY datetime DESC
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Error fetching messages" });
    } else {
      res.json(result);
    }
  });
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
// Express route to send a message
app.post("/api/sendadminmessage", (req, res) => {
  const { sender, receiver, message } = req.body;
  const query = `
    INSERT INTO messages (sender, receiver, message) 
    VALUES ('${sender}', '${receiver}', '${message}')
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error sending message:", err);
      res.status(500).json({ error: "Error sending message" });
    } else {
      res.status(201).json({ message: "Message sent successfully" });
    }
  });
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
app.post("/api/insertnotification", (req, res) => {
  const { receiver, message } = req.body;
  if (!receiver || !message) {
    return res.status(400).json({ error: "Receiver and message are required" });
  }
  const query = `
    INSERT INTO notifications (receiver, message)
    VALUES (?, ?)
  `;
  const params = [receiver, message];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Notification inserted successfully");
    res
      .status(201)
      .json({ success: true, message: "Notification inserted successfully" });
  });
});
// #############################################################################################################################################
// ###########################################################################################################################################3#
app.get("/api/adminnotifications", (req, res) => {
  const query = `
    SELECT datetime, message
    FROM notifications
    WHERE receiver = 'admin'
    ORDER BY datetime DESC
  `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
app.get("/api/clientnotifications/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT datetime, message
    FROM notifications
    WHERE receiver = ?
    ORDER BY datetime DESC
  `;
  const params = [userId];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/fetchproducts", (req, res) => {
  const query = `
        SELECT id, name, price, img_path, 'Game' AS type, genre
        FROM games
        UNION ALL
        SELECT id, name, price, img_path, 'Console' AS type, NULL AS genre
        FROM consoles
        UNION ALL
        SELECT id, name, price, img_path, 'Accessory' AS type, NULL AS genre
        FROM accessories
        UNION ALL
        SELECT id, name, price, img_path, 'Subscription' AS type, NULL AS genre
        FROM subscription
      `;
  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result); // Return the recordset directly
    }
  });
});

app.get("/api/fetchInterests/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT interests
    FROM users
    WHERE id = ?
  `;

  sql.query(connectionString, query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user interests:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        const interests = result[0].interests
          .split(",")
          .map((interest) => interest.trim().toLowerCase()); // Convert interests to lowercase
        res.status(200).json({ interests });
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/addCartItem", (req, res) => {
  const { userID, name, type, price } = req.body;
  const query = `
    INSERT INTO cart (UserID, name, type, price)
    VALUES (?, ?, ?, ?)
  `;
  const params = [userID, name, type, price];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Item added to cart successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/fetchCartItems/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `
    SELECT *
    FROM cart
    WHERE userID = ?
  `;
  sql.query(connectionString, query, [userID], (err, result) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.delete("/api/deleteCartItem/:itemID", (req, res) => {
  const { itemID } = req.params;
  const query = `
    DELETE FROM cart
    WHERE itemID = ?
  `;
  sql.query(connectionString, query, [itemID], (err, result) => {
    if (err) {
      console.error("Error deleting item from cart:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/placeOrder", (req, res) => {
  const { userID, items } = req.body;
  const itemNames = items.map((item) => item.name).join(",");
  const itemPrices = items.map((item) => item.price).join(",");
  const query = `
    INSERT INTO orders (userID, itemNames, itemPrices, status)
    VALUES (?, ?, ?, ?)
  `;
  const params = [userID, itemNames, itemPrices, "Pending"]; // Assuming the initial status is "Pending"
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error placing order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Order placed successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.delete("/api/deleteCartItems", (req, res) => {
  const { userID } = req.body;
  const query = `
    DELETE FROM cart
    WHERE UserID = ?
  `;

  const params = [userID];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error deleting cart items:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res
        .status(200)
        .json({ message: "All items deleted from cart successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/addToLibrary", (req, res) => {
  const { userID, itemName } = req.body;
  const code = generateRandomCode();
  const query = `
    INSERT INTO Library (userID, itemName, code)
    VALUES (?, ?, ?)
  `;
  const params = [userID, itemName, code];
  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error adding item to Library:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Item added to Library successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/ClientOrders/:userID", (req, res) => {
  const userID = parseInt(req.params.userID);
  const query = `
    SELECT *
    FROM orders
    WHERE userID = ? AND status = 'Pending'
  `;
  sql.query(connectionString, query, [userID], (err, results) => {
    if (err) {
      console.error("Error fetching client orders:", err);
      res.status(500).json({ error: "Failed to fetch client orders" });
      return;
    }
    res.json(results);
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/ClientOrdersCompleted/:userID", (req, res) => {
  const userID = parseInt(req.params.userID);
  const query = `
    SELECT *
    FROM orders
    WHERE userID = ? AND status != 'Pending'
  `;

  sql.query(connectionString, query, [userID], (err, results) => {
    if (err) {
      console.error("Error fetching client orders:", err);
      res.status(500).json({ error: "Failed to fetch client orders" });
      return;
    }
    res.json(results);
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/ordersdetails/:orderID", (req, res) => {
  const { orderID } = req.params;
  const query = `
    SELECT * FROM orders WHERE orderID = ?
  `;
  const params = [orderID];

  sql.query(connectionString, query, params, (err, result) => {
    if (err) {
      console.error("Error fetching order details:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Order not found" });
      } else {
        const order = result[0];
        const items = order.itemNames.split(",");
        const prices = order.itemPrices.split(",");
        const itemDetails = items.map((item, index) => ({
          itemName: item,
          itemPrice: prices[index],
        }));
        const formattedOrder = {
          orderID: order.orderID,
          userID: order.userID,
          datePlaced: order.datePlaced,
          total: order.total,
          items: itemDetails,
        };
        res.status(200).json(formattedOrder);
      }
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/FetchAdminOrders", (req, res) => {
  const query = `
    SELECT orderID, datePlaced, status
    FROM orders
    WHERE status = 'Pending'
  `;

  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error fetching admin orders:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/FetchAdminOrdersHistory", (req, res) => {
  const query = `
    SELECT orderID, datePlaced, status
    FROM orders
    WHERE status != 'Pending'
  `;

  sql.query(connectionString, query, (err, result) => {
    if (err) {
      console.error("Error fetching admin orders:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.put("/api/dispatchOrder/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const query = `
    UPDATE orders
    SET status = 'Completed'
    WHERE orderID = ?
  `;

  sql.query(connectionString, query, [orderID], (err, result) => {
    if (err) {
      console.error("Error dispatching order:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Order dispatched successfully" });
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/library/:userID", (req, res) => {
  const userID = req.params.userID;
  const query = `
    SELECT ItemName, code, date
    FROM Library
    WHERE userID = ?
  `;

  sql.query(connectionString, query, [userID], (err, result) => {
    if (err) {
      console.error("Error fetching items from library:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
app.post("/api/ChangePassword/:userID", async (req, res) => {
  const userID = req.params.userID;
  const { oldPassword, newPassword } = req.body;
  try {
    // Fetch the hashed password from the database
    const query = `
      SELECT password
      FROM users
      WHERE id = ?
    `;
    sql.query(connectionString, query, [userID], async (err, result) => {
      if (err) {
        console.error("Error fetching password:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const hashedPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
      if (!passwordMatch) {
        res.status(401).json({ error: "Old password is incorrect" });
        return;
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `;
      sql.query(
        connectionString,
        updateQuery,
        [hashedNewPassword, userID],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating password:", updateErr);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Password updated successfully" });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// #############################################################################################################################################
// ###########################################################################################################################################3#

const genAI = new GoogleGenerativeAI("AIzaSyCbMwl7q5iFoW8L0DHZor5uNip4-5g_uHE");

app.post("/api/chatbot", async (req, res) => {
  try {
    const { prompt } = req.body;
    const prestring =
      "keep the context of the conversation related to gaming and keep your answers as short as possible ";
    const combinedPrompt = prestring + prompt;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(combinedPrompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Change to Production for live environment
  merchantId: "yhwkj25r4drbwv67",
  publicKey: "2m9y8dmdrb4jdfnt",
  privateKey: "3d9fc87ddd6e5ed4e65c1440ac9808b7",
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/client_token", (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      console.error("Error generating client token:", err);
      res.status(500).send("Error generating client token");
      return;
    }
    const clientToken = response.clientToken;
    res.send(clientToken);
  });
});

// Process Payment API
app.post("/api/process_payment", async (req, res) => {
  const { userID, paymentMethodNonce, amount } = req.body;
  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: {
        submitForSettlement: true,
      },
    });

    if (result.success) {
      // Payment successful
      res.status(200).send("Payment successful");
    } else {
      // Payment failed
      console.error("Transaction failed:", result.message);
      res.status(400).send("Payment failed");
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send("Error processing payment");
  }
});
// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/processPayment", async (req, res) => {
  const { userID, creditCardDetails, totalPrice } = req.body;
  try {
    // Create a transaction using Braintree gateway
    const result = await gateway.transaction.sale({
      amount: totalPrice,
      creditCard: creditCardDetails,
      options: {
        submitForSettlement: true,
      },
    });

    if (result.success) {
      // Payment successful, proceed with other actions (place order, etc.)
      res
        .status(200)
        .json({ success: true, message: "Payment processed successfully" });
    } else {
      // Payment failed, return error message
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.post("/api/PostPref/:userID", (req, res) => {
  const userID = req.params.userID;
  const { newPreferences } = req.body;
  console.log(userID, newPreferences);
  const query = `
    UPDATE users
    SET interests = ?
    WHERE id = ?
  `;

  sql.query(
    connectionString,
    query,
    [newPreferences, userID],
    (err, result) => {
      if (err) {
        console.error("Error saving preferences:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Preferences saved successfully" });
      }
    }
  );
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/UserPrefGraph", (req, res) => {
  const query = `
    SELECT interests
    FROM users
  `;

  sql.query(connectionString, query, (err, results) => {
    if (err) {
      console.error("Error fetching user interests:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Initialize an object to store genre counts
      const genreCounts = {
        action: 0,
        adventure: 0,
        horror: 0,
        survival: 0,
        fps: 0,
        sports: 0,
        multiplayer: 0,
      };
      results.forEach((row) => {
        const interests = row.interests.toLowerCase().split(",");
        interests.forEach((interest) => {
          const genre = interest.trim();
          if (genreCounts.hasOwnProperty(genre)) {
            genreCounts[genre]++;
          }
        });
      });

      // Convert genreCounts object to an array of objects
      const genreCountsArray = Object.entries(genreCounts).map(
        ([genre, count]) => ({
          genre,
          count,
        })
      );

      res.status(200).json(genreCountsArray);
    }
  });
});

// #############################################################################################################################################
// ###########################################################################################################################################3#

app.get("/api/LocationOccurrence", (req, res) => {
  const query = `
    SELECT location, COUNT(*) as count
    FROM users
    GROUP BY location
  `;

  sql.query(connectionString, query, (err, results) => {
    if (err) {
      console.error("Error fetching location occurrences:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const locationOccurrences = results.reduce((acc, cur) => {
        acc[cur.location] = cur.count;
        return acc;
      }, {});

      res.status(200).json(locationOccurrences);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
