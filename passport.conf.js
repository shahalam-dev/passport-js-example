const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./database");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: "Incorrect email." });
        if (user.password !== password)
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
