import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "./Config";

const Cards = ({ counts }) => {
  return (
    <div>
      <div id="content">
        <div className="cards">
          {counts.map((item, index) => (
            <div className="card" key={index}>
              <h5>No. of {item.title}:</h5>
              <p>{item.total}</p>
              <a className="text-link " href={item.link}>
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
};

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async (tableName) => {
      try {
        const response = await fetch(
          API_ENDPOINT + `admin_totals.php?table=${tableName}`
        );
        const result = await response.json();

        if (result.success) {
          setTableData((prevData) => [...result.data]);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const tables = [
      "staff_membership",
      "student_membership",
      "student_projects",
      "external_membership",
      "internal_internship",
      "external_internship",
    ];

    tables.forEach(fetchTableData);
  }, []);

  return <Cards counts={tableData} />;
};

export default Dashboard;
