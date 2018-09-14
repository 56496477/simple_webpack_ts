import React from 'react';
import requestHttp from 'util/requestHttp';
import { Card, Avatar, Col, Row } from 'antd';

class Scard extends React.Component {

    state = {
        loading: true,
        cardData: []
    }

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        const result = await requestHttp.get('https://cnodejs.org/api/v1/topics?limit=8');
        this.setState({ 
            cardData: result.data,
        }, () => {
            setTimeout(
                () => {
                    this.setState({loading: false });
                }, 1500
            )
        });
    }   

    render() {

        return (
            <div>
                <Row gutter={16}>
                    {
                        this.state.cardData.map(
                            c => (
                                <Col span={8} style={{marginBottom: 20}} key={c.id}>
                                    <Card
                                        loading={this.state.loading}
                                        hoverable={true}
                                    >
                                        <Card.Meta
                                            avatar={<Avatar src={c.author.avatar_url} />}
                                            title={c.author.loginname}
                                            description={`${c.title.substring(0,20)}...`}
                                        />
                                    </Card>
                                </Col>
                            )
                        )
                    }
                </Row>
            </div>
        )
    }
}

export default Scard;