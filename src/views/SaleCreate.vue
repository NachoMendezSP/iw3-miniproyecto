<template>
    <div>
      <h1>Create Sale</h1>
      <v-form>
        <v-text-field v-model="clientName" label="Client Name"></v-text-field>
        <v-text-field v-model="clientSurname" label="Client Surname"></v-text-field>
        <v-text-field v-model="clientPhoneNumber" label="Client Phone Number"></v-text-field>
        <v-text-field v-model="productIds" label="Product IDs (comma-separated)"></v-text-field>
        <v-text-field v-model="amounts" label="Amounts (comma-separated)"></v-text-field>
        <v-btn @click="createSale">Create Sale</v-btn>
        <v-snackbar v-model="successMessage" timeout="2000">Sale created successfully</v-snackbar>
      </v-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientName: '',
        clientSurname: '',
        clientPhoneNumber: '',
        productIds: '',
        amounts: '',
        successMessage: false,
      };
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    calculateTotalCost(productIds, amounts) {
      let totalCost = 0;
      
      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const amount = amounts[i];
        
        // Find the product by productId
        const product = this.products.find(p => p.id === productId);
        
        if (product) {
          totalCost += product.cost * amount;
        }
      }

      return totalCost;
    },
      async createSale() {
        // Parse product IDs and amounts
        const productIdsArray = this.productIds.split(',').map(id => parseInt(id.trim()));
        const amountsArray = this.amounts.split(',').map(amount => parseInt(amount.trim()));
  
        // Calculate the total cost
        const totalCost = this.calculateTotalCost(productIdsArray, amountsArray);
  
        // Check if the client exists or create a new client
        let clientId = null;
        if (this.clientName && this.clientSurname && this.clientPhoneNumber) {
          // Create a new client object
          const newClient = {
            name: this.clientName,
            surname: this.clientSurname,
            phone: this.clientPhoneNumber,
          };
  
          try {
            // Send a POST request to create a new client
            const response = await axios.post('http://localhost:3001/clients', newClient);
            clientId = response.data.id;
          } catch (error) {
            console.error('Error creating client:', error);
          }
        }
  
        // Create a new sale object
        const newSale = {
          clientId: clientId, // Use the new or existing clientId
          productIds: productIdsArray,
          amounts: amountsArray,
          date: new Date().toISOString(), // Current date
          total: totalCost,
        };
  
        try {
          // Send a POST request to create a new sale
          await axios.post('http://localhost:3001/sales', newSale);
  
          // Show success message
          this.successMessage = true;
  
          // Redirect to the sales list page after a delay
          setTimeout(() => {
            this.$router.push('/sales-list');
          }, 2000);
        } catch (error) {
          console.error('Error creating sale:', error);
        }
      }
    },
  };
  </script>
  