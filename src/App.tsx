import React from 'react';
import './App.css';
import RootStoreContext from './stores/RootStore/RootStoreContext';
import RootStore from './stores/RootStore/RootStore';
import BreedSelector from './components/BreedSelector/BreedSelector';
import 'antd/dist/antd.css';
import DogPictureViewer from './components/DogPictureViewer/DogPictureViewer';

const App: React.FC = () => {
  const rootStore = new RootStore();
  return (
    <div className="App">
      <RootStoreContext.Provider value={rootStore}>
        <BreedSelector />
        <DogPictureViewer dogstore={rootStore.dogStore} />
      </RootStoreContext.Provider>
    </div>
  );
}

export default App;
