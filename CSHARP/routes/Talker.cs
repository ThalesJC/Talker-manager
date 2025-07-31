using CSHARP.data;
using CSHARP.models;
using Microsoft.EntityFrameworkCore;

namespace CSHARP.routes
{
    public static class TalkerRoutes
    {
        public static void Routes(this WebApplication app)
        {
            var routes = app.MapGroup("/talker");

            routes.MapPost("/", async (TalkerRequest req, TalkerContext context) =>
            {
                var talker = new Talker(req.name, req.age, req.watchedAt, req.rate);
                await context.AddAsync(talker);
                await context.SaveChangesAsync();
            });

            routes.MapGet("/", async (TalkerContext context) =>
            {
                var talkers = await context.Talkers.ToListAsync();
                return Results.Ok(talkers);
            });

            routes.MapPut("/{id:guid}", async (Guid id, TalkerRequest req, TalkerContext context) =>
            {
                var talker = await context.Talkers.FirstOrDefaultAsync(x => x.Id == id);

                if (talker == null)
                {
                    return Results.NotFound();
                }

                if (!string.IsNullOrWhiteSpace(req.name))
                {
                    talker.ChangeName(req.name);
                }

                if (req.age != 0)
                {
                    talker.ChangeAge(req.age);
                }

                if (!string.IsNullOrWhiteSpace(req.watchedAt))
                {
                    talker.ChangeDate(req.watchedAt);
                }

                if (req.rate != 0)
                {
                    talker.ChangeRate(req.rate);
                }

                await context.SaveChangesAsync();
                return Results.Ok(talker);
            });

            routes.MapDelete("/{id:guid}", async (Guid id, TalkerContext context) =>
            {
                var talker = await context.Talkers.FirstOrDefaultAsync(x => x.Id == id);

                if (talker == null)
                {
                    return Results.NotFound();
                }
                talker.SetInactive();
                await context.SaveChangesAsync();
                return Results.Ok(talker);
            });
        }
    }
}