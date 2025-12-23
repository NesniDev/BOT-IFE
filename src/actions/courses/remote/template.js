import whatsappServices from '#services/whatsappServices.js'
class TemplateCourse {
  async sendCourse(to, course) {
    await this.sendInformation(to, course)
    await this.sendInformationRemote(to, course)
    await this.sendImageInscription(to, course)
    await this.sendImageCosts(to, course)
    await this.sendAudio(to, course)
  }

  async sendImageInscription(to, course) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=1S0gN7JKDqF1Rz3f7V7ablyD62CmrHJ4n'
    const caption = `Formulario de inscripción del ${course.title.toLowerCase()} en modalidad virtual`

    await whatsappServices.sendMediaMessage(to, 'image', imageUrl, caption)
  }

  async sendImageCosts(to, course) {
    const imageUrl =
      'https://drive.google.com/uc?export=download&id=15SGpaCVqyMHXsolFTBzNDdQiQTXJDB97'

    const caption = `Costos para la inscripción del ${course.title.toLowerCase()} en modalidad virtual`

    await whatsappServices.sendMediaMessage(to, 'image', imageUrl, caption)
  }

  async sendAudio(to, course) {
    const audioUrl = course.audio

    await whatsappServices.sendMediaMessage(to, 'audio', audioUrl)
  }

  async sendInformation(to, course) {
    const response = `A continuación, te brindaré toda la información relacionada con el *${course.title}* en modalidad virtual.

Una vez revises la información, si deseas iniciar tu proceso de inscripción, por favor envía un mensaje con el texto: 

- *Quiero inscribirme*

Si no deseas inscribirte, por favor envía un mensaje con el texto: 

- *Finalizar chat*
      `
    await whatsappServices.sendMessage(to, response)
  }

  async sendInformationRemote(to, course) {
    const response = `TÉCNICO MODALIDAD VIRTUAL con Apoyo de Plataforma Tecnológica y Tutorías Online los días lunes de 6:30 p.m. A 8:00 p.m. 

Contamos con Plataforma propia en Moodle (a cada estudiante se le entrega video tutorial del manejo de la plataforma, un usuario y contraseña para el ingreso a la misma) y tutorías para que tengan encuentros sincrónicos con los docentes con el fin de despejar dudas e inquietudes, se tendrían clases por medio de GOOGLE MEET (medio por el cual pueden interactuar, ya sea por computador o por celular ya que la aplicación se puede descargar desde cualquier dispositivo). 
    
Al manejar la plataforma nos permite que los estudiantes puedan presentar trabajos y evaluaciones en tiempo real y en fechas determinadas. La plataforma estará activa las 24 horas de los 7 días de la semana, las sesiones de clase quedan grabadas.

Este modelo de Educación Virtual permite flexibilidad en el tiempo de estudio, lo importante es cumplir con las actividades propuestas en plataforma para emitir concepto evaluativo y de ahí generar las notas de cada módulo de aprendizaje.

Siendo estudiante de IFE Colombia puede cualificar la hoja de vida adicionalmente ya que se te obsequian 2 seminarios certificados por 12 horas y 2 cursos virtuales certificados por 80 horas totalmente gratis, en convenio con el Politécnico Central Andino (no son obligatorios de realizar), los cuales se pueden realizar en el transcurso del programa técnico. Adicionalmente se les certificará 6 meses de experiencia laboral y la realización de la hoja de vida sin ningún costo.

    `
    await whatsappServices.sendMessage(to, response)
  }
}

export default new TemplateCourse()
