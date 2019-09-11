function postedBy(parent, args, context) {
    return context.prisma.item({ id: parent.id }).postedBy();
}

module.exports = {
    postedBy
};