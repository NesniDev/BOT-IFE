import stateService from '#handleBotState/index.js'

import whatsappService from './whatsappServices.js'
import messageWelcome from '#actions/text/messageWelcome.js'
import OptionSelectedModality from '#actions/modality/index.js'
import courseMenuSelection from '#actions/courses/courseMenuSelection.js'
import courseMenuSelectionRemote from '#actions/courses/courseMenuSelectionRemote.js'
import BackToMenu from '#actions/backMenu/backToMenu.js'
import PaymentInformation from '#actions/payment/index.js'
import Contacts from '#actions/contacts/index.js'
import FinalInfo from '#actions/buttons/finalInfo.js'
import TemplateCourse from '#actions/courses/inOffice/template.js'

class MessageHandler {
  constructor() {}
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      const state = stateService.getState(message.from)
      const incomingMessage = message?.text?.body?.toLowerCase().trim() || ''

      if (state?.step === 'menu_modality') {
        await OptionSelectedModality.optionSelected(
          message.from,
          message.text.body.toLowerCase().trim(), //incomingMessage
          message.id
        )
        await whatsappService.markAsRead(message.id)
        return
      }
      if (state?.step === 'menu_programs_in_office') {
        await courseMenuSelection.sendCourseMenuSelectionInOffice(
          message.from,
          message.text.body.toLowerCase().trim(), //incomingMessage
          message.id
        )
        return
      }

      if (state?.step === 'menu_programs_remote') {
        await courseMenuSelectionRemote.sendCourseMenuSelectionRemote(
          message.from,
          message.text.body.toLowerCase().trim(), //incomingMessage
          message.id
        )
        return
      }

      if (state?.step === 'waiting_quiero_inscribirme') {
        if (incomingMessage === 'quiero inscribirme') {
          await PaymentInformation.sendPaymentInformation(
            message.from,
            state.course
          )
          await Contacts.sendContacts(message.from)
          await FinalInfo.sendFinalInfo(message.from)

          stateService.setState(message.from, {
            step: 'payment_info_sent',
            course: state.course
          })

          await whatsappService.markAsRead(message.id)
          return
        }

        if (incomingMessage === 'finalizar chat') {
          await whatsappService.sendMessage(
            message.from,
            '¡Gracias por usar nuestro bot de WhatsApp! 🤩 ¡Te esperamos pronto!'
          )

          stateService.clearState(message.from)
          await whatsappService.markAsRead(message.id)
          return
        }

        // Mensaje incorrecto
        await whatsappService.sendMessage(
          message.from,
          'Para continuar, escribe exactamente:\n\n*Quiero inscribirme*\nó\n*Finalizar chat*'
        )

        await whatsappService.markAsRead(message.id)
        return
      }

      if (messageWelcome.isGreeting(incomingMessage)) {
        await whatsappService.sendReaction(message.from, message.id, '🤖')
        await TemplateCourse.sendStickerLogo(message.from)
        await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
        return
      }

      if (
        state?.step === 'payment_info_sent' &&
        !messageWelcome.isGreeting(message)
      ) {
        await whatsappService.sendMessage(
          message.from,
          'Recibimos tu interés. En breve nos pondremos en contacto para completar la inscripción.'
        )
        await whatsappService.markAsRead(message.id)
        stateService.clearState(message.from)
        return
      } else {
        await BackToMenu.sendReturnToMainMenu(message.from)
      }
      // await whatsappService.markAsRead(message.id)
      return
    } else if (message?.type === 'interactive') {
      const buttonId = message.interactive.button_reply?.id

      if (buttonId === 'go_menu') {
        stateService.clearState(message.from)
        // await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
        return
      }
      if (buttonId === 'go_location') {
        await Contacts.sendContacts(message.from)
        stateService.clearState(message.from)

        await whatsappService.markAsRead(message.id)
        return
      }
      if (buttonId === 'finish_chat') {
        await whatsappService.sendMessage(
          message.from,
          '¡Gracias por usar nuestro bot de WhatsApp! 🤩 ¡Haz finalizado el chat, vuelve pronto!'
        )
        await whatsappService.markAsRead(message.id)
        stateService.clearState(message.from)
        return
      }
    }
  }
}
export default new MessageHandler()
