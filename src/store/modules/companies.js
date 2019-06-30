import db from "../firebaseInit";

const state = {
	companies: []
};

const getters = {
	allCompanies: state => state.companies,
	getCompanyNames : state => state.companies.map(a => a.name)
};

const actions = {
	async fetchCompanies({ commit }) {
		let fetchedCompanies = [];
		db.collection("companies")
			.orderBy("name")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						name: doc.data().name,
						address: doc.data().address,
						phone: doc.data().phone,
						contactPerson: doc.data().contactPerson,
						contactNumber: doc.data().contactNumber
					};
					fetchedCompanies.push(data);
				});
			});

		commit("setCompanies", fetchedCompanies);
	},
	async addCompany({ commit }, company) {
		db.collection("companies")
			.add({
				name: company.name,
				address: company.address,
				phone: company.phone,
				contactPerson: company.contactPerson,
				contactNumber: company.contactNumber
			})
			.then(docRef => {
				let newCompany = Object.assign({ id: docRef.id }, company);
				commit("newCompany", newCompany);
			})
			.catch(error => console.log(error));
	},
	async updateCompany({ commit }, company) {
		db.collection("companies")
			.doc(company.id)
			.update({
				name: company.name,
				address: company.address,
				phone: company.phone,
				contactPerson: company.contactPerson,
				contactNumber: company.contactNumber
			})
			.catch(error => console.log(error));
		commit("modifyCompany", company);
	},
	async deleteCompany({ commit }, id) {
		db.collection("companies")
			.doc(id)
			.delete()
			.then(() => {
				commit("removeCompany", id);
			});
	}
};

const mutations = {
	setCompanies: (state, companies) => (state.companies = companies),
	newCompany: (state, company) => state.companies.push(company),
	removeCompany: (state, id) =>
		(state.companies = state.companies.filter(company => company.id !== id)),
	modifyCompany: (state, updatedCompany) => {
		const index = state.companies.findIndex(
			company => company.id === updatedCompany.id
		);
		state.companies[index] = Object.assign({}, updatedCompany);
		state.companies = state.companies.filter(company => true);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
