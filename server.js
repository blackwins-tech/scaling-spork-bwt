const fs = require('fs')
const bcrypt = require("bcrypt")
const csv = require('csv-parser')
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("malardata");
app.post('/uploadcsv', (req, res) => {  
    upload(req, res, (err) => {
        if(err) {
          res.status(400).send("Something went wrong!");
        }
        res.send(req.file);
      });
   
});
app.listen(3000, () => { 
    console.log('Started on port 3000');
});
// let passwordArray=[];
// fs.createReadStream("./malardata.csv")
//     .pipe(csv())
//     .on('data', async function (row) {
//         //console.log(`Header: ${row.Password}`);
//         let stud_password = row.Password;
//         //console.log(`before encryption: ${stud_password}`);
//         const salt = await bcrypt.genSalt(7);
//         const hashed_stud_password = await bcrypt.hash(stud_password, salt);
//         //console.log(`before encryption: ${hashed_stud_password}`);
//         const checkPassword = await bcrypt.compareSync(stud_password, hashed_stud_password);
//         if(checkPassword === true){
//             //console.log(`before encryption: ${hashed_stud_password}`);  
//             console.log(checkPassword);
//         }
//     })
//     .on("end", function(){
//         console.log("finished");
//     })
//     .on("error", function(error){
//         console.log(error.message);
//     })

//     console.log(passwordArray);

// const input = fs.createReadStream("./malardata.csv");
//  //calling the npm package and save to records
// const records = parse(input, {
//     columns: true,
//     skip_empty_lines: true
//   });
//   //map the output from csv-parse to the column
//   const column_two = records.map(rec => rec["Password"]);