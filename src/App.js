/* global chrome */

import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [domain, setDomain] = useState("")
  const [headlineData, setHeadlines] = useState("")
  const [currHeads, setCurrHeads] = useState("")
  const [numHeadlines, setNumHeadlines] = useState(0)
  const [category, setCategory] = useState("")
  
  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const url = new URL(tabs[0].url)
      const domain = url.hostname
      setDomain(domain)
      getHeadlines(domain)
    })
  }, [])

  const getHeadlines = (query, cat="") => {
    /* api call to get news headlines */
    
    if(cat){
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=be845022d39043fda6be28c7bea613c4`) 
      .then(response => response.json())
      .then(results => {
        setHeadlines(results.articles.slice(0, numHeadlines))
        setCurrHeads(results.articles.slice(0, numHeadlines))
      })
      .catch(err => console.log("could not fetch headlines: ", err))
    }
    else{
      /* TOP HEADLINES IN USA */
      fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=be845022d39043fda6be28c7bea613c4`) 
      /* HEADLINES FOR SPECIFIC SITE */
      // fetch(`https://newsapi.org/v2/everything?q='${query}'&language=en&apiKey=be845022d39043fda6be28c7bea613c4`)
      .then(response => response.json())
      .then(results => {
        setHeadlines(results.articles.slice(0, numHeadlines))
        setCurrHeads(results.articles.slice(0, numHeadlines))
      })
      .catch(err => console.log("could not fetch headlines: ", err))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getHeadlines(domain, category)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setNumHeadlines(e.target.value)
  }

  return (
    <div className="App">
       {/* <h1 className="App-title">{domain}</h1> */}
       <div className="categories">
        <label>Select a category of news</label>
        <select id="category" onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} id="form">
        <div className="numbers">
          <label for="numInput">Number of headlines</label>
          <input type="number" id="numInput" value={numHeadlines} max="10" min="0" onChange={handleChange}></input>
        </div>
        <button >Show Me Headlines</button>
       </form>
       
       <h1>Top Headlines Today</h1>
        {numHeadlines && currHeads ? currHeads.map(headline => (
          <h4 className="link" onClick={() => {
            window.open(headline.url)}}>{headline.title}</h4>)) :
            null
        }
    </div>
  );
}

export default App;
