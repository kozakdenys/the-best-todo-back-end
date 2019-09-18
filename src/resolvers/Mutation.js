const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");
const APP_SECRET = process.env["APP_SECRET"];

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ name: args.name });

    if (!user) {
        throw new Error("No such user found")
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
        throw new Error("Invalid password")
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

function createItem(parent, args, context, info) {
    const userId = getUserId(context);

    return context.prisma.createItem({
        name: args.name,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

function updateItem(parent, args, context, info) {
    const userId = getUserId(context);

    return context.prisma.updateItem({
        data: {
            name: args.name,
            description: args.description,
            done: args.done
        },
        where: {
            id: args.id
        }
    });
}

function deleteItem(parent, args, context, info) {
    const userId = getUserId(context);

    return context.prisma.deleteItem({
        where: {
            id: args.id
        }
    });
}

module.exports = {
    signup,
    login,
    createItem,
    updateItem,
    deleteItem
};