<template>
    <div>
      <h1>Edit Product</h1>
      <!-- Form for editing product attributes -->
      <v-form>
        <v-text-field v-model="editedProduct.name" label="Name" data-cy="product-name"></v-text-field>
        <v-text-field v-model="editedProduct.cost" label="Cost"></v-text-field>
        <v-text-field v-model="editedProduct.manufacturingCost" label="Manufacturing Cost"></v-text-field>
        <v-text-field v-model="editedProduct.description" label="Description"></v-text-field>
        <v-btn @click="saveChanges">Save Changes</v-btn>
      </v-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedProduct: {
          id: null,
          name: '',
          cost: null,
          manufacturingCost: null,
          description: '',
        },
      };
    },
    created() {
      // Fetch the product data using this.$route.params.id and populate editedProduct
      this.fetchProduct();
    },
    methods: {
      async fetchProduct() {
        const productId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3001/products/${productId}`);
          this.editedProduct = response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      },
      async saveChanges() {
        const productId = this.$route.params.id;
        try {
            // Send PUT request to update the product data
            await axios.put(`http://localhost:3001/products/${productId}`, this.editedProduct);

            // Redirect back to the product list view after saving changes
            this.$router.push('/');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
        },
    },
  };
  </script>
  