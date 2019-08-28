import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import style from './style.m.less'
const x = [1,2,3,4];
class App extends React.Component {
    render() {
        return <h1 className={style.h1}>Pohodnik!</h1>
    }
}
ReactDOM.hydrate(<App />, document.getElementById("root"));

