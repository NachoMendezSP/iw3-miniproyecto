<template>
    <div>
      <h1>Add Product</h1>
      <!-- Form for adding a new product -->
      <v-form>
        <v-text-field v-model="newProduct.name" label="Name"></v-text-field>
        <v-text-field v-model="newProduct.cost" label="Cost" type="number"></v-text-field>
        <v-text-field v-model="newProduct.manufacturingCost" label="Manufacturing Cost" type="number"></v-text-field>
        <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
        <v-btn @click="saveNewProduct">Save Product</v-btn>
      </v-form>
      
      <!-- Display success message if product creation is successful -->
      <v-alert v-if="successMessage" type="success">{{ successMessage }}</v-alert>
      
      <!-- Display error message if product creation fails -->
      <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newProduct: {
          name: '',
          cost: null,
          manufacturingCost: null,
          description: '',
        },
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      async saveNewProduct() {
        // Validate the input data
        if (!this.newProduct.name || this.newProduct.cost < 0 || this.newProduct.manufacturingCost < 0) {
          this.errorMessage = 'Invalid input data. Please check the form fields.';
          return;
        }
  
        try {
          // Send a GET request to check if a product with the same name already exists
          const response = await axios.get(`http://localhost:3001/products?name=${this.newProduct.name}`);
          if (response.data.length > 0) {
            this.errorMessage = 'A product with the same name already exists. Please choose a different name.';
            return;
          }
  
          // Send a POST request to create a new product
          await axios.post('http://localhost:3001/products', this.newProduct);
          // Display a success message
          this.successMessage = 'Product created successfully.';
          // Clear the form fields
          this.newProduct = {
            name: '',
            cost: null,
            manufacturingCost: null,
            description: '',
          };
          // Automatically redirect to the product list page after a delay (e.g., 2 seconds)
          setTimeout(() => {
            this.$router.push('/');
            }, 2000); // 2000 milliseconds (2 seconds)
        } catch (error) {
          console.error('Error saving new product:', error);
          this.errorMessage = 'An error occurred while creating the product.';
        }
      },
    },
  };
  </script>
  