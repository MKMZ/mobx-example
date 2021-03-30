import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { DogsApiResponseMessage, getBreedsList, GetDogPicture, getRandomPicture, getRandomPictureByBreed } from "../../api/DogsApi/commands";

const pepeSadUrl = "./pepeSad.png";

export type Breed = {
    name: string;
    subBreeds: string[];
}

export const BreedNotSelectedText = "None";
export const RandomBreedText = "Random";

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

    loadRandomPictureByBreed(breedName: string) {
        getRandomPictureByBreed(breedName).then(
            action("getRandomPictureByBreedSuccess", response => {
                this.breedName = breedName;
                this.dogPictureUrl = response.message;
            }),
            action("getRandomPictureByBreedFailure", (error) => {
                console.error(error);
                this.dogPictureUrl = pepeSadUrl;
            })
        );
    }

    *refreshRandomPicture() {
        let response: GetDogPicture;
        
        if (this.breedName) {
            response = yield getRandomPictureByBreed(this.breedName);
        }
        else {
            response = yield getRandomPicture();
        }
        this.dogPictureUrl = response.message;
    }

    get breeds() {
        return Object.keys(this.rawBreeds).map(key => ({
            name: key,
            subBreeds: this.rawBreeds[key],
        }));
    }

    get selectedBreed() {
        return this.breedName ?? BreedNotSelectedText;
    }

    get displayedBreed() {
        return this.breedName ?? RandomBreedText;
    }
}