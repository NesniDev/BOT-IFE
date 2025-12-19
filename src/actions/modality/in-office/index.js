import whatsappServices from '#services/whatsappServices.js'
import stateService from '#handleBotState/index.js'
class CoursesListInOffice {
  async sendCoursesListInOffice(to) {
    const response = [
      '*Estos son nuestros programas técnicos en modalidad presencial.*',
      'Por favor, escribe el número del programa de tu interés para recibir más información:',
      '',
      '1. Técnico en asistente de veterinaria',
      '2. Técnico en asistente administrativo',
      '3. Técnico en sistemas e informática',
      '4. Técnico en seguridad y salud en el trabajo',
      '5. Técnico en gestión documental y archivo',
      '6. Técnico en auxiliar contable y financiero',
      '7. Técnico en auxiliar judicial y criminalística',
      '8. Técnico en diseño gráfico',
      '9. Técnico en atención a la primera infancia',
      '10. Técnico en auxiliar en preescolar',
      '11. Técnico en asistente social y comunitario',
      '12. Técnico en mercadeo y ventas',
      '13. Técnico en desarrollo web y multimedia'
    ].join('\n')

    await whatsappServices.sendMessage(to, response)
    stateService.setState(to, {
      step: 'menu_programs_in_office'
    })
  }
}

export default new CoursesListInOffice()
