import stateService from '#handleBotState/index.js'

import whatsappService from './whatsappServices.js'
import messageWelcome from '#actions/text/messageWelcome.js'
import OptionSelectedModality from '#actions/modality/index.js'
import courseMenuSelection from '#actions/courses/courseMenuSelection.js'
import BackToMenu from '#actions/backMenu/backToMenu.js'

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
          'Ya has elegido un curso de la lista.'
        )
        await whatsappService.markAsRead(message.id)

        stateService.clearState(message.from)
        return
      }

      if (messageWelcome.isGreeting(incomingMessage)) {
        await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
        return
      }

      await BackToMenu.sendReturnToMainMenu(message.from)

      // await whatsappService.markAsRead(message.id)
      return
    } else if (message?.type === 'interactive') {
      const buttonId = message.interactive.button_reply?.id

      if (buttonId === 'go_menu') {
        stateService.clearState(message.from)
        await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
        return
      }
    }
  }
}
export default new MessageHandler()
