import whatsappService from './whatsappServices.js'
import messageWelcome from '#actions/text/messageWelcome.js'
import OptionSelectedModality from '#actions/modality/index.js'

class MessageHandler {
  constructor() {}
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      console.log(JSON.stringify(message, null, 2))
      const incomingMessage = message.text.body.toLowerCase().trim()

      if (messageWelcome.isGreeting(incomingMessage)) {
        await messageWelcome.sendWelcomeMessage(message.from)
        await messageWelcome.sendMenuModality(message.from)
        await whatsappService.markAsRead(message.id)
      } else {
        await OptionSelectedModality.optionSelected(
          message.from,
          incomingMessage
        )
        await whatsappService.markAsRead(message.id)
      }

      await whatsappService.markAsRead(message.id)
    }
  }
}

export default new MessageHandler()
