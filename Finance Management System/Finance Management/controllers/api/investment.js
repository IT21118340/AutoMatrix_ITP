const Investment = require("../../models/investment");

module.exports = {
  create,
  index,
  delete: deleteInvestment,
  update
};

async function create(req, res) {
  const investment = new Investment({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    account: req.body.account,
    notes: req.body.notes,
    user: req.user._id,
  });
  try {
    const savedInvestment = await investment.save();
    res.json(savedInvestment);
  } catch (err) {
    res.status(400).json({ error: "Error submitting investment form" });
  }
}

async function index(req, res) {
  try {
    const investments = await Investment.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve list of investments",
    });
  }
}

async function deleteInvestment(req, res) {
  try {
    const deletedInvestment = await Investment.findByIdAndDelete(req.params.id);
    if (!deletedInvestment) {
      return res.status(404).json({ error: "Investment not found" });
    }
    res.json({
      success: true,
      message: "Investment deleted successfully",
      investment: deletedInvestment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting investment" });
  }
}

async function update(req, res) {
  try {
    const investment = await Investment.findById(req.params.id);
    investment.description = req.body.description;
    investment.amount = req.body.amount;
    investment.category = req.body.category;
    investment.date = req.body.date;
    investment.account = req.body.account;
    investment.notes = req.body.notes;
    const updatedInvestment = await investment.save();
    res.json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ error: "Error updating investment" });
  }
}
