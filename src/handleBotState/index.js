class StateService {
  constructor() {
    this.states = {}
  }

  setState(user, data) {
    this.states[user] = data
  }

  getState(user) {
    return this.states[user]
  }

  clearState(user) {
    delete this.states[user]
  }
}

export default new StateService()
