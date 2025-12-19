import whatsappService from '#services/whatsappServices.js'
import CoursesListInOffice from './in-office/index.js'
import CoursesListRemote from './remote/index.js'
import stateService from '#handleBotState/index.js'
class OptionSelectedModality {
  async optionSelected(to, option, messageId) {
    try {
      let response

      switch (option) {
        case '1':
          await CoursesListInOffice.sendCoursesListInOffice(to)
          break
        case '2':
          await CoursesListRemote.sendCoursesListRemote(to)
          break
        default:
          await whatsappService.sendMessage(
            to,
            'Saluda a nuestro bot de whatsapp, no has elegido ninguna opción'
          )
          stateService.clearState(to)
          break
      }
      // await whatsappService.sendMessage(to, response)
      await whatsappService.markAsRead(messageId)
    } catch (error) {
      console.error('Error handling option selected modality:', error)
    }
  }
}

export default new OptionSelectedModality()
