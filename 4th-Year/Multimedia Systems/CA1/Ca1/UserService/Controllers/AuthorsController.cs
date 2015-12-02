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
    public class GroupsController : ApiController
    {
        private UserServiceContext db = new UserServiceContext();

        // GET: api/Groups
        public IQueryable<Group> GetGroups()
        {
            return db.Groups;
        }

        // GET: api/Groups/5
        [ResponseType(typeof(Group))]
        public async Task<IHttpActionResult> GetGroup(int id)
        {
            Group Group = await db.Groups.FindAsync(id);
            if (Group == null)
            {
                return NotFound();
            }

            return Ok(Group);
        }

        // PUT: api/Groups/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutGroup(int id, Group Group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Group.Id)
            {
                return BadRequest();
            }

            db.Entry(Group).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
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

        // POST: api/Groups
        [ResponseType(typeof(Group))]
        public async Task<IHttpActionResult> PostGroup(Group Group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Groups.Add(Group);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = Group.Id }, Group);
        }

        // DELETE: api/Groups/5
        [ResponseType(typeof(Group))]
        public async Task<IHttpActionResult> DeleteGroup(int id)
        {
            Group Group = await db.Groups.FindAsync(id);
            if (Group == null)
            {
                return NotFound();
            }

            db.Groups.Remove(Group);
            await db.SaveChangesAsync();

            return Ok(Group);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GroupExists(int id)
        {
            return db.Groups.Count(e => e.Id == id) > 0;
        }
    }
}