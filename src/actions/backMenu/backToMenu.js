import whatsappService from '#services/whatsappServices.js'

class BackToMenu {
  async sendReturnToMainMenu(to) {
    try {
      const textButton =
        'Ups, no logré entenderte. Puedes volver al menú principal aquí 👇.'
      const buttons = [
        {
          type: 'reply',
          reply: {
            id: 'go_menu',
            title: 'Ir al inicio'
          }
        }
      ]
      console.log(JSON.stringify({ to, textButton, buttons }, null, 2))

      await whatsappService.sendButtonMessage(to, buttons, textButton)
    } catch (error) {
      console.error('Error sending return to main menu:', error)
    }
  }
}

export default new BackToMenu()
