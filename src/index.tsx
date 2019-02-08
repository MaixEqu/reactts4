import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

