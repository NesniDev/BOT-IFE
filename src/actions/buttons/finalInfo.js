import whatsappServices from '#services/whatsappServices.js'

class FinalInfo {
  async sendFinalInfo(to) {
    const response = `Por último, elige una de las siguientes opciones:`
    const buttons = [
      {
        type: 'reply',
        reply: {
          id: 'go_location',
          title: 'Ver Ubicación'
        }
      },
      {
        type: 'reply',
        reply: {
          id: 'finish_chat',
          title: 'Finalizar chat'
        }
      }
    ]
    await whatsappServices.sendButtonMessage(to, buttons, response)
  }
}

export default new FinalInfo()
