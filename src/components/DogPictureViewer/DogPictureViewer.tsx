import { observer } from "mobx-react-lite";
import { Image, Space, Spin } from 'antd';
import { DogStore } from "../../stores/DogStore/DogStore";
import './DogPictureViewer.css';

const DogPictureViewer = observer(({ dogstore }: { dogstore: DogStore | null }) => 
    (dogstore?.dogPictureUrl ?
        (
            <div>
                <Space wrap className="DogPictureViewerPanel">
                    <Image width={600} src={dogstore?.dogPictureUrl} />
                </Space>
                
            </div>
        ) : (
            <div>
                <Space wrap className="DogPictureViewerPanel">
                    <Spin tip="Loading..." />
                </Space>
            </div>
        )
    ));

export default DogPictureViewer;
