import whatsappServices from '#services/whatsappServices.js'
import CourseVeterinaria from '#actions/courses/veterinaria/veterinaria.js'
import stateService from '#handleBotState/index.js'

class CourseMenuSelection {
  async sendCourseMenuSelectionInOffice(to, optionList, messageId) {
    let response

    switch (optionList) {
      case '1':
        // await CourseVeterinaria.sendImageVeterinaria(to)
        // await CourseVeterinaria.sendAudioIFE(to)
        await CourseVeterinaria.sendCourseVeterinaria(to)
        stateService.setState(to, {
          step: 'course_selected',
          course: 'veterinaria'
        })
        break
      case '2':
        response = 'ha elegido asistente administrativo'
        break
      case '3':
        response = 'ha elegido técnico en sistemas e informática'
        break
      case '4':
        response = 'ha elegido seguridad y salud en el trabajo'
        break
      case '5':
        response = 'ha elegido gestión documental y Archivo'
        break
      case '6':
        response = 'ha elegido auxiliar contable y financiero'
        break
      case '7':
        response = 'ha elegido auxiliar judicial y criminalistica'
        break
      case '8':
        response = 'ha elegido diseño grafico'
        break
      case '9':
        response = 'ha elegido atención a la primera infancia'
        break
      case '10':
        response = 'ha elegido auxiliar en preescolar'
        break
      case '11':
        response = 'ha elegido asistente social y comunitario'
        break
      case '12':
        response = 'ha elegido mercadeo y ventas'
        break
      case '13':
        response = 'ha elegido desarrollo web y multimedia'
        break
      default:
        await whatsappServices.sendMessage(
          to,
          'Salluda a nuestro bot de Whatsapp con un *"Hola"* para que te de información sobre nuestra institucion'
        )
    }

    // CourseVeterinaria.wait(60000)
    // await whatsappServices.sendMessage(to, response)
    await whatsappServices.markAsRead(messageId)
  }
}

export default new CourseMenuSelection()
