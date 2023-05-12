import { useState, useEffect } from "react";
import * as liabilitiesAPI from "../../utilities/liability-api";
import LiabilityForm from "../../components/LiabilityForm/liabilityForm";
import LiabilitiesFilterForm from "../../components/LiabilityFilterForm/LiabilityFilterForm";
import "./LiabilityPage.css";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function LiabilitiesPage() {
  const [liabilities, setLiabilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLiability, setSelectedLiability] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [filteredLiabilities, setFilteredLiabilities] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const componentRef = useRef(null);

  const categories = ["All Categories"];
  for (let i = 0; i < liabilities.length; i++) {
    if (!categories.includes(liabilities[i].category)) {
      categories.push(liabilities[i].category);
    }
  }

  useEffect(() => {
    async function fetchLiabilities() {
      try {
        const data = await liabilitiesAPI.getLiabilities();
        setLiabilities(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLiabilities();
  }, []);

  useEffect(() => {
    let filteredLiabilities = liabilities.filter((liability) => {
      if (selectedCategory !== "" && liability.category !== selectedCategory) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const liabilityDate = new Date(liability.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (liabilityDate < startDate || liabilityDate > endDate) {
          return false;
        }
      }

      return true;
    });

    let total = 0;
    for (let i = 0; i < filteredLiabilities.length; i++) {
      total += filteredLiabilities[i].amount;
    }
    setTotalLiabilities(total);
    setFilteredLiabilities(filteredLiabilities);
  }, [liabilities, selectedCategory, selectedDateRange]);

  async function addLiability(liability) {
    setLiabilities((prevLiabilities) => [...prevLiabilities, liability]);
    try {
      const data = await liabilitiesAPI.getLiabilities();
      setLiabilities(data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(liabilityId) {
    try {
      await liabilitiesAPI.deleteLiability(liabilityId);
      const data = await liabilitiesAPI.getLiabilities();
      setLiabilities(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleModal() {
    setShowModal((prevShowModal) => !prevShowModal);
    setSelectedLiability(null);
  }

  function handleEdit(liability) {
    setSelectedLiability(liability);
    setShowModal(true);
  }

  function handleCardClick(id) {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  }

  return (
    <div className="LiabilitiesPage">
      <h1 className="heading">Liabilities</h1>
      <div className="row">
        <h1>
          Total Liabilities: <span>${totalLiabilities}</span>
        </h1>
        <button onClick={handleToggleModal}>
          <i class="fa-solid fa-plus"></i> Add Liability
        </button>
        <ReactToPrint
          trigger={() => (
            <button id="print">
              Print PDF&nbsp;&nbsp;<i class="fa-solid fa-print"></i>
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <LiabilitiesFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <ul className="cards-ctr">
          {filteredLiabilities.map((liability) => (
            <div
              key={liability._id}
              onClick={() => handleCardClick(liability._id)}
              className={`card ${
                expandedCard === liability._id ? "card-expanded" : ""
              }`}
            >
              <div className="red-bar"></div>
              <div className="row">
                <div className="card-main row">
                  <div>
                    <p className="large">{liability.description}</p>
                    <p>
                      <i class="fa-solid fa-calendar"></i>&nbsp;
                      {liability.date.slice(0, 10)}
                    </p>
                  </div>
                  <p className="large">${liability.amount}</p>
                </div>
              </div>
              <div className="row expanded">
                <p>
                  <i class="fa-solid fa-folder"></i>&nbsp;{liability.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i>&nbsp;{liability.account}
                </p>
                {liability.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i>&nbsp;{liability.notes}
                  </p>
                ) : null}
                <div className="edit-delete-btns">
                  <button onClick={() => handleDelete(liability._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={() => handleEdit(liability)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>

      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleToggleModal}>
              &times;
            </span>
            <LiabilityForm
              liabilities={liabilities}
              setLiabilities={setLiabilities}
              addLiability={addLiability}
              selectedLiability={selectedLiability}
              setSelectedLiability={setSelectedLiability}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
