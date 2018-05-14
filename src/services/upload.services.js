var multer  = require('multer')

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, 'src/modules/uploads/profile-photos');
    },

    filename: (req, file, next) => {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.'+ ext);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: (req, file, next) => {
        if(!file){
          next();
        }

      // only permit image mimetypes
      const image = file.mimetype.startsWith('image/');
      if(image){
        console.log('photo uploaded');
        next(null, true);
      }else{
        console.log("file not supported")
        //TODO:  A better message response to user on failure.
        return next();
      }
  }
};

export const mult = multer(multerConfig).single('photo');
