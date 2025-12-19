import whatsappServices from '#services/whatsappServices.js'

class CourseVeterinaria {
  async sendCourseVeterinaria(to) {
    await this.sendImageDocInscripcionVeterinaria(to)
  }

  async sendImageDocInscripcionVeterinaria(to) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=1hn_QDGI44C3SakNvMhY6iMLAiXqIi9z2 '
    const caption = 'Documento de Inscripción Veterinaria'
    const type = 'image'
    await whatsappServices.sendMediaMessage(to, type, imageUrl, caption)
  }
}

export default new CourseVeterinaria()
