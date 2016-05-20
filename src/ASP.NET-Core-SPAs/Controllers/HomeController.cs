using Microsoft.AspNetCore.Mvc;

namespace ASP.NET_Core_SPAs.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Angular2()
        {
            return View();
        }

        public IActionResult Aurelia()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
