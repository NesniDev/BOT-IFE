import whatsappServices from '#services/whatsappServices.js'
class TemplateCourse {
  async sendCourse(to, course) {
    await this.sendInformation(to, course)
    await this.sendImageInscription(to, course)
    for (const key in course.images) {
      const imageUrl = course.images[key]
      const caption = course.captions[key]

      await whatsappServices.sendMediaMessage(to, 'image', imageUrl, caption)
    }
    await this.sendAudio(to, course)
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

  async sendImageInscription(to, course) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=1FSyI_bTwd1xElCFuI0bqdjGNW1EuTdGt'
    const caption = `Formulario de inscripción del ${course.title.toLowerCase()}`

    await whatsappServices.sendMediaMessage(to, 'image', imageUrl, caption)
  }

  async sendAudio(to, course) {
    const audioUrl = course.audio

    await whatsappServices.sendMediaMessage(to, 'audio', audioUrl)
  }
  async sendStickerLogo(to, course) {
    const audioUrl =
      'https://drive.google.com/uc?export=download&id=1CNWeMRUpncuIzIjeI1Q4SD4KtqJCib2x'

    await whatsappServices.sendMediaMessage(to, 'sticker', audioUrl)
  }

  async sendInformation(to, course) {
    const response = `A continuación, te brindaré toda la información relacionada con el *${course.title}*.

Una vez revises la información, si deseas iniciar tu proceso de inscripción, por favor envía un mensaje con el texto: 

- *Quiero inscribirme*

Si no deseas inscribirte, por favor envía un mensaje con el texto: 

- *Finalizar chat*
      `
    await whatsappServices.sendMessage(to, response)
  }
}

export default new TemplateCourse()
