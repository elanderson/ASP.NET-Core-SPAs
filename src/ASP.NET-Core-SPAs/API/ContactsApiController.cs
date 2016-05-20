using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASP.NET_Core_SPAs.Contexts;
using ASP.NET_Core_SPAs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ASP.NET_Core_SPAs.API
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Contacts")]
    public class ContactsApiController : Controller
    {
        private readonly ContactsDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ContactsApiController(UserManager<ApplicationUser> userManager, 
                                     ContactsDbContext context)
        {
            _userManager = userManager;
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
                return BadRequest(ModelState);
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/ContactsApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact([FromRoute] int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.Id ||
                _userManager.GetUserId(User) != contact.UserId)
            {
                return BadRequest();
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
                    return NotFound();
                }

                throw;
            }

            return new StatusCodeResult(StatusCodes.Status204NoContent);
        }

        // POST: api/ContactsApi
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contact.UserId = _userManager.GetUserId(User);
            _context.Contacts.Add(contact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContactExists(contact.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
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
                return BadRequest(ModelState);
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            if (contact == null)
            {
                return NotFound();
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
            return _context.Contacts.Where(c => c.UserId == _userManager.GetUserId(User));
        }
    }
}