const router = require("express").Router();
const { Goal, Entry, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    console.log("GET /");
    const entryData = await Entry.findAll({
      order: [["date_created", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    const entries = entryData.map((entry) => entry.get({ plain: true }));

    res.render("homepage", {
      entries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/news", async (req, res) => {
  console.log(`GET /news`);
  axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=344a9336cb9e4ecaa4645b7969a903ea"
    )
    .then(function (data) {
      console.log("data: ", data.data.articles);
      const articles = data.data.articles;

      res.json(articles);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/entry", withAuth, async (req, res) => {
  console.log(`GET /entry`);
  res.render("addentry", {
    logged_in: true,
  });
});

router.get("/entries", withAuth, async (req, res) => {
  console.log(`GET /entries`);
  try {
    const entryData = await Entry.findAll({
      order: [["date_created", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["comment", "entry_id", "id", "date_created", "user_id"],
        },
        {
          model: User,
          attributes: ["first_name", "last_name", "id"],
        },
      ],
    });
    console.log(entryData);

    const entries = entryData.map((entry) => entry.get({ plain: true }));

    res.render("entries", {
      entries,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/entries/:id", async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attribute: ["first_name", "last_name"],
        },
      ],
    });

    const entry = entryData.get({ plain: true });

    res.render("entries", {
      ...entry,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/wellness", withAuth, async (req, res) => {
  try {
    const wellnessData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Goal }],
    });

    const wellness = wellnessData.get({ plain: true });

    res.render("wellness", {
      ...wellness,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  console.log(`GET /login`);
  res.render("signup");
});

router.get("/login", async (req, res) => {
  console.log(`GET /login`);
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/logout", async (req, res) => {
  console.log(`GET /logout`);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
      return;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
