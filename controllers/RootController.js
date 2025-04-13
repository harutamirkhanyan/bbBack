export const data = {
  name: 'Harut',
  login: 'Harut',
  rolle: 'Admin'
}

export const getRootHandler = (req, res) => {
  console.log('Get root route')
  res.send(JSON.stringify(data))
}

