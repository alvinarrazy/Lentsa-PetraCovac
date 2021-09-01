const ConsoleHelper = (data) => {
    if (process.env.NODE_ENV === 'production') return;
    ConsoleHelper(data);
  }
  
  export default ConsoleHelper;