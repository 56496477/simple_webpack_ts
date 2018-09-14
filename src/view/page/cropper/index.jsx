import React from 'react';
import Cropper from 'cropperjs';
import { Modal, Button } from 'antd';
import { blobToUrl } from 'util/utils';

import demoImg from 'assets/images/910.jpg';
import '../../../../node_modules/cropperjs/dist/cropper.min.css';

class CropperPage extends React.Component {

    state = {
        visible: false,
        imgUrl: ''
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._copper = new Cropper(this.refDom, {
            aspectRatio: 16 / 9,
            viewMode: 1
        });
    }

    rotateRight = () => {
        this._copper.rotate(90);
    }

    rotateLeft = () => {
        this._copper.rotate(-90);
    }

    reset = () => {
        this._copper.reset();
    }

    submit = () => {
        this._copper.getCroppedCanvas().toBlob(
            blob => {
                const url = blobToUrl(blob);
                this.setState({
                    visible: true,
                    imgUrl: url
                })
            }
        )
    }

    render() {
        return (
            <div className="simple-cropper">
                <div style={{ width: 800, height: 500 }}>
                    <img style={{ width: 500, display: 'none' }} src={demoImg} ref={ref => this.refDom = ref} />
                </div>
                <br />
                <Modal
                    title="图片预览"
                    visible={this.state.visible}
                    onOk={() => this.setState({ visible: false })}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <img style={{ width: 470 }} src={this.state.imgUrl} />
                </Modal>
                <Button type="primary" onClick={this.rotateRight}>顺时针旋转</Button>
                <Button type="primary" onClick={this.rotateLeft}>逆时针旋转</Button>
                <Button type="primary" onClick={this.reset}>重置</Button>
                <Button type="primary" onClick={this.submit}>确认</Button>
            </div>
        )
    }

    componentWillUnmount() {
        this._copper = null;
    }

}

export default CropperPage;