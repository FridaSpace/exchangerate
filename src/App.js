import {useState} from "react";


const URL = "http://api.exchangeratesapi.io/v1/latest?access_key=";
const API_KEY = "728ff25e7bd9db4489a670ec4f94d1c6";



function App() {
  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert("Error retrieving exchange rate.");
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container" style={{margin: 50}}>
      <h1>Exchange rates</h1>
      <form onSubmit={convert}>
        <div>
          <label>Eur</label>&nbsp;
          <input type="number" step="0.01"
          value={eur} style={{marginBottom: 15}} onChange={e => setEur(e.target.value)} />
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>
          <output style={{marginLeft: 10}}>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button style={{marginTop: 15}}>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
