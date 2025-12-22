import whatsappServices from '#services/whatsappServices.js'
import stateService from '#handleBotState/index.js'

class CoursesListRemote {
  async sendCoursesListRemote(to) {
    const response = `
        *Estos son nuestros programas técnicos en modalidad virtual.*\nPor favor, escribe el número del programa de tu interés para recibir más información:\n
        1. Técnico en asistente administrativo
        2. Técnico en seguridad y salud en el trabajo
        3. Técnico en gestión documental y archivo
        4. Técnico en auxiliar contable y financiero
        5. Técnico en auxiliar judicial y criminalística
        6. Técnico en atención a la primera infancia
        7. Técnico en mercadeo y ventas
        `
    await whatsappServices.sendMessage(to, response)
    stateService.setState(to, {
      step: 'menu_programs_remote'
    })
  }
}

export default new CoursesListRemote()
