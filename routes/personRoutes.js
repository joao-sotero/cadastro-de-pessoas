const router = require('express').Router()
const Person = require('../models/person')

//criação de dados
router.post('/', async (req, res) => {

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }
    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatorio' })
        return
    }
    try {

        await Person.create(person)

        res.status(201).json({ mensage: 'Usuário criado' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const people = await Person.findOne({_id:id})
        if(!people){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }else{
        res.status(200).json(people)
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async(req, res) =>{
    const {id} = req.params
    const { name, salary, approved} = req.body
    const person = { name, salary, approved}

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
        return
        }
        res.status(200).json(person)
    } catch (error) {
      
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params
    
    try {
        const deletePerson = await Person.deleteOne({_id:id})
        if(deletePerson.deletedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
        return
        }
        res.status(200).json({message: 'Usuário excluido'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router