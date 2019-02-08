import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

class EssayForm extends React.Component {

    render() {
      return (
        <div className="example">
            <span>Essay #1</span>
            <br/>
            <textarea cols={40} rows={20}>fsdfds</textarea>
            <br/>
            <input type="submit" value="Submit" />
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <EssayForm />,
    document.getElementById('app')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
