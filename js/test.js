const prompt = require('prompt');

const properties = [
  {
    name: 'name',
    validator: /^[a-zA-Z\s-]+$/,
    warning: 'Name must be only letters or spaces, and at least two characters long',
  },
  {
    name: 'shape',
    validator: /^X|O+$/,
    warning: 'Shape must be either "X" or "O"',
  }
];

async function main() {
  const { name, shape } = await prompt.get(properties);
  console.log(name, shape);
}


main()
