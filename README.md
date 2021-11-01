# y-praktikum-slack-bot
slack bot for Yandex.Praktikum

## COMMANDS:

`/split-to-messages`

Разбивает куски текста, отделенные пустой строкой, на отдельные сообщения + добавляет меншены к каждому сообщению

Меншены нужно писать отдельной строкой (или строками), если хочется их продублировать в каждое сообщение

Пример:

```
/split-to-messages

Веселые истории
Экран покажет ваш

Веселые истории
В журнале

<link.to/website|Ералаш>

@Вася @Петя
@Катя


```

=>

```
Веселые истории
Экран покажет ваш

@Вася @Петя @Катя // как меншены здесь и ниже

// ----новое сообщение----

Веселые истории
В журнале

@Вася @Петя @Катя

// ----новое сообщение----

Ералаш // как ссылка

@Вася @Петя @Катя
```

## Deploy
```
git add .
git commit -am 'comment-text'
git push heroku main
```

More info here:
https://slack.dev/bolt-js/deployments/heroku

## App Manifest Example
```
_metadata:
  major_version: 1
  minor_version: 1
display_information:
  name: projects-helper-2
  description: Splits theme list to messages
  background_color: "#000000"
features:
  app_home:
    home_tab_enabled: true
    messages_tab_enabled: false
    messages_tab_read_only_enabled: false
  bot_user:
    display_name: platform-helper-2
    always_online: true
  slash_commands:
    - command: /split-to-messages
      url: https://y-praktikum-slack-bot-2.herokuapp.com/slack/events
      description: splits theme list to messages
      usage_hint: can @mention!
      should_escape: false
oauth_config:
  scopes:
    bot:
      - commands
      - channels:history
      - channels:read
      - chat:write
      - im:write
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```