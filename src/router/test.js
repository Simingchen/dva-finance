// 内部模拟路由
const routerTest = [
  {
    'path': '',
    'name': 'Dashboard',
    'component': 'Layout',
    'redirect': '/dashboard',
    'hidden': null,
    'alwaysShow': false,
    'meta': null,
    'children': [{
      'path': 'dashboard',
      'name': 'Dashboard',
      'component': 'homePage/index',
      'redirect': null,
      'hidden': false,
      'alwaysShow': true,
      'meta': {
        'title': '首页',
        'icon': 'shouye',
        'noCache': false,
        'affix': true
      },
      'children': null
    }]
  },
  { // 商品管理
    'path': '/commodityManagement',
    'component': 'Layout',
    'redirect': 'noredirect',
    'hidden': false,
    'alwaysShow': true,
    'name': 'CommodityManagement',
    'meta': { 'title': '商品管理', 'icon': 'shangpin' },
    'children': [
      {
        'path': 'commodityList',
        'component': 'commodityManagement/commodityList',
        'name': 'CommodityList',
        'meta': { 'title': '商品列表', 'noCache': false }
      },
      {
        'path': 'packageList',
        'component': 'commodityManagement/packageList',
        'name': 'PackageList',
        'meta': { 'title': '套餐列表', 'noCache': false }
      }
    ]
  }

]


export default routerTest
