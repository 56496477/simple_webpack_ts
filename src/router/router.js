import Clist from 'page/clist';
import Scard from 'page/card';
import Cropper from 'page/cropper';

const routers = [{
        icon: 'info-circle-o',
        path: '/a',
        name: '信息管理',
        childrens: [{
                path: '/a',
                component: Clist,
                name: 'CNODE列表'
            },
            {
                path: '/b',
                component: Scard,
                name: 'CNODE卡片'
            }
        ]
    },
    {
        icon: 'upload',
        path: '/c',
        component: Cropper,
        name: '上传组件'
    },
    {
        icon: 'database',
        path: '/d',
        component: () => <div>时间期限</div>,
        name: '时间期限'
    }
]

export function getRouters() {
    let menus = [];
    routers.forEach(
        d => {
            if (d.childrens) {
                d.childrens.forEach(
                    c => {
                        menus.push({
                            parentPath: d.path,
                            path: c.path,
                            component: c.component
                        })
                    }
                )
            } else {
                menus.push({
                    parentPath: d.path,
                    path: d.path,
                    component: d.component
                })
            }
        }
    )
    return menus;
}

export default routers;