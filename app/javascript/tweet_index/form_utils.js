const getFormValues = (targetedForm) => {
  var kvpairs = {};
  var form = targetedForm
  for ( var i = 0; i < form.elements.length; i++ ) {
    var e = form.elements[i];
    if(e.name){
      kvpairs[e.name] = e.value;
    }
  }
  return kvpairs;
}

const findHashTags = (content) => {
  return content.replace(/\r?\n|\r/g, "").split(" ").filter( (word) => {
    return word.startsWith("#")
  }).map( (word) => {
    return word.replace(/#/, "")
  })
}

const resetFormValues = (inputs) => {
  Array.prototype.forEach.call(inputs, (input) => {
    input.value = "";
  })
}

export { getFormValues, findHashTags, resetFormValues }
