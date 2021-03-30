
const dogApiUrl = "https://dog.ceo/api"
const getBreedsListUrl = `${dogApiUrl}/breeds/list/all`;
const getRandomPictureUrl = `${dogApiUrl}/breeds/image/random`;
const getRandomPictureByBreedUrl = (breedName: string) => `${dogApiUrl}/breed/${breedName}/images/random/asdasd/asadasd`

export type DogsApiResponseStatus = "success" | "failure";

export type DogsApiResponseMessage = {
    [name: string]: string[];
}

export type GetBreedsListResponse = {
    message: DogsApiResponseMessage;
    status: DogsApiResponseStatus;
}

export type GetDogPicture = {
    message: string;
    status: DogsApiResponseStatus;
}

export const getBreedsList = async (): Promise<GetBreedsListResponse> =>
    (await fetch(getBreedsListUrl, {
        method: "GET"
    })).json();

export const getRandomPicture = async (): Promise<GetDogPicture> =>
    (await fetch(getRandomPictureUrl, {
        method: "GET"
    })).json();    

export const getRandomPictureByBreed = async (breedName: string): Promise<GetDogPicture> =>
    (await fetch(getRandomPictureByBreedUrl(breedName), {
        method: "GET"
    })).json();
