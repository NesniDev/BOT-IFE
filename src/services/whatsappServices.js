import axios from 'axios'
import config from '#config/env.js'

class WhatsAppService {
  async sendMessage(to, body) {
    try {
      if (!body || typeof body !== 'string' || !body.trim()) {
        console.warn('sendMessage aborted: invalid text', body)
        return
      }
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          text: { body }
          // context: {
          //   message_id: messageId
          // }
        }
      })
    } catch (error) {
      console.error(
        'WhatsApp Message error:',
        error.response?.data || error.message
      )
    }
  }

  async sendMediaMessage(to, type, mediaUrl, caption) {
    try {
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
        default:
          throw new Error('Invalid media type')
      }
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: type,
          ...mediaObject
        }
      })
    } catch (error) {
      console.error(
        'WhatsApp media error:',
        error.response?.data || error.message
      )
    }
  }

  async sendButtonMessage(to, buttons, bodyText) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`
        },
        data: {
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
      })
    } catch (error) {
      console.error(
        'WhatsApp SendButton error:',
        error.response?.data || error.message
      )
    }
  }

  async markAsRead(messageId) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        }
      })
    } catch (error) {
      console.error(
        'WhatsApp markAsRead error:',
        error.response?.data || error.message
      )
    }
  }
}

export default new WhatsAppService()
