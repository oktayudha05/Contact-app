//? mengambil argumen dari comand line
const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'nomor handphone',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand()

//? menampilkan semua nama contact dan nomor hp nya
yargs.command({
    command: 'list',
    describe: 'menampilkan semua nama dan no HP contact',
    handler() {
         listContact()
    },
})

//? menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail contact',
    builder: {
        nama: {
            describe: 'nama contact',
            demandCommand: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.nama)
    }
})

yargs.command({
    command: 'delete',
    describe: 'menghapus contact',
    builder: {
        nama: {
            describe: 'nama contact',
            demandCommand: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.nama)
    }
})
yargs.parse()

