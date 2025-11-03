const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Get the primary email or the first verified email
        let email = null;
        if (profile.emails && profile.emails.length > 0) {
          // Find primary email first
          const primaryEmail = profile.emails.find((e) => e.primary);
          // Or find first verified email
          const verifiedEmail = profile.emails.find((e) => e.verified);
          // Use primary > verified > first available
          email =
            primaryEmail?.value ||
            verifiedEmail?.value ||
            profile.emails[0].value;
        } else {
          // Fallback if no email is provided
          email = `${profile.username}@users.noreply.github.com`;
        }

        // First, check if user exists by githubId
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          // User already logged in with GitHub before
          return done(null, user);
        }

        // Check if user exists by email (registered with password)
        user = await User.findOne({ email });

        if (user) {
          // Link GitHub account to existing email account
          user.githubId = profile.id;
          user.avatar = user.avatar || profile.photos?.[0]?.value;
          await user.save();
          return done(null, user);
        }

        // Create new user (no existing account found)
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email,
          avatar: profile.photos?.[0]?.value,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
