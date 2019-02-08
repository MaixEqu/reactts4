import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

class Textareas extends React.Component {
    render() {
      return (
        <div>
            <textarea cols={45} rows={55}>textarea 1</textarea>
            <span> </span>
            <textarea cols={45} rows={55}>textarea 2</textarea>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Textareas />,
    document.getElementById('app')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
