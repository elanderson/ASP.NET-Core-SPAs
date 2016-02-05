using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using ASP.NET_Core_SPAs.Contexts;
using ASP.NET_Core_SPAs.Models;
using Microsoft.AspNet.Authorization;

namespace ASP.NET_Core_SPAs.API
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Contacts")]
    public class ContactsApiController : Controller
    {
        private readonly ContactsDbContext _context;

        public ContactsApiController(ContactsDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactsApi
        [HttpGet]
        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await GetContacts().ToListAsync();
        }

        // GET: api/ContactsApi/5
        [HttpGet("{id}", Name = "GetContact")]
        public async Task<IActionResult> GetContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);

            if (contact == null)
            {
                return HttpNotFound();
            }

            return Ok(contact);
        }

        // PUT: api/ContactsApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact([FromRoute] int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != contact.Id ||
                User.GetUserId() != contact.UserId)
            {
                return HttpBadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return HttpNotFound();
                }

                throw;
            }

            return new HttpStatusCodeResult(StatusCodes.Status204NoContent);
        }

        // POST: api/ContactsApi
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            contact.UserId = User.GetUserId();
            _context.Contacts.Add(contact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContactExists(contact.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }

                throw;
            }

            return CreatedAtRoute("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/ContactsApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Count(e => e.Id == id) > 0;
        }

        private IQueryable<Contact> GetContacts()
        {
            return _context.Contacts.Where(c => c.UserId == User.GetUserId());
        }
    }
}