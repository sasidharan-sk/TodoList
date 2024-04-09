using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using YourNamespace.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext dbContext;

        public TodoController(TodoDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        // GET: api/Todo
        [HttpGet]
        public IActionResult GetTodos()
        {
            var todos = dbContext.TodoList.ToList();
            return Ok(todos);
        }

        // POST: api/Todo
        [HttpPost]
        public IActionResult PostTodo([FromBody] TodoModel todo)
        {
            dbContext.TodoList.Add(todo);
            dbContext.SaveChanges();
            return Ok(todo);
        }

        // PUT: api/Todo/5
        [HttpPut]
        [Route("{id}")]
        public IActionResult PutTodo([FromRoute] int id,[FromBody] TodoModel todoItem)
        {
     
            // Retrieve the existing TodoModel from the database
            var existingTodo = dbContext.TodoList.Find(id);

            if (existingTodo == null)
            {
                return NotFound("Todo not found");
            }

            // Update the properties of the existing TodoModel
            existingTodo.Text = todoItem.Text;

            // Save the changes to the database
            dbContext.SaveChanges();

            return Ok(existingTodo);
        }

        // DELETE: api/Todo/5
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteTodo([FromRoute] int id)
        {
            var todoToRemove = dbContext.TodoList.Find(id);
            if (todoToRemove == null)
                return NotFound();

            dbContext.TodoList.Remove(todoToRemove);
            dbContext.SaveChanges();

            return Ok(todoToRemove);
        }

        [HttpPatch]
        [Route("Toggle/{id}")]
        public IActionResult ToggleTodoCompletion([FromRoute] int id)
        {
            var todoToToggle = dbContext.TodoList.Find(id);

            if (todoToToggle == null)
            {
                return NotFound("Todo not found");
            }

            // Toggle the completion status
            todoToToggle.Completed = !todoToToggle.Completed;

            // Save the changes to the database
            dbContext.SaveChanges();

            return Ok(todoToToggle);
        }
    }
}

