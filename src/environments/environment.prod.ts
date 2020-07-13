export const environment = {
  URL_API: 'https://api.deepmedia.dev.com/api/',
  URL_ASSETS: 'https://assets.deepmedia.dev.com/',
  URL_STORAGE: 'https://storage.deepmedia.dev.com',
  URL_BOT: 'https://api.deepmedia.dev.com/api/bot/',
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
      value: '/sugg #',
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
    },
    {
      name: 'Preguntas Frecuentes',
      value: '/faq',
      can: 'Everyone',
      kind: 'help'
    }
  ],
  faq: {
    video: {
      command: '/faq_video',
      topics: [
        {
          question: '¿Qué tipo de videos puedo subir?',
          answer: 'En la pagina se aceptan videos que se acomoden a las categorías predefinidas, siempre que no caigan' +
              'en temas de política, racismo, homofobia o bulling de ningún tipo.',
          command: '/faq_video #1'
        },
        {
          question: '¿Cuáles con las restricciones para los videos?',
          answer: 'Los videos tendrán un tamaño máximo de 300Mb, solo se admite formato mp4 por temas de compatibilidad' +
              'entre navegadores, cada video debe tener su poster, es una imagen de hasta 10 Mb, se aceptan los formatos ' +
              'más comunes.',
          command: '/faq_video #2'
        },
        {
          question: '¿Qué información puedo obtener de un video?',
          answer: 'Del video el usuario puede conocer quien lo publicó, en que fecha lo hizo, la descripción del' +
              'propio video, además de estadísticas como cantidad de likes, comentarios, descargas y visualizaciones.',
          command: '/faq_video #3'
        },
        {
          question: '¿Qué puedo hacer con un video?',
          answer: 'El usuario puede realizar descargas del video y reproducirlo, sin estar autenticado en la página. Una vez' +
              'autenticado puede dar like o quitarlo, comentar el video o decidir hacerlo favorito.',
          command: '/faq_video #4'
        },
        {
          question: '¿Qué son los videos privados?',
          answer: 'Los videos privados son serán posibles de visualizar desde el canal propietario del video.',
          command: '/faq_video #5'
        }
      ]
    },
    usuario: {
      command: '/faq_user',
      topics: [
        {
          question: '¿Qué pasa si olvido mi contraseña?',
          answer: 'Cuando un usuario se registra, se le asigna una lista secreta. Esta se usara para el sistema de' +
              'recuperación de contraseña. La nueva contraseña asignada sera válida solo por una hora, por lo que deberá' +
              'cambiarla lo antes posible.',
          command: '/faq_user #1'
        },
        {
          question: '¿Puedo cambiar mi contraseña?',
          answer: 'La contraseña si es posible cambiarla, solo debe acceder a su perfil, en la zona superior izquierda' +
              'tendrás la opción de editar el perfil. Y ahá estará la opción de cambiar la contraseña.',
          command: '/faq_user #2'
        },
        {
          question: '¿Puedo eliminar mi cuenta?',
          answer: 'Para eliminar la cuenta, debe contactar con un administrador. La opcion disponible es hacer un reporte' +
              'de bug con asunto [#sec] solicitando que se te elimine la cuenta.',
          command: '/faq_user #3'
        },
        {
          question: '¿Qué información esta disponible de mi perfil?',
          answer: 'En el perfil de cada usuario esta disponible el top de videos del canal, según los apartados de likes, ' +
              'vistas y descargas. También están disponibles los promedios de estos apartados junto con los puntos máximos y ' +
              'mínimos de los mismos. Además de poder ver el total que acumula el canal en cada uno. Y por último estarán ' +
              'todos los videos del canal.',
          command: '/faq_user #4'
        }
      ]
    },
    seguridad: {
      command: '/faq_sec',
      topics: [
        {
          question: '¿Cuanto dura la sesión activa?',
          answer: 'La sesión tiene un máximo de duración de 14 días, sin que el usuario tenga que volver a autenticarse.',
          command: '/faq_sec #1'
        },
        {
          question: '¿Qué podría causar que sea baneado?',
          answer: 'Para que un usuario termine baneado debe haber incumplido, con las políticas de la página, expuestas' +
              'en el [/faq_video #1] y haber sido reportado con frecuencia por usuarios.',
          command: '/faq_sec #2'
        },
        {
          question: '¿Qué pasa si soy Baneado?',
          answer: 'En caso de ser baneado, el ban será registrado en el servidor. En el navegador se almacenará una ' +
              'información necesaria para después de cumplido el tiempo de ban, pueda recuperar el acceso a la página. ' +
              'De eliminar esta información, el servidor lo expulsará x tiempo indefinido.',
          command: '/faq_sec #3'
        }
      ]
    },
    bot: {
      command: '/faq_bot',
      topics: [
        {
          question: '¿Para que sirve el Bot?',
          answer: 'El objetivo de este bot es de ayudar al usuario a realizar acciones que de otra forma podrían llegar ' +
              'a ser más complicadas.',
          command: '/faq_bot #1'
        },
        {
          question: '¿Que puedo hacer con el Bot?',
          answer: 'Con este bot puede realizar reportes de errores que usted encuentre en la aplicación, lo que ayuda a ' +
              'mejorar las calidad del sistema. También puede realizar sugerencias al equipo de desarrollo, las cuales ' +
              'de tendrán en cuanta. Paulatinamente se agregaran mas opciones.',
          command: '/faq_bot #2'
        },
        {
          question: '¿Qué NO debo hacer con el Bot?',
          answer: 'El bot es una herramienta de apoyo tanto para el usuario como para el equipo de desarrollo, por lo que' +
              'todo lo que usted reporte, sea un bug o sugerencia será revisada. Por lo que no se debe hacer un uso ' +
              'inadecuado del bot. Si un usuario incurre en esto puede ser baneado.',
          command: '/faq_bot #3'
        }
      ]
    }
  },
  sysNotificationIcons: {
    icons_attention: {
      url: 'https://assets.deepmedia.dev.com/img/notifications/icons_attention.png'
    },
    icons_high_priority: {
      url: 'https://assets.deepmedia.dev.com/img/notifications/icons_high_priority.png'
    },
    icons_info: {
      url: 'https://assets.deepmedia.dev.com/img/notifications/icons_info.png'
    },
    icons_ok: {
      url: 'https://assets.deepmedia.dev.com/img/notifications/icons_ok.png'
    },
    deepmedia_picture: {
      url: 'https://assets.deepmedia.dev.com/img/notifications/deepmedia_picture.png'
    }
  }
};
