import { useState, useEffect } from "react";
import * as liabilitiesAPI from "../../utilities/liability-api";

export default function LiabilityForm({
  liabilities,
  setLiabilities,
  addLiability,
  selectedLiability,
  setSelectedLiability,
  setShowModal,
}) {
  const [liabilityFormData, setLiabilityFormData] = useState(() => {
    if (selectedLiability) {
      return {
        description: selectedLiability.description,
        amount: selectedLiability.amount,
        category: selectedLiability.category,
        date: selectedLiability.date,
        account: selectedLiability.account,
        notes: selectedLiability.notes,
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
    if (selectedLiability) {
      setLiabilityFormData(selectedLiability);
    }
  }, [selectedLiability]);

  async function handleChange(event) {
    setLiabilityFormData({
      ...liabilityFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function updateLiability(updatedLiability) {
    try {
      const updatedLiabilities = liabilities.map((liability) => {
        if (liability._id === updatedLiability._id) {
          return { ...updatedLiability };
        } else {
          return liability;
        }
      });
      setLiabilities(updatedLiabilities);
    } catch (err) {
      console.error("Error updating liability", err);
    }
  }

  async function handleUpdate(liabilityFormData) {
    try {
      const updatedLiability = await liabilitiesAPI.updateLiability(
        selectedLiability._id,
        { ...liabilityFormData }
      );
      updateLiability(updatedLiability);
      console.log("Liability updated:", updatedLiability);
      setLiabilityFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      });
      setShowModal(false);
      setSelectedLiability(null);
    } catch (err) {
      console.error("Error updating liability:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedLiability) {
      handleUpdate(liabilityFormData);
    } else {
      try {
        const liability = await liabilitiesAPI.createLiability(liabilityFormData);
        console.log("Liability saved:", liability);
        addLiability(liability);
        setLiabilityFormData({
          description: "",
          amount: "",
          category: "",
          date: "",
          account: "",
          notes: "",
        });
        setShowModal(false);
        setSelectedLiability(null);
      } catch (err) {
        console.error("Error saving Liability:", err);
      }
    }
  }

  return (
    <>
      <h3>{selectedLiability ? "Edit Liability" : "Add an Liability"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={liabilityFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          placeholder="$"
          type="number"
          id="amount"
          name="amount"
          value={liabilityFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={liabilityFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {[
            
            "Bank Loan", 
            "Creditor"
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
            liabilityFormData.date
              ? new Date(liabilityFormData.date).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          required
        />
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={liabilityFormData.account}
          onChange={handleChange}
        >
          <option value="">Select an account</option>
          <option value="Cash">Cash</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={liabilityFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
