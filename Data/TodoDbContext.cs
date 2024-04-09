using Microsoft.EntityFrameworkCore;
using YourNamespace.Models;

namespace WebApplication1.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<TodoModel> TodoList { get; set; }
    }
}
