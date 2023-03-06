const router = require("express").Router();
const { Goal, Entry, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const axios = require("axios");
const { format_date } = require("../utils/helpers");

router.get("/", async (req, res) => {
  try {
    console.log("GET /");
    const entryData = await Entry.findAll({
      order: [["date_created", "DESC"]],
      limit: 10,
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Comment,
          attributes: ["comment", "entry_id", "id", "date_created", "user_id"],
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
      "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=344a9336cb9e4ecaa4645b7969a903ea"
    )
    .then(function (data) {
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

// All of the entries
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
    // console.log(entryData);
    const userGoals = await Goal.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const goals = userGoals.map((goal) => goal.get({ plain:true }));
    console.log(goals);

    const entries = entryData.map((entry) => entry.get({ plain: true }));

    res.render("entries", {
      entries,
      goals,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// USERS entries
router.get("/userentries", withAuth, async (req, res) => {
  console.log(`GET /userentries`);

  try {
    const entriesData = await Entry.findAll({
      order: [["date_created", "DESC"]],
      where: {
        user_id: req.session.user_id,
      },
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
    // console.log(entriesData)
    const userGoals = await Goal.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const goals = userGoals.map((goal) => goal.get({ plain: true }));
    // console.log(goals);

    const entries = entriesData.map((entry) => entry.get({ plain: true }));
    console.log(entries);
    res.render("userEntries", {
      entries,
      goals,
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
