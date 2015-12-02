using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using UserService.Models;

namespace UserService.Controllers
{
    public class UsersController : ApiController
    {
        private UserServiceContext db = new UserServiceContext();

        // GET: api/Users
        public IQueryable<UserDTO> GetUsers()
        {
            var Users = from b in db.Users
                        select new UserDTO()
                        {
                            Id = b.Id,
                            Name = b.Name,
                            GroupName = b.Group.Name
                        };

            return Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(UserDetailDTO))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var User = await db.Users.Include(b => b.Group).Select(b =>
                new UserDetailDTO()
                {
                    Id = b.Id,
                    Name = b.Name,
                    GroupName = b.Group.Name,
                    Email = b.Email
                }).SingleOrDefaultAsync(b => b.Id == id);
            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(int id, User User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != User.Id)
            {
                return BadRequest();
            }

            db.Entry(User).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(User User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(User);
            await db.SaveChangesAsync();

            // Load Group name
            db.Entry(User).Reference(x => x.Group).Load();

            var dto = new UserDTO()
            {
                Id = User.Id,
                Name = User.Name,
                GroupName = User.Group.Name
            };

            return CreatedAtRoute("DefaultApi", new { id = User.Id }, dto);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User User = await db.Users.FindAsync(id);
            if (User == null)
            {
                return NotFound();
            }

            db.Users.Remove(User);
            await db.SaveChangesAsync();

            return Ok(User);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}