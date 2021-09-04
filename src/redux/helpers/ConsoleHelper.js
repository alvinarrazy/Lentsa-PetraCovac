const ConsoleHelper = (data) => {
    if (process.env.NODE_ENV === 'production') return;
    else console.log(data);
  }
  
  export default ConsoleHelper;