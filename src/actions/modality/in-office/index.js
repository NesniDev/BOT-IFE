import whatsappService from '#services/whatsappServices.js'
import CoursesList from '#actions/optionList/courses.js'

class InOffice {
  async handleModalityFlow(to, message) {
    let response

    switch (message) {
      case '1':
        response = await CoursesList.sendCoursesList(to)
        break
      case '2':
        response = 'Seleccionó la modalidad de Virtual '
        break
    }
    await whatsappService.sendMessage(to, response)
    await whatsappService.markAsRead(to)
  }
}

export default new InOffice()
