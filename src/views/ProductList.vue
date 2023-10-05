<template>
    <div>
      <h1>Product List</h1>
      <v-text-field v-model="search" label="Search by Name" @input="filterProducts"></v-text-field>
      <v-btn @click="addProduct">Add Product</v-btn>
      <v-table>
        <!-- Table headers -->
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Name</th>
            <th class="text-center">Cost</th>
            <th class="text-center">Manufacturing Cost</th>
            <th class="text-center">Actions</th> <!-- New column for buttons -->
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <tr v-for="product in sortedProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.cost }}</td>
            <td>{{ product.manufacturingCost }}</td>
            <td>
                <v-btn @click="editProduct(product.id)">
                Edit
                </v-btn>
                <v-btn @click="showProductDetails(product)">
                Show Details
                </v-btn>
                <v-btn @click="deleteProduct(product)">
                Delete
                </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
       <!-- Product Details Dialog -->
    <v-dialog v-model="showDetailsDialog" max-width="500">
      <v-card>
        <v-card-title>
          Product Details
        </v-card-title>
        <v-card-text>
          <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
          <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showDetailsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>
          Delete Product
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="confirmDelete">Yes</v-btn>
          <v-btn color="primary" @click="showDeleteDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
        sortedProducts: [], // New sortedProducts array
        showDetailsDialog: false,
        showDeleteDialog: false,
        selectedProduct: null,
        search: '',
      };
    },
    created() {
      this.fetchProducts();
    },
    watch: {
      products: {
        handler: 'sortProductsByName', // Watch for changes in the products array
        immediate: true, // Sort initially as well
      },
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
      filterProducts() {
      const searchQuery = this.search.toLowerCase().trim();
      this.sortedProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
      );
    },
    addProduct() {
      // Navigate to the product creation view (if you have one)
      this.$router.push('/create-product');
    },
      editProduct(productId) {
        // Navigate to the product editing view and pass the product ID
        this.$router.push({ name: 'product-edit', params: { id: productId } });
      },
      showProductDetails(product) {
        this.selectedProduct = product;
        this.showDetailsDialog = true;
      },
      deleteProduct(product) {
        this.selectedProduct = product;
        this.showDeleteDialog = true;
      },
      async confirmDelete() {
        if (this.selectedProduct) {
          try {
            // Send DELETE request to the JSON server
            await axios.delete(`http://localhost:3001/products/${this.selectedProduct.id}`);
  
            // Remove the product from the local products list
            this.products = this.products.filter(p => p.id !== this.selectedProduct.id);
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
  
        // Close the delete confirmation dialog
        this.showDeleteDialog = false;
      },
      sortProductsByName() {
        // Sort the products by name and assign the result to sortedProducts
        this.sortedProducts = [...this.products].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      },
    },
  };
  </script>
  