import { makeObservable, observable } from "mobx";
import { DogStore } from "../DogStore/DogStore";

class RootStore {
    public dogStore: DogStore;

  constructor() {
      makeObservable(this, {
          dogStore: observable
      })
      this.dogStore = new DogStore();
      this.dogStore.initialize();
  }
}

export default RootStore;
