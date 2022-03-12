import { rest } from "msw";

const signup = rest.post("/api/1.0/users", (req, res, ctx) => {
  const body = req.body;
  let validationErrors = {}
  if(!body.username) {
    validationErrors.username = 'Username is required'
  }
  if(body.username && body.username.includes('@')){
    validationErrors.username = 'Username cannot contain @';
  }
  if (!body.email){
    validationErrors.email = 'Email is required';
  }

  if (!body.password){
    validationErrors.password = 'Password is required';
  }

  if(Object.keys(validationErrors).length > 0) {
    return res(
      ctx.status(400),
      ctx.delay(1000),
      ctx.json({
        validationErrors
      })
    )
  }
  return res(
    ctx.delay(1000),
    ctx.json({
      message: 'Please check your email for account activation'
    })
  );
});

const handlers = [signup];
export default handlers;
