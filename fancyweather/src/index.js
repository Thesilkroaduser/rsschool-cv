import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));

// async function getLinkToImage() {
//   const url = "https://source.unsplash.com/user/thesilkroaduser/1920x1080"
//   const res = await fetch(url)
//   const data = await res.json()
//   console.log(data.urls.regular)
// }

// getLinkToImage()

reportWebVitals();
