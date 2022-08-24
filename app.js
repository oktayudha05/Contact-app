const {pertanyaan, simpanContact} = require('./contacts.js');

const main = async () => {
    const nama = await pertanyaan('Masukan nama kamu : ')
    const email = await pertanyaan('Masukan email kamu : ')
    const noHP = await pertanyaan('Masukan nomor handphone kamu : ')

    simpanContact(nama, email, noHP)
}
main()