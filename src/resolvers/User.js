function items(parent, args, context) {
    return context.prisma.user({ id: parent.id }).items();
}

module.exports = {
    items
};