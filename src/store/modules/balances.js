import db from "../firebaseInit";
import router from "../../router"

const state = {
	balances: [],
	lastBalance: 0
};

const getters = {
	allBalances: state => state.balances,
	getLastBalance: state => state.lastBalance
};

const actions = {
	async fetchBalances({ commit }) {
		let fetchedBalances = [];
		db.collection("balances")
			.orderBy("date")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const data = {
						id: doc.id,
						date: doc.data().date,
						start_amount: doc.data().start_amount,
						incoming: doc.data().incoming,
						outgoing: doc.data().outgoing,
						end_amount: doc.data().end_amount
					};
					fetchedBalances.push(data);
				});
			});

		commit("setBalances", fetchedBalances);
	},
	async fetchLastBalance( { commit} ) {
		db.collection("balances")
			.orderBy("date", "desc")
			.limit(1)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					commit("setLastBalance", doc.data().end_amount)
				});
			});	
	},
	async addBalance({ commit }, balance) {
		db.collection("balances")
			.add({
				date: balance.date,
				start_amount: balance.start_amount,
				incoming: balance.incoming,
				outgoing: balance.outgoing,
				end_amount: balance.end_amount
			})
			.then(docRef => {
				let newBalance = Object.assign({ id: docRef.id }, balance);
				commit("newBalance", newBalance);
				router.push('Balance')
			})
			.catch(error => console.log(error));
	},
	async updateBalance({ commit }, balance) {
		db.collection("balances")
			.doc(balance.id)
			.update({
				date: balance.date,
				start_amount: balance.start_amount,
				incoming: balance.incoming,
				outgoing: balance.outgoing,
				end_amount: balance.end_amount
			})
			.catch(error => console.log(error));
		commit("modifyBalance", balance);
	},
	async deleteBalance({ commit }, id) {
		db.collection("balances")
			.doc(id)
			.delete()
			.then(() => {
				commit("removeBalance", id);
			});
	}
};

const mutations = {
	setBalances: (state, balances) => (state.balances = balances),
	newBalance: (state, balance) => state.balances.push(balance),
	setLastBalance: (state, lastBalance) => (state.lastBalance = lastBalance),
	removeBalance: (state, id) =>
		(state.balances = state.balances.filter(balance => balance.id !== id)),
	modifyBalance: (state, updatedBalance) => {
		const index = state.balances.findIndex(
			balance => balance.id === updatedBalance.id
		);
		state.balances[index] = Object.assign({}, updatedBalance);
		state.balances = state.balances.filter(balance => true);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
