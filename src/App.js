/* global chrome */

import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [domain, setDomain] = useState("")
  const [headlines, setHeadlines] = useState("")
  
  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const url = new URL(tabs[0].url)
      const domain = url.hostname
      setDomain(domain)
      getHeadlines(domain)
    })
  }, [])

  const getHeadlines = query => {
    console.log("query is: ", query)
    /* api call to get news headlines */
    
    
    /* TOP HEADLINES IN USA */
    // fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=be845022d39043fda6be28c7bea613c4`) 
    /* HEADLINES FOR SPECIFIC SITE */
    fetch(`https://newsapi.org/v2/everything?q='${query}'&language=en&apiKey=be845022d39043fda6be28c7bea613c4`)
    .then(response => response.json())
    .then(results => {
      setHeadlines(results.articles.slice(0,5))
    })
    .catch(err => console.log("could not fetch headlines: ", err))
  }

  return (
    <div className="App">
       <h1 className="App-title">{domain}</h1>
        Top Headlines:
        {headlines ? headlines.map(headline => (
          <h4 className="link" onClick={() => {
            window.open(headline.url)}}>{headline.title}</h4>)) :
            null
        }
    </div>
  );
}

export default App;
