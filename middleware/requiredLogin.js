const isAuth = (req) => {
  return req.session.auth === `${process.env.AUTH_SIGN}${process.env.AUTH_SIGN_PWD}`
}

export default function ({req, res}) {
  if(!isAuth(req) && req.originalUrl !== '/login') {
    return res.redirect('/login');
  }

  if(isAuth(req) && req.originalUrl !== '/login') {
    return
  }

  if(isAuth(req) && req.originalUrl === '/login') {
    return res.redirect('/');
  }
}
