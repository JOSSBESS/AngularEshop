
const express = require('express')
const jwt = require('jsonwebtoken')
const cors =require('cors')
const bcrypt = require('bcryptjs')
const PORT = 8080
const SECRET = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'

//Initialisation de Express 4
const app = express();
app.use(cors())                                // Activation de CORS                      // Activation de Morgan
app.use(express.json())                        // Activation du raw (json)
app.use(express.urlencoded({ extended: true})) // Activation de x-www-form-urlencoded

//middleware db

    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'admin_user',
        password: 'password',
        database: 'api'
    });

db.connect(err => {
    if(err) {
        throw err
    }
    console.log('connected')
    }
)

/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
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
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}


// Liste des utilisateurs

app.post('/register', (req, res) => {

    const name = req.body.username.toString();
    const password = req.body.password.toString();
    const verifpassword = req.body.confirmpassword.toString();
    const email = req.body.email.toString();
    const role = 'user';

    // Aucune informations à traiter
    if (!name || !password|| !email) { 
    return res.status(400).json({ message: 'Error. Please enter username, password and email' })
    } else if (password !== verifpassword) { 
        return res.status(400).json({ message: 'Error. Passwords do not match'})
    }

    // Check
    db.query('SELECT * FROM users WHERE name = ? ', [name], (error, results) => {
        if (results[0]) {
            res.status(400).json({ message: `Error. User ${name} already exists`})
        } else  {
            db.query('INSERT INTO users (email, name, role ) VALUES (?, ?, ?)', [email, name , role])
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                      console.log(hash);
                      // Store hash in your password DB.
                      db.query('UPDATE users SET password =? WHERE email =?', [hash, email])
                      res.status(201).json({message: `User ${name} created succesfully`})
                    })
                  })
            }
        }
    )
})
/* Ici les futures routes */

app.get('/me', checkTokenMiddleware, (req, res) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })
    
    return res.json({  id: decoded.id,
                        username: decoded.username,
                        email: decoded.email,
                        role: decoded.role })
})

app.post('/login', (req, res) => {
    const name = req.body.username.toString();
    const passwords = req.body.password.toString();
    // Pas d'information à traiter
    if (!name || !passwords) {
        return res.status(400).json({ message: 'Error. Please enter a username and/or password' })
    }
    //check password

    db.query('SELECT password from users where name =? ;',[name], (error, result) => {

        if(result.length <= 0){
            return res.status(400).json({ message: 'you don\'t have a account' })
       }
        bcrypt.compare(passwords, result[0].password,function (error, result) {
            if(result === false) {
                return res.status(400).json({ message: 'wrong password' })
            }
        })
        console.log(name)
            db.query('SELECT id,email,role from users where password =? AND name =? ;',[result[0].password, name], (error, results) => {
               
            const token = jwt.sign({

                id: results[0].id,
                username:name,
                email: results[0].email,
                role: results[0].role

        }, SECRET, { expiresIn: '3 hours' })
        console.log(token)
        return res.json({token:`Bearer ${token}`})

        })
    }) 
})

app.get('/users', (req, res) => {

    db.query('SELECT name from users',(error, result) =>{
        if(error){
        return res.status(400).json({ message: 'database empty' })
    }
    return res.json({result})
 })
})


app.put('/user/', checkTokenMiddleware, (req, res) => {
// Récupération du token
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
// Décodage du token
const decoded = jwt.decode(token, { complete: false })
    if(decoded.role ="admin") {
        db.query('UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?;',[req.body.email, req.body.name, req.body.password, req.body.id],(error,result) => {
            if (error){
                return res.status(400).json({ message: 'problem in your update profile' })
            }
            return res.json({message: 'profile updated by admin'})
        })
    }
    db.query('UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?;',[req.body.email, req.body.name, req.body.password, decoded.id],(error,result) => {
        if (error){
            return res.status(400).json({ message: 'problem in your update profile' })
        }
        return res.json({message: 'profile updated by user'})
    })   
})


app.get('/user/', checkTokenMiddleware, (req, res) => {
// Récupération du token
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
// Décodage du token
const decoded = jwt.decode(token, { complete: false })

    if(decoded.role === "admin"){
        db.query('SELECT * FROM users WHERE id =?;',[req.body.id],(error, result) =>{
    if(error){
        return res.status(400).json({message:'this user don\'t exist'})
    }
        return res.json({message: result})
        })
    }         
})

// produit route

app.delete('/user/:id', checkTokenMiddleware, (req, res) => {
    const id = req.params.id
 // Récupération du token
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
 // Décodage du token
const decoded = jwt.decode(token, { complete: false })
    if(decoded.id === req.params.id && decoded.role === 'user'){                
        db.query('DELETE FROM users where id = ?;',[id])
        res.json({ message:'the account have been deleted'})
    } else if (decoded.role === 'admin'){
        db.query('DELETE FROM users where id = ?;',[req.params.id],(result,error)=>{
          (!error)? res.json({ message:'the account id have been deleted'}) : res.json({ message:'the account id have been deleted'});
        })
    }
})
//product

app.post('/product/create', checkTokenMiddleware, (req, res) => {

const auth = req.headers.authorization
const token = auth && extractBearerToken(auth)
const decoded = jwt.decode(token, { complete: false })

if(!req.body.name || !req.body.price){
    return res.status(400).json({message: 'error no productname or/and no productprice'})
}


db.query('INSERT INTO products (productname, productprice, userid) VALUES ( ?, ?, ?)',[req.body.name.toString(), +req.body.price, +decoded.id],(error, result) => {
    if(error){
        return res.status(400).json({message: error})
    }
    return res.json({message: 'your product have been added succesfully'})
})

})

app.get('/product/', checkTokenMiddleware, (req, res) => {
// Récupération du token
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
// Décodage du token
const decoded = jwt.decode(token, { complete: false })

if(!req.body.name){
    return res.status(400).json({message: 'error no productname'})
}
db.query('SELECT * FROM products WHERE name =?;',[req.body.name.toString()],(error, result) => {
    if(error){
        return res.status(400).json({message: 'error product dont exist'})
    }
    return res.json({message: result})
})
})

app.put('/product/', checkTokenMiddleware, (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    const decoded = jwt.decode(token, { complete: false })
    if(!req.body.name || !req.body.price){
    res.status(400).json({message: 'error no productname'})
    }
    db.query('UPDATE products SET productname = ?, productprice = ? WHERE userid = ?;',[req.body.name.toString(), req.body.price,decoded.id],(error, result) => {
    if(error){
        res.status(400).json({message: 'error problem with your price or name'})
    }
    res.json({message: result})
    })
})

app.delete('/product/:id', checkTokenMiddleware, (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    const decoded = jwt.decode(token, { complete: false })
    decoded.id

    return res.json({ })
})




app.get('/products', (req, res) => {
    db.query('SELECT productname, productprice FROM products;',(error, result) => {
        if(error){
            return res.status(400).json({message: 'no products in database'})
        }
        return res.json({message: result[0].productname,message: result[0].productprice})
    })
})




app.get('/products/', (req, res) => {
    if(!req.body.id) {
        return res.status(400).json({message: 'no id'})

    }

db.query('SELECT productname, productprice FROM products WHERE userid = ?;',[req.body.id], (error, result) => {
    if(error){
        return res.status(400).json({message: 'this id have no user'})
    }
    return res.json({message: result[0].productname,message: result[0].productprice})
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
