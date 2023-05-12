import React, { useState, useEffect } from "react";
import * as capitalAPI from "../../utilities/capital-api";

export default function CapitalForm({
  capital,
  setCapital,
  addCapital,
  selectedCapital,
  setSelectedCapital,
  setShowModal,
}) {
  const [capitalFormData, setCapitalFormData] = useState(() => {
    if (selectedCapital) {
      return {
        description: selectedCapital.description,
        amount: selectedCapital.amount,
        category: selectedCapital.category,
        date: selectedCapital.date,
        account: selectedCapital.account,
        notes: selectedCapital.notes,
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
    if (selectedCapital) {
      setCapitalFormData(selectedCapital);
    }
  }, [selectedCapital]);

  async function handleChange(event) {
    setCapitalFormData({
      ...capitalFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function updateCapital(updated) {
    try {
      const updatedCapitalList = capital.map((capital) => {
        if (capital._id === updated._id) {
          return { ...updated };
        } else {
          return capital;
        }
      });
      setCapital(updatedCapitalList);
    } catch (err) {
      console.error("Error updating capital", err);
    }
  }
  

  async function handleUpdate(capitalFormData) {
    try {
      const updatedCapital = await capitalAPI.updateCapital(
        selectedCapital._id,
        { ...capitalFormData }
      );
      updateCapital(updatedCapital);
      console.log("Capital updated:", updatedCapital);
      setCapitalFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      });
      setShowModal(false);
      setSelectedCapital(null);
    } catch (err) {
      console.error("Error updating Capital:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedCapital) {
      handleUpdate(capitalFormData);
    } else {
      try {
        const capital = await capitalAPI.createCapital(capitalFormData);
        console.log("Capital saved:", capital);
        addCapital(capital);
        setCapitalFormData({
          description: "",
          amount: "",
          category: "",
          date: "",
          account: "",
          notes: "",
        });
        setShowModal(false);
        setSelectedCapital(null);
      } catch (err) {
        console.error("Error saving capital:", err);
      }
    }
  }

  return (
    <>
      <h3>{selectedCapital ? "Edit Capital" : "Add an Capital"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={capitalFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          placeholder="$"
          type="number"
          id="amount"
          name="amount"
          value={capitalFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={capitalFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {[
            "Additional Capital",
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
            capitalFormData.date
              ? new Date(capitalFormData.date).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          required
        />
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={capitalFormData.account}
          onChange={handleChange}
        >
          <option value="">Select an account</option>
          <option value="Cash">Cash</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={capitalFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
