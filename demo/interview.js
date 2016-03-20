import { delay } from 'bluebird';
import { red } from 'chalk';

import input from '../src/lib';

async function interview() {
  const name = await input.text('What is your name?', { default: 'Fernando Partridge' });

  const colors = await input.checkboxes(
    `\nOK ${name}, choose some colors`,
    ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'rebeccapurple'],
    {
      validate: async answer => {
        console.log('\nvalidating...');
        await delay(1000);
        if (answer.length < 2) return red('Please choose at least 2 colours!');
        return true;
      },
    }
  );

  console.log('\nYou chose:\n  ' + colors.join('\n  '));

  if (colors.length > 1) {
    console.log(
      'Your favourite colour of all is',
      await input.select('\nWhich one is best?', colors)
    );
  }

  console.log('You typed:', await input.password('\nType a password (not a real one)'));

  console.log('Your answer was:', await input.confirm('\nDo you confirm or deny?'));
}

interview();
