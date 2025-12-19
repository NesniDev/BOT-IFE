import stateService from '#handleBotState/index.js'

import whatsappService from './whatsappServices.js'
import messageWelcome from '#actions/text/messageWelcome.js'
import OptionSelectedModality from '#actions/modality/index.js'
import courseMenuSelection from '#actions/courses/courseMenuSelection.js'

class MessageHandler {
  constructor() {}
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      const state = stateService.getState(message.from)
      const incomingMessage = message.text.body.toLowerCase().trim()

      if (state?.step === 'menu_modality') {
        await OptionSelectedModality.optionSelected(
          message.from,
          message.text.body.toLowerCase().trim() //incomingMessage
        )
        return
      }
      if (state?.step === 'menu_programs_in_office') {
        await courseMenuSelection.sendCourseMenuSelectionInOffice(
          message.from,
          message.text.body.toLowerCase().trim() //incomingMessage
        )
        return
      }
      if (state?.step === 'course_selected') {
        await whatsappService.sendMessage(
          message.from,
          'Ya has elegido un curso de la lista'
        )
      }

      if (messageWelcome.isGreeting(incomingMessage)) {
        await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
      }
      // else {
      //   await whatsappService.sendMessage(
      //     message.from,
      //     'Ups, no logré entenderte, Seleccione la siguiente opción para darte información sobre nuestra institucion '
      //   )
      // }

      await whatsappService.markAsRead(message.id)
    }
  }
}

export default new MessageHandler()
