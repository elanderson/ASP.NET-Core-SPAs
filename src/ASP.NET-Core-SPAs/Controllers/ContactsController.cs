using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using ASP.NET_Core_SPAs.Contexts;
using ASP.NET_Core_SPAs.Models;
using Microsoft.AspNet.Authorization;

namespace ASP.NET_Core_SPAs.Controllers
{
    [Authorize]
    public class ContactsController : Controller
    {
        private readonly ContactsDbContext _context;

        public ContactsController(ContactsDbContext context)
        {
            _context = context;
        }

        // GET: Contacts
        public async Task<IActionResult> Index()
        {
            return View(await GetContacts().ToListAsync());
        }

        // GET: Contacts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }

        // GET: Contacts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Contacts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Contact contact)
        {
            if (ModelState.IsValid)
            {
                contact.UserId = User.GetUserId();
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(contact);
        }

        // GET: Contacts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            return View(contact);
        }

        // POST: Contacts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Update(contact);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(contact);
        }

        // GET: Contacts/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }

        // POST: Contacts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var contact = await GetContacts().SingleAsync(m => m.Id == id);
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private IQueryable<Contact> GetContacts()
        {
            return _context.Contacts.Where(c => c.UserId == User.GetUserId());
        }
    }
}
