import whatsappServices from '#services/whatsappServices.js'

class Contacts {
  async sendContacts(to) {
    const contacts = {
      addresses: [
        {
          street: 'Cra. 7 # 14B-25',
          city: 'Chiquinquirá',
          state: 'Boyacá',
          zip: '',
          country: 'Colombia',
          country_code: '+57',
          type: 'WORK'
        }
      ],
      emails: [
        {
          email: 'ifecolombia@gmail.com',
          type: 'WORK'
        }
      ],
      name: {
        formatted_name: 'Ife Colombia',
        first_name: 'Ife Colombia',
        last_name: '',
        middle_name: '',
        suffix: '',
        prefix: ''
      },
      org: {
        company: 'Instituto de Formación Empresarial de Colombia',
        department: 'Atención al cliente',
        title: 'Directora General'
      },
      phones: [
        {
          phone: '+573107427730',
          wa_id: '573107427730',
          type: 'WORK'
        }
      ],
      urls: [
        {
          url: 'https://www.ifecolombia.edu.co',
          type: 'WORK'
        }
      ]
    }
    await whatsappServices.sendContacts(to, contacts)
  }
}

export default new Contacts()
