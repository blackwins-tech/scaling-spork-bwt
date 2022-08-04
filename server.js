const fs = require('fs');
const bcrypt = require("bcrypt");
const csv = require('csv-parser');
let passwordArray=[];
let stud_password ;
fs.createReadStream("./overall_malar_school_data_csv.csv")
    .pipe(csv())
    .on('data', async function (row) {
        // console.log(`Header: ${row.Password}`);
        stud_password = row.stud_password;
        //console.log(`in data: ${stud_password}`);
        passwordArray.push(stud_password);
        console.log(passwordArray.length);
        //  const salt = await bcrypt.genSalt(7);
        // for(var index=0;index<passwordArray.length;index++){
        //     let hashed_stud_password_value = await bcrypt.hash(passwordArray[index], salt);
        //     //hashed_stud_password.push(hashed_stud_password_value);
        //     const checkPassword = await bcrypt.compareSync(passwordArray[index], hashed_stud_password_value);
        //     if(checkPassword === true){
        //         //console.log(`${hashed_stud_password}`);  
        //         console.log(`${index} - ${hashed_stud_password_value}`);
        //     }
        // }
        
    })
    .on("end", async function(){
        // console.log(`in end : ${stud_password}`);
        const salt = await bcrypt.genSalt(7);
        for(var index=0;index<passwordArray.length;index++){
            let hashed_stud_password_value = await bcrypt.hash(passwordArray[index], salt);
            //hashed_stud_password.push(hashed_stud_password_value);
            const checkPassword = await bcrypt.compareSync(passwordArray[index], hashed_stud_password_value);
            if(checkPassword === true){
                //console.log(`${hashed_stud_password}`);  
                console.log(`${hashed_stud_password_value}`);
            }
        }
        console.log("finished");
    })
    .on("error", function(error){
        console.log(error.message);
    })

//     console.log(passwordArray);
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
