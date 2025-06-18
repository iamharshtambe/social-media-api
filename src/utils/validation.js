import validator from 'validator';

export function validateSignupData(req) {
   const { firstName, lastName, email, password } = req.body;

   if (!firstName || !lastName) {
      throw new Error('Enter a valid name');
   } else if (!validator.isEmail(email)) {
      throw new Error('Enter a valid email');
   } else if (!validator.isStrongPassword(password)) {
      throw new Error('Enter a strong password');
   }
}

export function validateEditProfileData(req) {
   const allowedEditFields = [
      'firstName',
      'lastName',
      'age',
      'gender',
      'about',
      'skills',
   ];

   const isAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
   );

   return isAllowed;
}
