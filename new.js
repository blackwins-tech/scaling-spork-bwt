const fs = require('fs');
const bcrypt = require("bcrypt");
const csv = require('csv-parser');
let passwordArray=[];
let hashed_stud_password=[];
fs.createReadStream("./overall_malar_school_data_csv.csv")
    .pipe(csv())
    .on('data',  function (row) {
        // console.log(`Header: ${row.Password}`);
        let stud_password = row.stud_password;
        //console.log(`${stud_password}`);
        passwordArray.push(stud_password);

       
    })
    .on("end", async function(){
        console.log(passwordArray);
        const salt = await bcrypt.genSalt(7);
        for(var index=0;index<passwordArray.length;index++){
            let hashed_stud_password_value = await bcrypt.hash(index, salt);
            hashed_stud_password.push(hashed_stud_password_value);
            //const checkPassword = await bcrypt.compareSync(index, hashed_stud_password_value);
            // if(checkPassword === true){
            //     //console.log(`${hashed_stud_password}`);  
            //     console.log(`${index} - ${hashed_stud_password_value}`);
            // }
        }

        for(var index=0;index<passwordArray.length;index++){
            for(var i =0;i<hashed_stud_password.length;i++){
                let checkPassword = await bcrypt.compareSync(index, i);
                if(checkPassword === true){
                    console.log(`${index} - ${i}`);
                }
            }
        }
        
        console.log("finished");
    })
    .on("error", function(error){
        console.log(error.message);
    })

     
// const decrypted = async ()=>{
//     let stud_password = '1072018';
//     const salt = await bcrypt.genSalt(7);
//     const hashed_stud_password = await bcrypt.hash(stud_password, salt);
//     //console.log(`before encryption: ${hashed_stud_password}`);
//     const checkPassword = await bcrypt.compareSync(stud_password, hashed_stud_password);
//     if(checkPassword === true){
//         console.log(`${hashed_stud_password}`);  
//         //console.log(checkPassword);
//     }

// }
// decrypted();
