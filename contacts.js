const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.Interface({
//     input: process.stdin,
//     output: process.stdout,
// });

//? membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

//? membuat cntacts.json jika belum ada 
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// const pertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama)
//         })
//     })
// }
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer)
    return contacts
}
//!simpan contact
const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP}
    const contacts = loadContact()

    //? cek duplikat nama kontak
    const duplikat = contacts.find((contact) => contact.nama == nama)
    if (duplikat) {
        console.log(chalk.red.inverse.bold('nama kontak sudah ada, gunaan nama lain'))
        // rl.close()
        return false
    }

    //? cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('email tidak valid'))
            return false
        }
    }

    //? cek noHP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('noHP tidak valid'))
            return false
    }

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    console.log(chalk.greenBright.inverse.bold('terimakasih sudah memasukan data'))
    // rl.close()
}

//! list contact
const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.blueBright.inverse.bold('Daftar contact : '))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    })
}

//! detail contact
const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`))
        return false
    }

    console.log(chalk.blueBright.inverse.bold(contact.nama))
    console.log(contact.noHP)
    if (contact.email) {console.log(contact.email);}
}

//! delete contact 
const deleteContact = (nama) => {
    const contacts = loadContact()
    const index = contacts.findIndex(contact => contact.nama.toLowerCase() === nama.toLowerCase())
    
    if (index == -1) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false
    }

    contacts.splice(index, 1)
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.greenBright.inverse.bold(`${nama} berhasil di hapus`));
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }