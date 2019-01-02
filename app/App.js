import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux";
import Tweet from "./features/tweet/Tweet";

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Tweet />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
