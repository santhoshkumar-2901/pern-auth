import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
try{
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ msg: "Invalid token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await pool.query(
    "SELECT id, username, email from users WHERE id = $1",
    [decoded.id],
  );

  if (user.rows.length === 0) {
    return res
      .status(400)
      .send({ msg: "Invalid credientials, User Not Found" });
  }

  req.user = user.rows[0];
  next();
}catch(err){
    console.error(err);
    console.log("Server problem")
}
};
