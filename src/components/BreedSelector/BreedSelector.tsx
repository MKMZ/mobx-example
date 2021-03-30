import { Button, Space, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import RootStoreContext from "../../stores/RootStore/RootStoreContext";
import './BreedSelector.css';

const { Option } = Select;

const BreedSelector = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const dogStore = rootStore?.dogStore;
    const breedSelected = (value: string) => dogStore?.loadRandomPictureByBreed(value);
    const getAnotherOne = () => {
        dogStore?.refreshRandomPicture();
    }

    const breeds = rootStore?.dogStore.breeds || [];
    const breedMenu = breeds.map((breed, idx) => (<Option key={`BreedMenuItem${idx}`} value={breed.name}>{breed.name}</Option>));
    
    return (
        <div>
            <Space wrap className="BreedSelectorPanel">
                <p className="BreedSelectorChoice">Selected breed: {dogStore?.selectedBreed}</p>
                <Select className="BreedSelectorSelect" onChange={breedSelected}>
                    {breedMenu}
                </Select>
                <Button onClick={getAnotherOne}>Get another one!</Button>
            </Space>
        </div>
    )
});

export default BreedSelector;