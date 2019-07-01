import db from "../firebaseInit";

const state = {
	products: []
};

const getters = {
	allProducts: state => state.products,
	getProductNames : state => state.products.map(a => a.name)
};

const actions = {
	async fetchProducts({ commit }) {
		let fetchedProducts = [];
		db.collection("products")
			.orderBy("name")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						name: doc.data().name,
						brand: doc.data().brand,
						category: doc.data().category,
						company: doc.data().company,
						description: doc.data().description
					};
					fetchedProducts.push(data);
				});
			});

		commit("setProducts", fetchedProducts);
	},
	async addProduct({ commit }, product) {
		db.collection("products")
			.add({
				name: product.name,
				brand: product.brand,
				category: product.category,
				company: product.company,
				description: product.description
			})
			.then(docRef => {
				let newProduct = Object.assign({ id: docRef.id }, product); ;
				commit("newProduct", newProduct);
			})
			.catch(error => console.log(error));
	},
	async updateProduct({ commit }, product) {
		db.collection("products")
			.doc(product.id)
			.update({
				name: product.name,
				brand: product.brand,
				company: product.company,
				category: product.category,
				description: product.description
			})
			.catch(error => console.log(error));
			commit("modifyProduct", product);

		
	},
	async deleteProduct({ commit }, id) {
		db.collection("products")
			.doc(id)
			.delete()
			.then(() => {
				commit("removeProduct", id);
			});
	}
};

const mutations = {
	setProducts: (state, products) => (state.products = products),
	newProduct: (state, product) => state.products.push(product),
	removeProduct: (state, id) =>
		(state.products = state.products.filter(product => product.id !== id)),
	modifyProduct: (state, updatedProduct) => {
		const index = state.products.findIndex(
			product => product.id === updatedProduct.id
		);
		state.products[index] =Object.assign({}, updatedProduct);
		state.products = state.products.filter(product => true)
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
