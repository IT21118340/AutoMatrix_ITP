import { useState, useEffect } from "react";
import * as investmentsAPI from "../../utilities/investment-api";
import InvestmentForm from "../../components/InvestmentForm/investmentForm";
import InvestmentsFilterForm from "../../components/investmentFilterForm/investmentFilterForm";
import "./investmentPage.css";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const componentRef = useRef(null);

  const categories = ["All Categories"];
  for (let i = 0; i < investments.length; i++) {
    if (!categories.includes(investments[i].category)) {
      categories.push(investments[i].category);
    }
  }

  useEffect(() => {
    async function fetchInvestments() {
      try {
        const data = await investmentsAPI.getInvestments();
        setInvestments(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInvestments();
  }, []);

  useEffect(() => {
    let filteredInvestments = investments.filter((investment) => {
      if (selectedCategory !== "" && investment.category !== selectedCategory) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const investmentDate = new Date(investment.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (investmentDate < startDate || investmentDate > endDate) {
          return false;
        }
      }

      return true;
    });

    let total = 0;
    for (let i = 0; i < filteredInvestments.length; i++) {
      total += filteredInvestments[i].amount;
    }
    setTotalInvestments(total);
    setFilteredInvestments(filteredInvestments);
  }, [investments, selectedCategory, selectedDateRange]);

  async function addInvestment(investment) {
    setInvestments((prevInvestments) => [...prevInvestments, investment]);
    try {
      const data = await investmentsAPI.getInvestments();
      setInvestments(data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(investmentId) {
    try {
      await investmentsAPI.deleteInvestment(investmentId);
      const data = await investmentsAPI.getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleModal() {
    setShowModal((prevShowModal) => !prevShowModal);
    setSelectedInvestment(null);
  }

  function handleEdit(investment) {
    setSelectedInvestment(investment);
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
    <div className="InvestmentsPage">
      <h1 className="heading">Investments</h1>
      <div className="row">
        <h1>
          Total Investments: <span>${totalInvestments}</span>
        </h1>
        <button onClick={handleToggleModal}>
          <i class="fa-solid fa-plus"></i> Add Investment
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
      <InvestmentsFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <ul className="cards-ctr">
          {filteredInvestments.map((investment) => (
            <div
              key={investment._id}
              onClick={() => handleCardClick(investment._id)}
              className={`card ${
                expandedCard === investment._id ? "card-expanded" : ""
              }`}
            >
              <div className="red-bar"></div>
              <div className="row">
                <div className="card-main row">
                  <div>
                    <p className="large">{investment.description}</p>
                    <p>
                      <i class="fa-solid fa-calendar"></i>&nbsp;
                      {investment.date.slice(0, 10)}
                    </p>
                  </div>
                  <p className="large">${investment.amount}</p>
                </div>
              </div>
              <div className="row expanded">
                <p>
                  <i class="fa-solid fa-folder"></i>&nbsp;{investment.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i>&nbsp;{investment.account}
                </p>
                {investment.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i>&nbsp;{investment.notes}
                  </p>
                ) : null}
                <div className="edit-delete-btns">
                  <button onClick={() => handleDelete(investment._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={() => handleEdit(investment)}>
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
            <InvestmentForm
              investments={investments}
              setInvestments={setInvestments}
              addInvestment={addInvestment}
              selectedInvestment={selectedInvestment}
              setSelectedInvestment={setSelectedInvestment}
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
