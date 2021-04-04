import React, { useState, useEffect } from "react";
import axios from "axios";

/*function Search() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    fetch('/analysis')
    .then(res => res.json())
    .then((result) => {
      setData(result)
    }) 

  }, [])
// for our second param, we have 3 diff options, empty, array or an term inside the array and will update depending on what you pass in  

  return (
    <div>
       {setData}
    </div>
  );
};

export default Search;
 */

function Search() {
  const [diagnosis, setDiagnosis] = useState([]);

  React.useEffect(() => {
    async function callApi() {
      const callFetch = await fetch(
        "/analysis?symptoms=[10]&gender=male&yearOfBirth=1995",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const fetchJson = await callFetch.json();
      setDiagnosis(fetchJson);
      console.log(fetchJson);
    }
    callApi();
  }, []);

  return (
    <div>
      <div>Diagnosis my sickness: {diagnosis.length > 0 ? diagnosis[3].Issue.Name : ""}</div>
      Other common symptoms with it:{" "}
      {diagnosis.length > 0 ? diagnosis[3].Issue.IcdName : ""}
      <div>
        Medical Name: {diagnosis.length > 0 ? diagnosis[3].Issue.ProfName : ""}
      </div>
    </div>
  );
}

export default Search;
