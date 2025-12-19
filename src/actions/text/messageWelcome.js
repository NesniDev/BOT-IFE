import whatsappServices from '#services/whatsappServices.js'
import stateService from '#handleBotState/index.js'

class MessageWelcome {
  isGreeting(message) {
    const greetings = [
      'hola',
      'hello',
      'hi',
      'hola buenas',
      'hola buen dia',
      'hola buenas tardes',
      'hola buenos dias',
      'buenas tardes',
      'buenas',
      'buen dia',
      'buenos dias',
      'buenas noches',
      'buen día',
      'holi',
      'ola',
      'oli'
    ]
    return greetings.includes(message)
  }

  async sendWelcomeMessage(to) {
    const response = `Hola, soy Ana Lucía, tu asistente virtual del Instituto IFE Colombia.\n\nEstoy aquí para brindarte información sobre nuestros programas técnicos, modalidades de estudio y proceso de matrícula.`
    await whatsappServices.sendMessage(to, response)
  }

  async sendMenuModality(to) {
    const response = `¿En qué modalidad deseas estudiar?\n1. Modalidad Presencial\n2. Modalidad Virtual`

    await whatsappServices.sendMessage(to, response)

    stateService.setState(to, {
      step: 'menu_modality'
    })
  }
}

export default new MessageWelcome()
