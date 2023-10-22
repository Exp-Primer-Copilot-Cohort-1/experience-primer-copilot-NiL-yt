// Create web server

// Import modules
const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')

// Get all members
router.get('/', (req, res) => {
  res.json(members)
})

// Get single member
router.get('/:id', (req, res) => {
  // Check if member exists
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    // 400: bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
})

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  // Check if name and email are not empty
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' })
  }

  members.push(newMember)
  //res.json(members)
  res.redirect('/')
})

// Update member
router.put('/:id', (req, res) => {
  // Check if member exists
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    const updatedMember = req.body
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name
        member.email = updatedMember.email ? updatedMember.email : member.email

        res.json({ msg: 'Member updated', member })
      }
    })
  } else {
    // 400: bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
})

// Delete member
router.delete('/:id', (req, res) => {
  // Check if member exists
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    })
  } else {
    // 400: bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
})

module.exports = router