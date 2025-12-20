import whatsappServices from '#services/whatsappServices.js'
class TemplateCourse {
  async sendCourse(to, course) {
    await this.sendInformation(to, course)

    for (const key in course.images) {
      const imageUrl = course.images[key]
      const caption = course.captions[key]

      await whatsappServices.sendMediaMessage(to, 'image', imageUrl, caption)
    }
  }

  async sendRegister(to, course) {
    const textButton = `¿Quieres inscribirte al *${course.title}*?`
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

  async sendInformation(to, course) {
    const response = `A continuación, te brindaré toda la información relacionada con el *${course.title}*.

Una vez revises la información, si deseas iniciar tu proceso de inscripción, por favor envía un mensaje con el texto: *Quiero inscribirme*

Si no deseas inscribirte, por favor envía un mensaje con el texto: *Finalizar chat*
      `
    await whatsappServices.sendMessage(to, response)
  }
}

export default new TemplateCourse()
