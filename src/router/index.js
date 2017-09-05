import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'view',
      component: resolve => require(['../components/pages/view.vue'], resolve)
    },{
      path: '/company',
      name: 'company',
      component: resolve => require(['../components/pages/company.vue'], resolve)
    },{
      path: '/statistics',
      name: 'statistics',
      component: resolve => require(['../components/pages/statistics.vue'], resolve)
    },{
      path: '/classification',
      name: 'classification',
      component: resolve => require(['../components/pages/classification.vue'], resolve)
    },{
      path: '/report',
      name: 'report',
      component: resolve => require(['../components/pages/report.vue'], resolve)
    },{
      path: '/equipment',
      name: 'equipment',
      component: resolve => require(['../components/pages/equipment.vue'], resolve)
    },{
      path: '/record_check',
      name: 'record_check',
      component: resolve => require(['../components/pages/recordCheck.vue'], resolve)
    },{
      path: '/ip_check',
      name: 'ip_check',
      component: resolve => require(['../components/pages/ipCheck.vue'], resolve)
    }          
  ]
})
