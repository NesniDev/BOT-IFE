import whatsappServices from '#services/whatsappServices.js'
import stateServices from '#handleBotState/index.js'
class CourseVeterinaria {
  async sendCourseVeterinaria(to) {
    await this.sendInformation(to)
    await this.sendImageDocInscripcionVeterinaria(to)
    await this.sendImageCostsVeterinaria(to)
    await this.sendImageSchedulesVeterinaria(to)
  }

  async sendImageDocInscripcionVeterinaria(to) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=1FSyI_bTwd1xElCFuI0bqdjGNW1EuTdGt'

    const caption = 'Documento de Inscripción Veterinaria'
    const type = 'image'
    await whatsappServices.sendMediaMessage(to, type, imageUrl, caption)
  }

  async sendImageCostsVeterinaria(to) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=10f6hU_iRP4r3FANEFX8xagcLID1_-t5w'

    const caption = 'Costos del tecnico de veterinaria'
    const type = 'image'
    await whatsappServices.sendMediaMessage(to, type, imageUrl, caption)
  }

  async sendImageSchedulesVeterinaria(to) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=14PPE7DxxsSTTJOch1XvOX4lLr-Aaj8F4'
    const caption = 'Horarios del tecnico de veterinaria'
    const type = 'image'
    await whatsappServices.sendMediaMessage(to, type, imageUrl, caption)
  }

  async sendRegister(to) {
    const textButton = '¿Quieres inscribirte al técnico de veterinaria?'
    const buttons = [
      {
        type: 'reply',
        reply: {
          id: 'go_register',
          title: 'Quiero Inscribirme'
        }
      }
    ]

    await whatsappServices.sendButtonMessage(to, buttons, textButton)
  }

  async sendInformation(to) {
    const response = `A continuación, te brindaré toda la información relacionada con el Técnico en Asistente de Veterinaria.

Una vez revises la información, si deseas iniciar tu proceso de inscripción, por favor envía un mensaje con el texto: *Quiero inscribirme*

Si no deseas inscribirte, por favor envía un mensaje con el texto: *Finalizar chat*
      `
    await whatsappServices.sendMessage(to, response)
  }
}

export default new CourseVeterinaria()
