export const environment = {
  URL_API: 'http://api.deepmedia.dev.com/api/',
  URL_ASSETS: 'http://assets.deepmedia.dev.com/',
  URL_STORAGE: 'http://storage.deepmedia.dev.com',
  URL_BOT: 'http://api.deepmedia.dev.com/api/bot/',
  production: true,
  allVideos: false,
  expandedSidebar: false,
  commands: [
    {
      name: 'Reportar Bug',
      value: '/bug #',
      can: 'Everyone',
      kind: 'inline'
    },
    {
      name: 'Recomendación',
      value: '/sugg ',
      can: 'Everyone',
      kind: 'inline'
    },
    {
      name: 'Último Bug',
      value: '/bug_last',
      can: 'Admin',
      kind: 'auto'
    },
    {
      name: 'Última Recomendación',
      value: '/sugg_last',
      can: 'Admin',
      kind: 'auto'
    }
  ]
};
