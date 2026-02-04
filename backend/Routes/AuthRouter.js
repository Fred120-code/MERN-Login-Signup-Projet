const router = require("express").Router();

router.post("/login", (req, res) => {
  console.log("/auth/login Post hit");
  res.send("Login Succes");
});

module.exports = router;
