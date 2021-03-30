import React from 'react';
import './App.css';
import RootStoreContext from './stores/RootStore/RootStoreContext';
import RootStore from './stores/RootStore/RootStore';
import BreedSelector from './components/BreedSelector/BreedSelector';
import 'antd/dist/antd.css';
import DogPictureViewer from './components/DogPictureViewer/DogPictureViewer';
import { autorun } from 'mobx';
import { BreedNotSelectedText } from './stores/DogStore/DogStore';
import { notification } from 'antd';

const rootStore = new RootStore();

const App: React.FC = () => (
  <div className="App">
    <RootStoreContext.Provider value={rootStore}>
      <BreedSelector />
      <DogPictureViewer dogstore={rootStore.dogStore} />
    </RootStoreContext.Provider>
  </div>
);

autorun(() => {
  if (rootStore.dogStore.selectedBreed !== BreedNotSelectedText) {
    notification.open({
      message: "Weronika nie odchodź!",
      description: `Piesek rasy ${rootStore.dogStore.selectedBreed} płacze!`,
      duration: 2
    });
  }
});

export default App;
