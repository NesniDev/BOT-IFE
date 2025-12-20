import whatsappServices from '#services/whatsappServices.js'
import TemplateCourse from '#actions/courses/inOffice/template.js'
import stateService from '#handleBotState/index.js'
import coursesList from '#utils/inOffice.js'

class CourseMenuSelection {
  async sendCourseMenuSelectionInOffice(to, optionList, messageId) {
    const selectedCourse = coursesList[optionList]

    if (!selectedCourse) {
      await whatsappServices.sendMessage(
        to,
        'Opción no válida. Selecciona un número del menú.'
      )
      return
    }

    await TemplateCourse.sendCourse(to, selectedCourse)
    stateService.setState(to, {
      step: 'waiting_quiero_inscribirme',
      course: selectedCourse.title
    })
  }
}
export default new CourseMenuSelection()
