import whatsappServices from '#services/whatsappServices.js'
import stateService from '#handleBotState/index.js'

class PaymentInformation {
  async sendPaymentInformation(to, course) {
    try {
      const response = `¡Hola! Me alegra saber que te interesa el curso de *${course}*.

Para continuar con tu inscripción, sigue estos pasos:

1. Realiza el pago a la siguiente cuenta: 0-124250-00-0-0
2. Después de realizar el pago, por favor envía una captura del mismo al siguiente número de contacto. Allí recibirás la confirmación y podrás continuar con tu inscripción 👇`

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
