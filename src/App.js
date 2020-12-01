import './App.css';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Edit from './Edit';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route path="/edit" component={Edit} />
      </Switch>
    </div>
  );
}

export default App;