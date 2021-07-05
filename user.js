const userSignupQuery = `
INSERT INTO users VALUES (
  $1,
  $2,
  md5($3),
  NOW(),
  default.png
);
`
module.exports.userSignupQuery = userSignupQuery;


