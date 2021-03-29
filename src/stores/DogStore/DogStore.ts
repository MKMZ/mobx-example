import { makeAutoObservable, observable, runInAction } from "mobx";
import { DogsApiResponseMessage, getBreedsList, getRandomPicture, getRandomPictureByBreed } from "../../api/DogsApi/commands";

export type Breed = {
    name: string;
    subBreeds: string[];
}

export class DogStore {
    private rawBreeds: DogsApiResponseMessage = {};

    public dogPictureUrl: string | null = null;

    constructor() {
        makeAutoObservable(this, {
            dogPictureUrl: observable
        });
    }

    async initialize() {
        await this.fetchBreeds();
    }

    async fetchBreeds() {
        const breedsListResponse = await getBreedsList();
        const randomPictureResponse = await getRandomPicture();
        runInAction(() => {
            this.rawBreeds = breedsListResponse.message;
            this.dogPictureUrl = randomPictureResponse.message;
        });
    }

    async loadRandomPictureByBreed(breedName: string) {
        const response = await getRandomPictureByBreed(breedName);
        runInAction(() => {
            this.dogPictureUrl = response.message;
        });
    }

    get breeds() {
        return Object.keys(this.rawBreeds).map(key => ({
            name: key,
            subBreeds: this.rawBreeds[key],
        }));
    }
}
