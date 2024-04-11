const data = {
  name: 'Harut',
  login: 'Harut',
  rolle: 'Admin'
}

const getRootHandler = (req, res) => {
  console.log('Get root route')
  res.send(JSON.stringify(data))
}


module.exports = { getRootHandler }