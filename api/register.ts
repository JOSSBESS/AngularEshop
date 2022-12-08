import db 


    dbqueryINSERT INTO users(email, name, password) value(?, ?, ?)',
        [
            data.email,
            data.name,
            data.password
        ]
    )   
}
}