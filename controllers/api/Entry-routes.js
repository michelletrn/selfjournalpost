const router = require("express").Router();
const { Entry } = require("../../models");
const withAuth = require("../../utils/auth");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), withAuth, async (req, res) => {
  console.log("POST /");

  try {
    const file = req.file;
    console.log('file:', file)
    cloudinary.uploader.upload(file.path, async (error, result) => {
      if (error) {
        console.error("Cloudinary upload failed");
        return res.statusMessage(500).send("Cloudinary upload failed");
      }
      const { public_id, secure_url } = result;

      const newEntry = await Entry.create({
        ...req.body,
        imageUrl: secure_url,
        user_id: req.session.user_id,
      });

      res.status(200).json(newEntry);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: "No entry found with this id!" });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
