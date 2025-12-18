class OptionSelectedModality {
  async optionSelected(to, option) {
    const response = `${option} ha sido seleccionado`
    await whatsappService.sendMessage(to, response)
  }
}

export default new OptionSelectedModality()
