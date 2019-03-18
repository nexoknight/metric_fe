const metrics = [
  { key: 0, text: 'Требования без интеграции команд A и S', link: '/teamAS' },
  { key: 1, text: 'Требования без интеграции команд B и C', link: '/teamBC' },
  { key: 2, text: 'Требования с интеграцией кроме Биллинга ВСЕ Команды (без Беркута)', link: '/allIntegrationWithoutBilling' },
  { key: 3, text: 'Требования с интеграцией только Биллинг ВСЕ Команды', link: '/allIntegrationOnlyBilling' },
  { key: 4, text: 'Поток поставки бизнес требований', link: '/allTeam' },
  { key: 5, text: 'Ошибки Prod команд A и S', link: '/errorsProdTeamAS' },
  { key: 6, text: 'Ошибки Prod команд B и C', link: '/errorsProdTeamBC' },
  { key: 7, text: 'Bercut - требования без тега Other', link: '/bercutWithoutOther' },
  { key: 8, text: 'Bercut - ошибки без Other', link: '/errorBercutWithoutOther' },
  { key: 9, text: 'Bercut - ошибки с Other', link: '/errorBercutWithOther' },
  { key: 10, text: 'Требования без разработки', link: '/allWorkItemsWithoutDevelop' }
]

export default metrics
