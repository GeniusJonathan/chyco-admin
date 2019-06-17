<template>
  <div>
    <h1>Products</h1>
    <p>This view display a list of products. In this view we can also do CRUD operations on products.</p>
    <hr>
    <ul>
      <li :key="product.id" v-for="product in products">
        {{product.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import db from '../firebase/firebaseInit'
export default {
  data () {
        return {
            products: []
        }
    },
    created() {
        db.collection('products').orderBy('name').get().then
        (querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'name' : doc.data().name,
                    'brand' : doc.data().brand,
                    'category' : doc.data().category,
                    'company' : doc.data().company,
                    'description' : doc.data().description,
                }
                this.products.push(data);
            })
        })
    }
};
</script>

<style>
</style>
