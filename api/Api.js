
const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cors =require('cors')
const bcrypt = require('bcryptjs')
const PORT = process.env.PORT
const SECRET = process.env.SECRET

//Initialisation de Express 4
const app = express();
app.use(cors())                                // Activation de CORS                      
app.use(express.json())                        // Activation du raw (json)
app.use(express.urlencoded({ extended: true})) // Activation de x-www-form-urlencoded

//middleware db

    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER1,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
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


// Liste des utilisateurs

app.post('/register', (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    const verifpassword = req.body.confirmpassword;
    const email = req.body.email;
    const role = 'user';

    // Aucune informations à traiter
    if (!name || !password|| !email) { 
    return res.status(400).json({ message: 'Error. Please enter username, password and email' })
    } else if (password !== verifpassword) { 
        return res.status(400).json({ message: 'Error. Passwords do not match'})
    }

    // Check
    db.query('SELECT * FROM users WHERE name = ? ', [name], (error, results) => {
        if(error || !result[0]) {
             res.status(400).json({ message: `Error. no name enter`})
        }
        if (results[0]) {
            res.status(400).json({ message: `Error. User ${name} already exists`})
        } else  {
            db.query('INSERT INTO users (email, name, role ) VALUES (?, ?, ?)', [email, name , role])
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                      // Store hash in your password DB.
                      db.query('UPDATE users SET password =? WHERE email =?', [hash, email])
                      res.status(201).json({message: `User ${name} created succesfully`})
                    })
                  })
            }
        }
    )
});

app.get('/me', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
return res.json({  id:decoded.id,
                    name:decoded.username,
                    email:decoded.email,
                    role:decoded.role   })
});

app.post('/login', (req, res) => {
    const name = req.body.username.toString();
    const passwords = req.body.password.toString();
    // Pas d'information à traiter
    if (!name || !passwords) {
        return res.status(400).json({ message: 'Error. Please enter a username and/or password' })
    }
    //check password

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
        else if (verification === true){}
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
    })      
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


app.get('/user/:id', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
    if(decoded.role === "admin"){
        db.query('SELECT * FROM users WHERE id =?;',[+req.params.id],(error, result) =>{
    if(error){
        throw error
    }
        return res.json({name:result[0].name,
                          email:result[0].email})
        })
    }         
});


app.delete('/user/:id', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
    if (decoded.role === 'admin'){
        db.query('DELETE FROM users where id = ? ;',[+req.params.id],(result,error)=>{
            if(error) {
                res.json({ message:'the account  have been deleted'})
            } else
            res.status(400).json({ message:'the account  have no\'t been deleted'})
        })
    } else if (decoded.role === 'user')
         db.query('DELETE FROM users where id = ? ;',[decoded.id],(result,error)=>{
        if(error) {
            res.json({ message:'the account  have been deleted'})
        } else
        res.status(400).json({ message:'the account  have no\'t been deleted'})
    })
})

//product

app.post('/product/create', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
    if(decoded.role !== "admin"){
        res.status(400).json({message:'you are no\'t authorized to create a product'})
    }
    else if(!req.body.productname || !req.body.productprice || !req.body.productdescription || !req.body.productimg){
            return res.status(400).json({message: 'error no productname or/and no productprice or/and no image or/and no description'})
    }
        db.query('INSERT INTO products (productname, productdescription, productprice, productimg) VALUES ( ?, ?, ?, ?)',[req.body.productname,req.body.productdescription, +req.body.productprice, req.body.productimg],(error, result) => {
            if(error){
                return res.status(400).json({message: error})
            }
        return res.json({message: 'your product have been added succesfully'})
    })
});


app.get('/product/', checkTokenMiddleware, (req, res) => {
    if(!req.body.name){
        return res.status(400).json({message: 'error no productname'})
    }
        db.query('SELECT * FROM products WHERE name =?;',[req.body.name.toString()],(error, result) => {
            if(error){
                return res.status(400).json({message: 'error product dont exist'})
            }
        return res.json({message: result})
    })
});


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
});


app.delete('/product/:id', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
    if(decoded.role === 'admin'){
        db.query('DELETE FROM products where id = ? ;',[+req.params.id],(result,error)=>{
            if(error) {
                return res.json({message:'the product deleted succesfully' })
            } else
            res.status(400).json({ message:'the product  have no\'t been deleted'})
        })
    }
});


app.get('/products', (req, res) => {
    db.query('SELECT id, productname, productdescription, productprice, productimg FROM products;',(error, result) => {
        if(error){
            return res.status(400).json({message: 'no products in database'})
        }
        return res.json(result)
    })
});

app.get('/products/', (req, res) => {
    if(!req.body.id) {
        return res.status(400).json({message: 'need a product id'})
    }
    db.query('SELECT productname, productdescription, productprice, productimg FROM products WHERE userid = ?;',[req.body.id], (error, result) => {
        if(error){
            return res.status(400).json({message: 'this id have no user'})
        }
    return res.json({product: {productname : result[0].productname,
                                productprice : result[0].productprice}})
    })
});


app.get('/bucket/:id', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
let id = decoded.id
    if(decoded.role === 'admin'){
        id = req.params.id
        db.query('select bucket.id, bucket.userid, products.productname, products.productprice FROM products, bucket WHERE products.id = bucket.productid;', [+id], (error, result) => {
            return res.json(result)
        })
    }else if(decoded.role === 'user')
    db.query('select bucket.id, bucket.userid, products.productname, products.productprice FROM products, bucket WHERE products.id = bucket.productid AND bucket.userid = ?;', [+id,decoded.id], (error, result) => {
        return res.json(result)
    })
});


app.post('/bucket', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
const purchased = 0

    db.query('INSERT INTO bucket (userid, productid, purchased) VALUES (?, ?, ?)',[decoded.id, req.body.productid,purchased], (error, result) =>{
        return res.json({message:'product linked to user into bucket'})
    })
});

app.delete('/bucket/:id', checkTokenMiddleware, (req, res) => {
const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
const decoded = jwt.decode(token, { complete: false })
    if (decoded.role === 'admin'){
        db.query('DELETE FROM bucket where id = ? ;',[+req.params.id],(result,error)=>{
            if(error) {
                res.json({ message:'the product have been deleted of the bucket'})
            } else
               res.status(400).json({ message:'the product  have no\'t been deleted of the bucket'})
        })
    } else if (decoded.role === 'user'){
        db.query('DELETE FROM bucket where id = ? AND userid = ? ;',[+req.params.id,decoded.id],(result,error)=>{
            if(error) {
                res.json({ message:'the product have been deleted of the bucket'})
            } else
            res.status(400).json({ message:'the account  have no\'t been deleted'})
        })
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
