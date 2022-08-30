import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const url = "/books";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>ServicePros Coding Challenge</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> to get started
        </p>
        <p>
          Check the <code>console</code> by accessing DevTools with <code>F12</code>. You can see the data returned from the API there at first.
        </p>
      </div>
    </div>
  )
}

export default App
