const findInsertIdx = imgString => {
  for (var i = 0; i<imgString.length; i++) {
    if (imgString[i] === "u" 
        && imgString[i+1] === "p" 
        && imgString[i+2] === "l" 
        && imgString[i+3] === "o" 
        && imgString[i+4] === "a" 
        && imgString[i+5] === "d") {
          return i+6;
    }
  }
};

const resizeImage = imgString => {
  let insertIdx = findInsertIdx(imgString);
  let imageManipulation = "/h_400,w_400,g_face,c_thumb";
  let stringArray = imgString.split(""); 
  stringArray.splice(insertIdx, 0, imageManipulation);
  return stringArray.join(""); 
};


export default resizeImage; 