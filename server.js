const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

hbs.registerPartials('./views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('upperCase', (text) => {
  return text.toUpperCase()
})
const app = express()

app.set('view engine', 'hbs')
app.use((req, res, next) => {
  let time = new Date().toString()
  let log = `${time}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n')
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   })
// })

// xxxxxxxxxxxxxxxxxxxxx
// yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home Page!'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Houdini'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})