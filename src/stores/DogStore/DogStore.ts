import { makeAutoObservable, observable, runInAction } from "mobx";
import { DogsApiResponseMessage, getBreedsList, GetDogPicture, getRandomPicture, getRandomPictureByBreed } from "../../api/DogsApi/commands";

export type Breed = {
    name: string;
    subBreeds: string[];
}

export class DogStore {
    private rawBreeds: DogsApiResponseMessage = {};
    private breedName: string | null = null;
    
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
            this.breedName = breedName;
            this.dogPictureUrl = response.message;
        });
    }

    async refreshRandomPicture() {
        let response: GetDogPicture;
        
        if (this.breedName) {
            response = await getRandomPictureByBreed(this.breedName);
        }
        else {
            response = await getRandomPicture();
        }
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

    get selectedBreed() {
        return this.breedName ?? "None";
    }
}
