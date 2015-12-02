namespace UserService.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using UserService.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<UserService.Models.UserServiceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(UserService.Models.UserServiceContext context)
        {
            context.Groups.AddOrUpdate(x => x.Id,
                new Group() { Id = 1, Name = "Breakfast Club" },
                new Group() { Id = 2, Name = "Computers Club" },
                new Group() { Id = 3, Name = "Spanish Club" }
                );

            context.Users.AddOrUpdate(x => x.Id,
                new User()
                {
                    Id = 1,
                    Name = "John Doe",
                    GroupId = 1,
                    Email = "johndoe@email.com"
                },
                new User()
                {
                    Id = 2,
                    Name = "Jane Doe",
                    GroupId = 1,
                    Email = "janedoe@email.com"
                },
                new User()
                {
                    Id = 3,
                    Name = "David Copperfield",
                    GroupId = 2,
                    Email = "davidcopperfield@email.com"
                },
                new User()
                {
                    Id = 4,
                    Name = "Joe Bloggs",
                    GroupId = 3,
                    Email = "joebloggs@email.com"
                });
        }
    }
}
