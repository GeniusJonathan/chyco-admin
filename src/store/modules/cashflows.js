import db from "../firebaseInit";

const state = {
	cashflows: []
};

const getters = {
	allCashflows: state => state.cashflows
};

const actions = {
	async fetchCashflows({ commit }) {
		let fetchedCashflows = [];
		db.collection("cashflows")
			.orderBy("date")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						date: doc.data().date,
						source: doc.data().source,
						description: doc.data().description,
						amount: doc.data().amount,
						type: doc.data().type
					};
					fetchedCashflows.push(data);
				});
			});

		commit("setCashflows", fetchedCashflows);
	},
	async addCashflow({ commit }, cashflow) {
		db.collection("cashflows")
			.add({
				date: cashflow.date,
				source: cashflow.source,
				description: cashflow.description,
				amount: cashflow.amount,
				type: cashflow.type
			})
			.then(docRef => {
				let newCashflow = Object.assign({ id: docRef.id }, cashflow); ;
				commit("newCashflow", newCashflow);
			})
			.catch(error => console.log(error));
	},
	async updateCashflow({ commit }, cashflow) {
		db.collection("cashflows")
			.doc(cashflow.id)
			.update({
				date: cashflow.date,
				source: cashflow.source,
				description: cashflow.description,
				amount: cashflow.amount,
				type: cashflow.type
			})
			.catch(error => console.log(error));
			commit("modifyCashflow", cashflow);

		
	},
	async deleteCashflow({ commit }, id) {
		db.collection("cashflows")
			.doc(id)
			.delete()
			.then(() => {
				commit("removeCashflow", id);
			});
	}
};

const mutations = {
	setCashflows: (state, cashflows) => (state.cashflows = cashflows),
	newCashflow: (state, cashflow) => state.cashflows.push(cashflow),
	removeCashflow: (state, id) =>
		(state.cashflows = state.cashflows.filter(cashflow => cashflow.id !== id)),
	modifyCashflow: (state, updatedCashflow) => {
		const index = state.cashflows.findIndex(
			cashflow => cashflow.id === updatedCashflow.id
		);
		state.cashflows[index] =Object.assign({}, updatedCashflow);
		state.cashflows = state.cashflows.filter(cashflow => true)
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
