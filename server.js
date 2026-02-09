const express = require("express");
const configSwagger = require("./configs/swagger");
const authRouter = require("./routes/auth")
require('dotenv').config()

// الگو

const app = express();
configSwagger(app);
app.use(express.json());
app.use("/auth",authRouter)

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    description: This api used for get project users list
 *    responses:
 *      200:
 *        description: Get users successfully :))
 *      401:
 *        description: user not auth !!
 */
app.get("/users", (req, res) => {
  return res.json({
    data: [
      { id: 1, name: "MMD" },
      { id: 2, name: "Babak" },
    ],
  });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
