const Capital = require("../../models/capital");

module.exports = {
  create,
  index,
  delete: deleteCapital,
  update
};

async function create(req, res) {
  const capital = new Capital({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    account: req.body.account,
    notes: req.body.notes,
    user: req.user._id,
  });
  try {
    const savedCapital = await capital.save();
    res.json(savedCapital);
  } catch (err) {
    res.status(400).json({ error: "Error submitting Capital form" });
  }
}

async function index(req, res) {
  try {
    const capital = await Capital.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(capital);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve list of Capital",
    });
  }
}

async function deleteCapital(req, res) {
  try {
    const deleteCapital = await Capital.findByIdAndDelete(req.params.id);
    if (!deleteCapital) {
      return res.status(404).json({ error: "Capital not found" });
    }
    res.json({
      success: true,
      message: "Capital deleted successfully",
      capital: deletedCapital,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting capital" });
  }
}

async function update(req, res) {
  try {
    const capital = await Capital.findById(req.params.id);
    capital.description = req.body.description;
    capital.amount = req.body.amount;
    capital.category = req.body.category;
    capital.date = req.body.date;
    capital.account = req.body.account;
    capital.notes = req.body.notes;
    const updatedCapital = await capital.save();
    res.json(updatedCapital);
  } catch (error) {
    res.status(500).json({ error: "Error updating capital" });
  }
}
