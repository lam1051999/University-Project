const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fn = require('./func');
const app = express();

//use cors
app.use(cors());
app.options('*' , cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'lam1051999',
    database : 'btl2vn',
});
db.connect(err => {
    if(err) throw err;
    console.log('mysql connected...');
});

//register
app.post('/regist' , (req , res) => {
    let account = req.body;
    let sql = `INSERT INTO users (user , pass) VALUES ("${account.user}" , "${account.pass}")`;
    db.query(sql , (err , result) => {
        if(err) 
        res.json({success : 0});
        else 
        res.json({success : 1});
    })
});

//login
app.post('/login' , (req , res) => {
    let account = req.body;
    let sql = "SELECT * FROM users";
    db.query(sql , (err , result) => {
        let x = result.find( i => i.user === account.user && i.pass === account.pass)
        if(x === undefined)
        res.json({success : 0});
        else
        res.json({...x , success : 1});
    })
});

//news
app.get('/logged/news' , (req , res) => {
    let sql = "SELECT * FROM tintuc";
    db.query(sql , (err , result) => {
        if(err) throw err;
        res.json(result);
    })
})

app.post('/logged/admin/addNews' , (req , res) => {
    let news = req.body;
    let sql = `INSERT INTO tintuc (noidung , ngaytao) VALUES ("${news.noidung}" , "${news.ngaytao}")`;
    db.query(sql , (err , result) => {
        if(err) 
            res.json({success : 0})
        else
        {
            res.json({success : 1})
        }
    })
})
//sv
app.post('/logged/sv/dk' , (req , res) => {
    let sv = req.body;
    db.query(`SELECT * FROM students WHERE user_fk = "${sv.user_fk}"` , (err , rs) => {
        if(rs.length === 1)
        res.json({success : -1})
        else
    {
        
        let sql = `INSERT INTO students (MSSV , CMND , name , gender , address , class , phone , email , user_fk) VALUES (0 , ${Number(sv.CMND)} , "${sv.name}" , "${sv.gender}" , "${sv.address}" , "${sv.class}" , "${sv.phone}" , "${sv.email}" , "${sv.user_fk}")`;
        db.query(sql , (err , result) => {
            if(err)
            res.json({success : 0});
            else
            {
            res.json({success : 1});
            db.query("SELECT * FROM students" , (err , result1) => {
                if(err) throw err;
                let newarr = fn(result1);
                newarr.reverse().map(x => db.query(`UPDATE students SET MSSV = ${x.MSSV} WHERE CMND = ${x.CMND}`, (err , result) => {
                if(err) throw err;
            }))
            })
            }
    })
    }
})
})

app.post('/logged/sv/cn' , (req , res) => {
    let cn = req.body;
    let sql = `UPDATE students SET address = "${cn.address}" , class = "${cn.class}" , phone = "${cn.phone}" , email = "${cn.email}" WHERE user_fk = "${cn.user_fk}"`;
    db.query(sql , (err , result) => {
        if(err)
            res.json({success : 0})
        else
        res.json({success : 1})
    })
})

app.post('/logged/admin/sv' , (req , res) => {
    db.query(`UPDATE sv_hp SET diemgk = ${Number(req.body.diemgk)} , diemck = ${Number(req.body.diemck)} WHERE MSSV_fk = ${Number(req.body.MSSV_fk)} AND mahp_fk = "${req.body.mahp_fk}"` , (err , result) => {
        if(err || result.affectedRows === 0)
            res.json({success : 0});
        else
            res.json({success : 1});
    })
})

//dssv
app.get('/logged/dssv' , (req , res) => {
    let sql = `SELECT * FROM students`;
    db.query(sql , (err , result) => {
        if(err) throw err;
        res.json(result);
    })
})

app.get('/logged/admin/dssv/:sv' , (req , res) => {
    db.query(`DELETE FROM students WHERE MSSV = ${Number(req.params.sv)}` , (err , result) => {
        if(err)
            res.json({success : 0});
        else
            res.json({success : 1});
    })
    db.query("SELECT * FROM students" , (err , result1) => {
        if(err) throw err;
        let newarr = fn(result1);
        newarr.map(x => db.query(`UPDATE students SET MSSV = ${x.MSSV} WHERE CMND = ${x.CMND}`, (err , result) => {
        if(err) throw err;
    }))
    })
})

//dshp
app.get('/logged/hp' , (req , res) => {
    let sql = "SELECT * FROM hp";
    db.query(sql , (err , result) => {
        if(err) throw err;
        res.json(result);
    })
})
//cần sửa
app.post('/logged/hp/dk' , (req , res) => {
    db.query(`SELECT * FROM students WHERE user_fk = "${req.body.user_fk}"` , (err , result) => {
        db.query(`SELECT * FROM hp WHERE mahp = "${req.body.mahp}"` , (err , result2) => {
            if(result2.length === 0)
            res.json({success : -1})
            else
            {
        db.query(`INSERT INTO sv_hp (MSSV_fk , mahp_fk) VALUES (${result[0].MSSV} , "${req.body.mahp}")` , (err , result1) => {
            if(err)
                res.json({success : 0});
            else
            res.json({success : 1})
        })
    }
    })
    })
})

app.get('/logged/hp/ds/:sv' , (req , res) => {
    db.query(`SELECT sv_hp.mahp_fk , sv_hp.diemgk , sv_hp.diemck , hp.tenhp FROM 
    ((  sv_hp
        INNER JOIN students ON sv_hp.MSSV_fk = students.MSSV)
        INNER JOIN hp ON sv_hp.mahp_fk = hp.mahp) 
        WHERE students.user_fk = "${req.params.sv}"` , (err , result) => {
            if(err) throw err;
            res.json(result)
        })
})

app.post('/logged/admin/hp/taohp' , (req , res) => {
    db.query(`INSERT INTO hp (mahp , tenhp) VALUES ("${req.body.mahp}" , "${req.body.tenhp}")` , (err , result) => {
        if(err)
            res.json({success : 0})
        else 
        res.json({success : 1})
    })
})

app.get('/logged/admin/hp/:mahp' , (req , res) => {
    db.query(`SELECT * FROM hp WHERE mahp = "${req.params.mahp}"` , (err , result1) => {
        if(result1.length === 0)
        res.json({success : -1})        
        else
        db.query(`SELECT students.name , students.class , sv_hp.diemgk , sv_hp.diemck , hp.mahp , hp.tenhp FROM 
        ((sv_hp 
        INNER JOIN students ON sv_hp.MSSV_fk = students.MSSV) 
        INNER JOIN hp ON sv_hp.mahp_fk = hp.mahp) 
        WHERE sv_hp.mahp_fk = "${req.params.mahp}"` , (err, result) => {
                if(result.length === 0)
                res.json({success : 0})
                else
                res.json({success : 1 , kq : [...result]});
            })
        })
    })

//delete news
app.get('/logged/admin/:news' , (req , res) => {
    db.query(`DELETE FROM tintuc WHERE ID = ${Number(req.params.news)}` , (err , result) => {
        if(err)
            res.json({success : 0})
        else{
            res.json({success : 1})
        }
    })
})

app.get('/logged/admin/delete/:hp' , (req , res) => {
    db.query(`DELETE FROM hp WHERE mahp = "${req.params.hp}"` , (err ,result) => {
        if(err)
            res.json({success : 0})
        else{
            res.json({success : 1})
        }
    })
})
//port 8000
app.listen(8000 , () => {
    console.log('listening port 8000');
});