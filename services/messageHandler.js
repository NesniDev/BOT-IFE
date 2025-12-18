import messageWelcome from '#actions/text/messageWelcome.js'
import whatsappService from './whatsappServices.js'
import coursesList from '#actions/optionList/courses.js'
import ListCourses from '#actions/optionList/selectOptions/1. asistente-veterinaria.js'
import CourseAdministrativo from '#actions/courses/administrativo/index.js'
import CourseVeterinaria from '#actions/courses/veterinaria/1. veterinaria.js'
import Modality from '#actions/modality/index.js'
import inOffice from '#actions/modality/in-office/index.js'

class MessageHandler {
  constructor() {
    this.modality = {}
    this.userStates = {}
    this.dataStates = {}
    this.dataAdmin = {}
  }
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      console.log(JSON.stringify(message, null, 2))
      const incomingMessage = message.text.body.toLowerCase().trim()

      if (messageWelcome.isGreeting(incomingMessage)) {
        await messageWelcome.sendWelcomeMessage(message.from)
        await Modality.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
      } else if (this.modality[message.from]) {
        await inOffice.handleModalityFlow(message.from, incomingMessage)
      } else if (this.dataStates[message.from]) {
        await CourseVeterinaria.handleUserFlow(
          message.from,
          incomingMessage,
          null
        )
      } else if (this.dataAdmin[message.from]) {
        await CourseAdministrativo.handleAdminFlow(
          message.from,
          incomingMessage
        )
      } else {
        await inOffice.handleModalityFlow(message.from, incomingMessage)
      }

      await whatsappService.markAsRead(message.id)
    } else if (message?.type === 'interactive') {
      const option = message?.interactive?.button_reply?.title.toLowerCase()

      // Inicializar estado si no existe
      if (!this.dataAdmin[message.from]) {
        this.dataAdmin[message.from] = { step: 'awaiting_continue' }
      }

      // 🔴 AQUÍ ESTÁ LA CLAVE
      await CourseAdministrativo.handleAdminFlow(message.from, null, option)

      await whatsappService.markAsRead(message.id)
    }
  }
}

export default new MessageHandler()
