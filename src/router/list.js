import Layout from '@/views/layout/Layout.jsx'
import page from '@/views/IndexPage.jsx'
import testLit from './test.js'
console.log(testLit)

let tempList = []
testLit.forEach(item => {
    let tempChildren = []
    if (item.children) {
      tempChildren = item.children.map(child => {
        return  {
            path: item.path + '/' + child.path,
            models: () => [import('@/models/'+ child.name.toLowerCase() +'.js')],
            component: () => import('@/views/'+ child.component.toLowerCase() +'.jsx'),
            modelName: child.name.toLowerCase(),
            componentName: child.component.toLowerCase(),
          }
      })
    }
    tempList = [...tempList, ...tempChildren]
})

console.log(tempList)

const routes = [
    {
      path: '/',
      'Layout': Layout,
      models: () => [import('@/models/user.js')],
      component: () => import('@/views/IndexPage.jsx'),
    },
    {
      path: '/login',
      models: () => [import('@/models/login.js')],
      component: () => require('@/views/login.jsx'),
    },
    { // 商品管理
      'path': '/commodityManagement',
      component: () => import('@/views/layout/Layout.jsx'),
      'children': [
        {
          'path': 'commodityList',
          models: () => [import('@/models/commodityList.js')],
          component: () => import('@/views/commodityManagement/commodityList.jsx'),
          'name': 'CommodityList',
          'meta': { 'title': '商品列表', 'noCache': false }
        },
        // {
        //   'path': 'packageList',
        //   'component': 'commodityManagement/packageList',
        //   'name': 'PackageList',
        //   'meta': { 'title': '套餐列表', 'noCache': false }
        // }
      ]
    }
    // { // 订单管理
    //   'path': '/orderManagement',
    //   'component': 'Layout',
    //   'redirect': 'noredirect',
    //   'hidden': false,
    //   'alwaysShow': true,
    //   'name': 'Orderanagement',
    //   'meta': { 'title': '订单管理', 'icon': 'dingdan' },
    //   'children': [
    //     {
    //       'path': 'orderList',
    //       'component': 'orderManagement/orderList',
    //       'name': 'OrderList',
    //       'meta': { 'title': '订单列表', 'noCache': false }
    //     }
    //   ]
    // }

  ];

export default routes
