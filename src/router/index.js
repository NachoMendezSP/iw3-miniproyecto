import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductEdit from '../views/ProductEdit.vue'; 
import ProductCreate from '../views/ProductCreate.vue'; 
import SalesList from '../views/SalesList.vue'; 
import SaleCreate from '../views/SaleCreate.vue'; 
import EarningsByMonth from '../views/EarningsByMonth.vue'; 

const routes = [
  {
    path: '/',
    name: 'product-list',
    component: ProductList
  },
  {
    path: '/sales-list', 
    name: 'sales-list',
    component: SalesList 
  },
  {
    path: '/sales-create', 
    name: 'sales-create',
    component: SaleCreate 
  },
  {
    path: '/earnings-month', 
    name: 'earnings-month',
    component: EarningsByMonth 
  },
  {
    path: '/create-product', 
    name: 'create-product',
    component: ProductCreate 
  },
  {
    path: '/edit-product/:id', 
    name: 'product-edit',
    component: ProductEdit, 
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
