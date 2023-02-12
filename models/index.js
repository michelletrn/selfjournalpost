const Entry = require("./Entry");
const Goal = require("./Goal");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Entry, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Goal, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Entry.belongsTo(User, {
  foreignKey: "user_id",
});

Entry.hasMany(Comment, {
  foreignKey: "entry_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Entry, {
  foreignKey: "entry_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Goal.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Entry, Goal, User, Comment };
