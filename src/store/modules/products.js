import db from "../firebaseInit";

const state = {
	products: []
};

const getters = {
	allProducts: state => state.products
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
			.then(docRef => commit("newProduct", product))
			.catch(error => console.log(error));
	}
};

const mutations = {
	setProducts: (state, products) => (state.products = products),
	newProduct: (state, product) => state.products.unshift(product),
	removeProduct: (state, id) =>
		(state.products = state.products.filter(product => product.id !== id)),
	updateTodo: (state, updatedProduct) => {
		const index = state.products.findIndex(
			product => product.id === updatedProduct.id
		);
		if (index !== -1) state.products.splice(index, 1, updatedProduct);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
