import sendToWhatsapp from './httpRequest/sendToWhatsapp.js'

class WhatsAppService {
  async sendMessage(to, body) {
    if (!body || typeof body !== 'string' || !body.trim()) {
      console.warn('sendMessage aborted: invalid text', body)
      return
    }
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body
      }
    }
    await sendToWhatsapp(data)
  }

  async sendMediaMessage(to, type, mediaUrl, caption, messageId) {
    const mediaObject = {}

    switch (type) {
      case 'audio':
        mediaObject.audio = {
          link: mediaUrl
        }
        break
      case 'image':
        mediaObject.image = {
          link: mediaUrl,
          caption: caption
        }
        break
      case 'video':
        mediaObject.video = {
          link: mediaUrl,
          caption: caption
        }
        break
      case 'sticker':
        mediaObject.sticker = {
          link: mediaUrl
        }
        break

      default:
        throw new Error('Invalid media type')
    }

    const data = {
      messaging_product: 'whatsapp',
      to,
      type: type,
      ...mediaObject
    }

    await sendToWhatsapp(data)
  }

  async sendButtonMessage(to, buttons, bodyText) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: bodyText },
        action: {
          buttons: buttons
        }
      }
    }
    await sendToWhatsapp(data)
  }

  async sendContacts(to, contact) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'contacts',
      contacts: [contact]
    }

    await sendToWhatsapp(data)
  }

  async markAsRead(messageId) {
    const data = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId
    }
    await sendToWhatsapp(data)
  }

  async sendReaction(to, messageId, emoji) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'reaction',
      reaction: {
        message_id: messageId,
        emoji: emoji
      }
    }
    await sendToWhatsapp(data)
  }
  async sendLocation(to) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'location',
      location: {
        latitude: '5.61690700',
        longitude: '-73.81652100',
        name: 'Ife Colombia - Chiquinquirá',
        address: 'Carrera 7 # 14B 25, Chiquinquirá, Boyacá'
      }
    }
    await sendToWhatsapp(data)
  }
  // async sendButtonLink(to) {
  //   const data = {
  //     messaging_product: 'whatsapp',
  //     recipient_type: 'individual',
  //     to,
  //     type: 'interactive',
  //     interactive: {
  //       type: 'cta_url',
  //       header: {
  //         type: 'image',
  //         image: {
  //           link: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg'
  //         }
  //       },

  //       body: {
  //         text: 'Hola soy yo'
  //       },
  //       action: {
  //         name: 'cta_url',
  //         parameters: {
  //           display_text: 'clic aqui',
  //           url: 'https://www.ifecolombia.edu.co/'
  //         }
  //       },

  //       footer: {
  //         text: 'Gracias por acceder al enlace'
  //       }
  //     }
  //   }
  //   await sendToWhatsapp(data)
  // }
}

export default new WhatsAppService()
