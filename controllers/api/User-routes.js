const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => { //works
  try {
    console.log(req.body);
    const obj = {
      ...req.body,
      first_name: req.body.firstName,
      last_name: req.body.lastName
    };
    console.log(obj)
    const userData = await User.create(obj);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);  
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      console.log(userData.id);
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post("/logout", (req, res) => {
  console.log('POST /logout');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
