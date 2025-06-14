export function adminAuth(req, res, next) {
   const token = '241331';
   const isAuthorizedAdmin = token === '241331';

   if (!isAuthorizedAdmin) {
      res.status(401).send('Unauthorized Admin');
   } else {
      next();
   }
}
