import React from 'react';
import requestHttp from 'util/requestHttp';
import { Table } from 'antd';

class Clist extends React.Component {

    state = {
        tableData: []
    }

    column = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 260
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            width: 500
        },
        {
            title: 'tab',
            dataIndex: 'tab',
            key: 'tab',
            width:150
        },
        {
            title: 'last_reply_at',
            dataIndex: 'last_reply_at',
            key: 'last_reply_at',
            width: 280
        }
    ]

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        const result = await requestHttp.get('https://cnodejs.org/api/v1/topics?limit=12');
        this.setState({
            tableData: result.data
        })
    }

    render() {

        return (
            <Table 
                columns={this.column}
                dataSource={this.state.tableData}
                rowKey='id'
            />
        )

    }
}

export default Clist;