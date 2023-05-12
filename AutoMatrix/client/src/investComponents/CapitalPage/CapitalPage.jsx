import { useState, useEffect } from "react";
import * as capitalAPI from "../../utilities/capital-api";
import CapitalForm from "../../components/CapitalForm/CapitalForm";
import CapitalFilterForm from "../../components/CapitalFilterForm/CapitalFilterForm";
import "./CapitalPage.css";

export default function CapitalPage() {
  const [capital, setCapital] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [totalCapital, setTotalCapital] = useState(0);
  const [filteredCapital, setFilteredCapital] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = ["All Categories"];
  for (let i = 0; i < capital.length; i++) {
    if (!categories.includes(capital[i].category)) {
      categories.push(capital[i].category);
    }
  }

  useEffect(() => {
    async function fetchCapital() {
      try {
        const data = await capitalAPI.getCapital();
        setCapital(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCapital();
  }, []);

  useEffect(() => {
    let filteredCapital = capital.filter((capital) => {
      if (selectedCategory !== "" && capital.category !== selectedCategory) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const capitalDate = new Date(capital.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (capitalDate < startDate || capitalDate > endDate) {
          return false;
        }
      }

      return true;
    });

    let total = 0;
    for (let i = 0; i < filteredCapital.length; i++) {
      total += filteredCapital[i].amount;
    }
    setTotalCapital(total);
    setFilteredCapital(filteredCapital);
  }, [capital, selectedCategory, selectedDateRange]);

  async function addCapital(capital) {
    setCapital((prevCapital) => [...prevCapital, capital]);
    try {
      const data = await capitalAPI.getCapital();
      setCapital(data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(capitalId) {
    try {
      await capitalAPI.deleteCapital(capitalId);
      const data = await capitalAPI.getCapital();
      setCapital(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleModal() {
    setShowModal((prevShowModal) => !prevShowModal);
    setSelectedCapital(null);
  }

  function handleEdit(capital) {
    setSelectedCapital(capital);
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
    <div className="CapitalPage">
      <h1 className="heading">Capital</h1>
      <div className="row">
        <h1>
          Total Capital: <span>${totalCapital}</span>
        </h1>
        <button onClick={handleToggleModal}>
          <i class="fa-solid fa-plus"></i> Add Capital
        </button>
      </div>
      <CapitalFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <ul className="cards-ctr">
          {filteredCapital.map((capital) => (
            <div
              key={capital._id}
              onClick={() => handleCardClick(capital._id)}
              className={`card ${
                expandedCard === capital._id ? "card-expanded" : ""
              }`}
            >
              <div className="red-bar"></div>
              <div className="row">
                <div className="card-main row">
                  <div>
                    <p className="large">{capital.description}</p>
                    <p>
                      <i class="fa-solid fa-calendar"></i>&nbsp;
                      {capital.date.slice(0, 10)}
                    </p>
                  </div>
                  <p className="large">${capital.amount}</p>
                </div>
              </div>
              <div className="row expanded">
                <p>
                  <i class="fa-solid fa-folder"></i>&nbsp;{capital.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i>&nbsp;{capital.account}
                </p>
                {capital.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i>&nbsp;{capital.notes}
                  </p>
                ) : null}
                <div className="edit-delete-btns">
                  <button onClick={() => handleDelete(capital._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={() => handleEdit(capital)}>
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
            <CapitalForm
              capital={capital}
              setCapital={setCapital}
              addCapital={addCapital}
              selectedCapital={selectedCapital}
              setSelectedCapital={setSelectedCapital}
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
