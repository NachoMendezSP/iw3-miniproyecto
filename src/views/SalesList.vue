<template>
  <div>
    <h1>Sales List</h1>
    <v-text-field v-model="search" label="Search by Client Name" @input="filterSales"></v-text-field>
    <v-btn @click="addSale">Add Sale</v-btn>
    <v-btn @click="goToEarningsByMonth">Earnings by Month</v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Client Name</th>
          <th class="text-center">Date</th>
          <th class="text-center">Total</th>
          <th class="text-center">Products</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td>{{ sale.id }}</td>
          <td>{{ getClientName(sale.clientId) }}</td>
          <td>{{ formatSaleDate(sale.date) }}</td>
          <td>{{ sale.total }}</td>
          <td>{{ getProductNames(sale.productIds) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sales: [],
      clients: [],
      products: [],
      search: '',
      monthlyEarnings: {}
    };
  },
  created() {
    this.fetchSales();
    this.fetchClients();
    this.fetchProducts();
  },
  methods: {
    async fetchSales() {
      try {
        const response = await axios.get('http://localhost:3001/sales');
        this.sales = response.data;
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    },
    filterSales() {
      const searchQuery = this.search.toLowerCase().trim();
      if (!searchQuery) {
        // If search query is empty, display all sales
        this.fetchSales();
      } else {
        // Filter sales based on client name
        this.sales = this.sales.filter(sale => {
          const clientName = this.getClientName(sale.clientId).toLowerCase();
          return clientName.includes(searchQuery);
        });
      }
    },
      addSale() {
      this.$router.push('/sales-create');
    },
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3001/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    getClientName(clientId) {
      const client = this.clients.find(client => client.id === clientId);
      return client ? `${client.name} ${client.surname}` : 'Unknown';
    },
    formatSaleDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getProductNames(productIds) {
      const productNames = [];
      for (const productId of productIds) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
          productNames.push(product.name);
        }
      }
      return productNames.join(', ');
    },
    goToEarningsByMonth() {
      this.$router.push('earnings-month');
    }
  }
};
</script>
