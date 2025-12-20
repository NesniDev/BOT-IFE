import whatsappServices from '#services/whatsappServices.js'
import stateService from '#handleBotState/index.js'

class PaymentInformation {
  async sendPaymentInformation(to) {
    try {
      const response = `Me agrada que te interese el curso de técnico en asistente de veterinaria. 
      
Si quieres contacto con un asesor, por favor envía un mensaje al siguiente enlace:  wa.link/cv1xp7`

      await whatsappServices.sendMessage(to, response)
      stateService.setState(to, {
        step: 'payment_info'
      })
    } catch (error) {
      console.error('Error handling payment information:', error)
    }
  }
}

export default new PaymentInformation()
