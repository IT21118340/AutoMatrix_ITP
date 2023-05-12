import { useState, useEffect } from "react";
import * as investmentsAPI from "../../utilities/investment-api";

export default function InvestmentForm({
  investments,
  setInvestments,
  addInvestment,
  selectedInvestment,
  setSelectedInvestment,
  setShowModal,
}) {
  const [investmentFormData, setInvestmentFormData] = useState(() => {
    if (selectedInvestment) {
      return {
        description: selectedInvestment.description,
        amount: selectedInvestment.amount,
        category: selectedInvestment.category,
        date: selectedInvestment.date,
        account: selectedInvestment.account,
        notes: selectedInvestment.notes,
      };
    } else {
      return {
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      };
    }
  });

  useEffect(() => {
    if (selectedInvestment) {
      setInvestmentFormData(selectedInvestment);
    }
  }, [selectedInvestment]);

  async function handleChange(event) {
    setInvestmentFormData({
      ...investmentFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function updateInvestment(updatedInvestment) {
    try {
      const updatedInvestments = investments.map((investment) => {
        if (investment._id === updatedInvestment._id) {
          return { ...updatedInvestment };
        } else {
          return investment;
        }
      });
      setInvestments(updatedInvestments);
    } catch (err) {
      console.error("Error updating investment", err);
    }
  }

  async function handleUpdate(investmentFormData) {
    try {
      const updatedInvestment = await investmentsAPI.updateInvestment(
        selectedInvestment._id,
        { ...investmentFormData }
      );
      updateInvestment(updatedInvestment);
      console.log("Investment updated:", updatedInvestment);
      setInvestmentFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      });
      setShowModal(false);
      setSelectedInvestment(null);
    } catch (err) {
      console.error("Error updating investment:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedInvestment) {
      handleUpdate(investmentFormData);
    } else {
      try {
        const investment = await investmentsAPI.createInvestment(
          investmentFormData
        );
        console.log("Investment saved:", investment);
        addInvestment(investment);
        setInvestmentFormData({
          description: "",
          amount: "",
          category: "",
          date: "",
          account: "",
          notes: "",
        });
        setShowModal(false);
        setSelectedInvestment(null);
      } catch (err) {
        console.error("Error saving investment:", err);
      }
    }
  }
  return (
    <>
      <h3>{selectedInvestment ? "Edit Investment" : "Add an Investment"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={investmentFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          placeholder="$"
          type="number"
          id="amount"
          name="amount"
          value={investmentFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={investmentFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {[
            
            "Land",
            "Building",
            "Vehicle",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={
            investmentFormData.date
              ? new Date(investmentFormData.date).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          required
        />
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={investmentFormData.account}
          onChange={handleChange}
        >
          <option value="">Select an account</option>
          <option value="Cash">Cash</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={investmentFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
