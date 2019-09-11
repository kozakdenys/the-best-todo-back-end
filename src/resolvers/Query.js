async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { name_contains: args.filter },
        ]
    }: {};
    const items = await context.prisma.items({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });
    const count = await context.prisma
        .itemsConnection({
            where,
        })
        .aggregate()
        .count();

    return {
        items,
        count,
    };
}

function item(parent, args, context, info) {
    return context.prisma.item({
        id: args.id
    });
}

module.exports = {
    feed,
    item
};