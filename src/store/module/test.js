export default {
  state: {
    obj: {
      name: '',
      age: ''
    },
    value: ''
  },
  getters: {
    value: state => state.value,
    obj: state => state.obj
  },
  mutations: {
    setValue(state, value) {
      state.value = value
    },
    setObj(state, obj) {
      state.obj = obj
    }
  },
  actions: {
    handleChange({ commit }, e) {
      let value = e.target.value
      return new Promise(resolve => {
        commit('setValue', value)
        resolve()
      })
    },
    handleSet({ commit }, obj) {
      return new Promise(resolve => {
        commit('setObj', obj)
        resolve()
      })
    }
  }
}
