const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cors =require('cors')
const bcrypt = require('bcryptjs')
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const {db} = require('./A-db')
const {ERROR} = require('./A-error')


//Initialisation de Express 4
const app = express();
app.use(cors())                                // Activation de CORS                      
app.use(express.json())                        // Activation du raw (json)
app.use(express.urlencoded({ extended: true})) // Activation de x-www-form-urlencoded


/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/^Bearer +([\w\-.~+\/]+=*)$/)
    return matches && matches[1]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Présence du token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }
    // Véracité du token
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}
 
app.post('/register', async (req, res) => {
const role = 'user';
const username =await req.body.username.toString();
const password = await req.body.password.toString();
const verifpassword = await req.body.confirmpassword.toString();
const email = await  req.body.email.toString();
    if( !username || !password || !email ){
        return res.status(400).json({message:ERROR.RegisterError1})
    } else if ( password !== verifpassword ) {
        return res.status(400).json({message:ERROR.RegisterError2})
        }
    function one(){
        db.query('SELECT id FROM users WHERE name = ? ', [username],(err,result) => {
            if(result[0]){
                return res.status(400).json({ message: `Error. User ${username} already exists`})
            }
            two()
        })
    }
    one()
    function two() {   
        db.query('INSERT INTO users (email, name, role ) VALUES (?, ?, ?)', [email, username , role],(err,res) => {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            three(hash)
        })
    }
    function three(hashed){
        db.query('UPDATE users SET password =? WHERE email =?', [hashed, email],(err,result) => {
            if (result) {
                return res.status(201).json({message: `User ${username} created succesfully`})
            }
        })
    }
});

app.post('/login', (req, res) => {
    const name = req.body.username.toString();
    const passwords = req.body.password.toString();
    if (!name || !passwords) {
        return res.status(400).json({ message: 'Error. Please enter a username and/or password' })
    }

    db.query('SELECT password from users where name =? ;',[name], (error, result) => {
        if(error) {
            res.status(400).json({message:'problem with database'})
        }
        if(result.length <= 0){
            return res.status(400).json({ message: 'you don\'t have a account' })
        }
        const verification = bcrypt.compareSync(passwords, result[0].password)
        if(verification === false) {
            return res.status(400).json({ message: 'wrong password' })
        }
        else if (verification === true){
            one()
        }
    })
    
    function one() { 
        db.query('SELECT id,email,role from users where password =? AND name =? ;',[result[0].password, name], (error, results) => {
            if(error) {
                res.status(400).json({message:'problem with token encoding'})
            }
            const token = jwt.sign({
                id: results[0].id,
                username:name,
                email: results[0].email,
                role: results[0].role

            }, SECRET, { expiresIn: '3 hours' })
            return res.json({token:token})
        })
    }
});

app.get('/users', checkTokenMiddleware, (req, res) => {
    db.query('SELECT id, email, name, role from users',(error, result) =>{
        if(error){
            return res.status(400).json({ message: 'database empty' })
        }
        return res.json(result)
    })
});

app.put('/user/', checkTokenMiddleware, (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    const decoded = jwt.decode(token, { complete: false })
    let id = 0
    if(!req.body.newpassword) {
        return res.status(400).json({message: 'need a new password'})
    }
    if(!req.body.email || !req.body.name){
        return res.status(400).json({message: 'need a name or a email'})
    }else
        db.query('UPDATE users SET email = ?, name = ? WHERE id = ?;',[req.body.email, req.body.name, +req.body.id],(error,result) => {
        })
    if(decoded.role === 'admin' && decoded.id !== +req.body.id){
        bcrypt.genSalt(10, (err, salt) => {
        one(salt) 
    })
    function one(salted) {
        bcrypt.hash(req.body.newpassword.toString(), salted, function (err, hash) {
            two(hash)
        })
    }
    function two(hashed) {
        db.query('UPDATE users SET password = ? WHERE id = ?;',[hashed, decoded.id],(error,result) => {
            if (error){
                return res.status(400).json({message: 'problem in password  update'})
            }  
            return res.json({message: 'password updated'})        
        })
    }}

});

app.put('/user/', checkTokenMiddleware, (req, res) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })
    let id = 0
        if(decoded.role === 'admin' && decoded.id !== +req.body.id){
            id = req.body.id
            if(req.body.newpassword){
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.newpassword, salt, function (err, hash) {
                        db.query('UPDATE users SET password = ? WHERE id = ?;',[hash, id],(error,result) => {
                            if (error){
                            return res.status(400).json({message: 'problem in password  update'})
                        }  
                        return res.json({message: 'password updated'})        
                    })
                })  
            })
        }
        if(!req.body.email || !req.body.name){
            return res.status(400).json({message: 'need a name or  a email'})
        }else
            db.query('UPDATE users SET email = ?, name = ? WHERE id = ?;',[req.body.email, req.body.name, +req.body.id],(error,result) => {
            })
        } 
        else if(decoded.role === 'user' || decoded.role === 'admin' && decoded.id !== +req.body.id ){
            id = decoded.id
            if(req.body.oldpassword || req.body.newpassword || req.body.confirmpassword ){
                db.query('SELECT password FROM users WHERE id = ?;',[+id],(error,result) => {
                    if (error) {
                    throw error
                    }else if(req.body.newpassword !== req.body.confirmpassword){
                        res.status(400).json({message:'password doesn\t match'})
                    }
                    const verification = bcrypt.compareSync(req.body.oldpassword.toString(), result[0].password)
                    if(verification === false) {
                        return res.status(400).json({ message: 'wrong password' })
                    }
                    else if (verification === true && req.body.newpassword === req.body.confirmpassword) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.newpassword, salt, function (err, hash) {
                                db.query('UPDATE users SET password = ? WHERE id = ?;',[hash, id],(error,result) => {
                                    if (error){
                                    return res.status(400).json({message: 'problem in password  update'})
                                }  
                                return res.json({message: 'password updated'})  
                                })
                            })
                        })
                    }
                })
            }
            if(!req.body.name || !req.body.email){
                return res.status(400).json({message: 'need a name or  a email'}) 
            }else
                db.query('UPDATE users SET email = ?, name = ? WHERE id = ?;',[req.body.email, req.body.name, id],(error,result) => {
            })
        }
    });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
