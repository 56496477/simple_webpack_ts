import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import RouterCompontent from 'router/index';
import routers, { getRouters } from 'router/router';

const { Header, Sider, Content } = Layout;

const r = getRouters();

class App extends React.Component {

    state = {
        collapsed: false,
        defaultPathName: [],
        defaultOpenName: [],
    };

    menu = (
        <Menu>
            <Menu.Item key="1">注销</Menu.Item>
        </Menu>
    )

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let defaultOpenName;
        let { pathname } = window.location;
        
        if (pathname === '/') {
            window.location.href = r[0].path;
        } else {
            pathname = pathname;
            defaultOpenName = r.find(d => d.path === pathname).parentPath;
        }
        this.setState({
            defaultPathName: [pathname],
            defaultOpenName: [defaultOpenName]
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <RouterCompontent>
                <Route path='/' render={() => {
                    return (
                        <Layout>
                            <Sider
                                trigger={null}
                                collapsible
                                className="simple-sider"
                                collapsed={this.state.collapsed}
                            >
                                <div className="logo" />
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    defaultSelectedKeys={this.state.defaultPathName}
                                    defaultOpenKeys={this.state.defaultOpenName}
                                >
                                    {
                                        routers.map(
                                            v => {
                                                if (v.childrens) {
                                                    return (
                                                        <Menu.SubMenu
                                                            key={v.path}
                                                            title={
                                                                <Fragment>
                                                                    <Icon type={v.icon} />
                                                                    <span>{v.name}</span>
                                                                </Fragment>
                                                            }
                                                        >
                                                            {
                                                                v.childrens.map(
                                                                    s => {
                                                                        return (
                                                                            <Menu.Item key={s.path}>
                                                                                <Link to={s.path}>
                                                                                    {s.name}
                                                                                </Link>
                                                                            </Menu.Item>
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </Menu.SubMenu>
                                                    )
                                                }
                                                return (
                                                    <Menu.Item key={v.path}>
                                                        <Link to={v.path}>
                                                            <Icon type={v.icon} />
                                                            <span>{v.name}</span>
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            }
                                        )
                                    }
                                </Menu>
                            </Sider>
                            <Layout>
                                <Header className="simple-header" style={{ background: '#fff', padding: 0 }}>
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                    <Dropdown overlay={this.menu} >
                                        <Icon
                                            className="trigger"
                                            type="poweroff"
                                            theme="outlined"
                                        />
                                    </Dropdown>
                                </Header>
                                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                                    <Switch>
                                        {
                                            r.map(
                                                c => (
                                                    <Route key={c.path} path={c.path} component={c.component}></Route>
                                                )
                                            )
                                        }
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    )
                }}>
                </Route>
            </RouterCompontent>
        )
    }
}

export default App;