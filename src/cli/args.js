const parseArgs = () => {
  const argsArray = process.argv.slice(2);

  const result = argsArray.reduce((acc, arg, index, array) => {
    if (arg.startsWith('--') && !(index % 2) && !!array[index + 1]) {
      acc.push(`${arg.slice(2)} is ${array[index + 1]}`)
    }
    return acc;
  }, []).join(', ');

  console.log(result)
};

parseArgs();
