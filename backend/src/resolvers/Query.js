const {forwardTo}=require('prisma-binding');
const {hasPermission} =require("../utils");
const Query = {
    // dogs(parent,args,ctx,info){
    //     // return [{name:"Snickers"},{name:"Sunny"}];
    //     global.dogs=global.dogs||[];
    //     return global.dogs;
    // }
    // async items(parent,args,ctx,info){
    //     const items=await ctx.db.query.items();
    //     return items;
    // },
    items:forwardTo('db'),
    //上面等价于 items:forwardTo('db')
    item:forwardTo('db'),
    itemsConnection:forwardTo('db'),
    me(parent,args,ctx,info){
        if(!ctx.request.userId){
            return null;
        }else{
            return ctx.db.query.user({
                where:{id:ctx.request.userId}
            },info);
        }
    },
    async users(parent,args,ctx,info){
        //1.check if I am loggin in
        if(!ctx.request.userId){
            throw new Error("You must log in!");
        }
        //2.whether I have the permission to manage permissions
        //must use middleware to populate ctx.request.user first
        hasPermission(ctx.request.user,["ADMIN","PERMISSIONUPDATE"]);
        //3.if I do, query all users
        //不用await,就等价于return ctx.db.request.users({},info);
        const users=await ctx.db.query.users({},info);
        return users;
    },
    async order(parent,args,ctx,info){
        //1.logged in
        if(!ctx.request.userId){
            throw new Error("You must log in!");
        }
        //2.make the query
        const order=await ctx.db.query.order({
            where:{
                id:args.id
            }
        },info);
        //3.have the permission to see this order?
        const ownsorder=order.user.id===ctx.request.userId;
        const hasPermission=ctx.request.user.permissions.includes("ADMIN");
        if(ownsorder || hasPermission){
            //do nothing
        }else{
            throw new Error("You dont have the permission to see this order!");
        }
        //4.return
        return order;

    },
    async orders(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) {
            throw new Error('you must be signed in!');
        }
        return ctx.db.query.orders(
            {
                where: {
                    user: { id: userId },
                },
            },
            info
        );
    },

};

module.exports = Query;
