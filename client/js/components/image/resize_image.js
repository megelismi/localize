const findInsertIdx = imgString => {
  for (let i = 0; i < imgString.length; i++) {
    if (imgString[i] === 'u' 
        && imgString[i + 1] === 'p' 
        && imgString[i + 2] === 'l' 
        && imgString[i + 3] === 'o' 
        && imgString[i + 4] === 'a' 
        && imgString[i + 5] === 'd') {
          return i + 6;
    }
  }
};

const resizeImage = imgString => {
  const insertIdx = findInsertIdx(imgString);
  const imageManipulation = '/h_400,w_400,g_face,c_thumb';
  const stringArray = imgString.split(''); 
  stringArray.splice(insertIdx, 0, imageManipulation);
  return stringArray.join(''); 
};


export default resizeImage; 
