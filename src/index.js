import React from 'react';
import ReactDOM from "react-dom";
import style from './index.css';
const x = [1,2,3,4];
ReactDOM.render(<h1>Pohodnik{x.map(n=>n*10).join(';')}</h1>, document.getElementById("root"));

