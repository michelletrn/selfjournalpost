const sequelize = require('../config/connection');
const { User, Goal, Entry, Comment } = require('../models');

const userData = require('./userdata.json');
const goalsData = require('./goalsdata.json');
const entryData = require('./entrydata.json');
const commentData = require('./commentsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const entry of entryData) {
        await Entry.create({
            ...entry,
            returning: true
        })
    }

    for (const goal of goalsData) {
        await Goal.create({
            ...goal,
            user_id: goal.user_id,
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            entry_id: comment.entry_id,
        });
    }
    
    process.exit(0);
};

seedDatabase();

