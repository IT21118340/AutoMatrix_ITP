const Liability = require("../../models/liability");

module.exports = {
  create,
  index,
  delete: deleteLiability,
  update
};

async function create(req, res) {
  const liability = new Liability({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    account: req.body.account,
    notes: req.body.notes,
    user: req.user._id,
  });
  try {
    console.log(liability);
    const savedLiability = await liability.save().catch((e) => console.log(e));
    res.json(savedLiability);
  } catch (err) {
    res.status(400).json({error: "Error submitting liability form"});
  }
}

async function index(req, res) {
  try {
    const liabilities = await Liability.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(liabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve list of liabilities",
    });
  }
}

async function deleteLiability(req, res) {
  try {
    const deletedLiability = await Liability.findByIdAndDelete(req.params.id);
    if (!deletedLiability) {
      return res.status(404).json({ error: "Liability not found" });
    }
    res.json({
      success: true,
      message: "Liability deleted successfully",
      liability: deletedLiability,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting liability" });
  }
}

async function update(req, res) {
  try {
    const liability = await Liability.findById(req.params.id);
    liability.description = req.body.description;
    liability.amount = req.body.amount;
    liability.category = req.body.category;
    liability.date = req.body.date;
    liability.account = req.body.account;
    liability.notes = req.body.notes;
    const updatedLiability = await liability.save();
    res.json(updatedLiability);
  } catch (error) {
    res.status(500).json({ error: "Error updating liability" });
  }
}
