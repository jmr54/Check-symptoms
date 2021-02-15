import React from 'react';
import logo from './logo.svg';
import './App.css';

function Diagnosis(): JSX.Element { const [diagnosis, setDiagnosis] = React.useState<any[]>([])

    React.useEffect(() => {
        async function callApi() { 
           const callFetch = await fetch("/analysis?symptoms=[10]&gender=male&yearOfBirth=1995", {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }}
           )
           const fetchJson = await callFetch.json()
           console.log(fetchJson) 
           setDiagnosis(fetchJson)
        } callApi();
       
      }, [])
  return (
    <div>Diagnosis my PP<div>{diagnosis.length >0 ? diagnosis[0].Issue.Name : ''}
        </div>
    </div>
  );
}

export default Diagnosis;
