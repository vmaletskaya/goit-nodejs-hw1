const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

program
.option('-a, --action <type>', 'choose action')
.option('-i, --id <type>', 'user id')
.option('-n, --name <type>', 'user name')
.option('-e, --email <type>', 'user email')
.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break
    case "get":
      const selectedContact = await contacts.getContactById(id);
      console.log(selectedContact);
      break
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break
    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log(deletedContact);
      break
    default:
      console.log("Unknown action");
  }
};

invokeAction(argv);