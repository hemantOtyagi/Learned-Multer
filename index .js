const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
// const upload = multer({ dest:"uploads/" })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    res.redirect("/");
  } catch (err) {
    console.log("error occured", err);
  }
});

app.listen(3000, () => console.log(`Server started at port 3000...`));
