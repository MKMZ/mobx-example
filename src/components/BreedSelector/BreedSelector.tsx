import { Button, Dropdown, Menu, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import RootStoreContext from "../../stores/RootStore/RootStoreContext";
import './BreedSelector.css';

const BreedSelector = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const dogStore = rootStore?.dogStore;
    const breedSelected = ({ key }: any) => {
        dogStore?.loadRandomPictureByBreed(key);
    }

    const breeds = rootStore?.dogStore.breeds || [];
    const breedMenuItems = breeds.map((breed) => (<Menu.Item onClick={breedSelected} key={breed.name}>{breed.name}</Menu.Item>));
    const breedMenu = (<Menu>{breedMenuItems}</Menu>);
    
    return (
        <div>
            <Space wrap className="BreedSelectorPanel">
                <Dropdown overlay={breedMenu} arrow><Button >Select Breed</Button></Dropdown>
            </Space>
        </div>
    )
});

export default BreedSelector;