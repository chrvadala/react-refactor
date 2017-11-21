const log = console.log;

module.exports = function execRefactorOnFile(file, options) {
  const {
    clipboard = false,
    output = null,
  } = options;




  console.log(file, clipboard, output)


  if(clipboard){



    log('Output saved on clipboard')
  }


  if(output){




    log('Output saved on file')
  }



}
