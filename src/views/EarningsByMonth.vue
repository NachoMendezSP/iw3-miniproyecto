<template>
    <div>
      <h1>Total Earnings by Month</h1>
      <ul>
        <li v-for="(earnings, month) in totalEarnings" :key="month">
          {{ month }}: ${{ earnings.toFixed(2) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sales: [],
        totalEarnings: {},
      };
    },
    created() {
      this.calculateTotalEarnings();
    },
    methods: {
      async calculateTotalEarnings() {
        try {
          const response = await axios.get('http://localhost:3001/sales');
          this.sales = response.data;
  
          // Initialize the totalEarnings object
          this.totalEarnings = {};
  
          // Iterate through all months in a specified range (e.g., 12 months)
          const currentDate = new Date();
          for (let i = 0; i < 12; i++) {
            const monthYear = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
            this.totalEarnings[monthYear] = 0;
            currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
          }
  
          // Calculate total earnings by month
          this.sales.forEach(sale => {
            const date = new Date(sale.date);
            const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  
            if (!this.totalEarnings[monthYear]) {
              this.totalEarnings[monthYear] = 0;
            }
  
            this.totalEarnings[monthYear] += sale.total;
          });
        } catch (error) {
          console.error('Error fetching sales:', error);
        }
      },
    },
  };
  </script>
  