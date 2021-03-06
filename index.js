'use strict'

const request = require('request')
const express = require('express')

const app = express()

app.use(require('cors')())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))

const mentions = ' <@nornagon> <@UF1KBQWS3>'
app.use(function (req, res) {
  let body = req.body.Body || req.body.body || req.body.description

  if (!body)
    return res.status(400).end()

  request.post({
    uri: process.env.SLACK_URL,
    json: {
      username: 'Incident',
      icon_emoji: ':japanese_ogre:',
      text: body + mentions
    }
  })
  res.status(204).end()
})

app.listen(process.env.PORT || 8080)
