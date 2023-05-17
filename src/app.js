const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/userdata");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    if (req.body.psw === req.body.pswrepeat) {
      const registerCitizen = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.psw,
        confirmpassword: req.body.pswrepeat,
      });

      await registerCitizen.save();
      req.body.firstname.value = "";
      req.body.lastname.value = "";
      req.body.age.value = "";
      req.body.gender.value = "";
      req.body.email.value = "";
      req.body.phone.value = "";
      req.body.address.value = "";
      req.body.psw.value = "";
      req.body.pswrepeat.value = "";
      res.status(201).render("index");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await Register.findOne({ email });

    if (userData.password === Number(password)) {
      res.status(201).send("Login Successful");
    } else {
      res.status(400).send("Invalid Email or Password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
