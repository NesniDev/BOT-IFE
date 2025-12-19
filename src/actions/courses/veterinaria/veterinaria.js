import whatsappServices from '#services/whatsappServices.js'

class CourseVeterinaria {
  async sendCourseVeterinaria(to) {
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
}

export default new CourseVeterinaria()
