const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const users = require("../Models/userSchema");

// Configure multer to save files to the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// Register user with image upload
router.post("/register", upload.single('image'), async (req, res) => {
  const { name, email, mobile, work, gender, course } = req.body;
  const image = req.file ? req.file.filename : null; // Get the filename of the uploaded image

  if (!name || !email || !mobile || !work || !gender || !course) {
    return res.status(422).json("Please fill all the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      return res.status(422).json("This user is already present");
    } else {
      const adduser = new users({ 
        name, email, mobile, work, gender, course, image
      });

      await adduser.save();
      res.status(201).json(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get user data
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Update user data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true // Return the updated document
    });

    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletuser = await users.findByIdAndDelete(id);

    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user

router.get("/getuser/:id", async (req, res) => { //api defining
  try {
      console.log(req.params);
      const { id } = req.params;

      const userindividual = await users.findById({ _id: id }); // valid "id" aanenkil ith work aakm
      console.log(userindividual);
      res.status(201).json(userindividual) // ith success aayal "details.jsx" il pokm

  } catch (error) {
      res.status(422).json(error)
  }
})

module.exports = router;
