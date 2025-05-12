var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles(); // Importante
app.UseStaticFiles();  // Importante para servir archivos de wwwroot

// Middleware para manejar las rutas de React
app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), builder =>
{
    builder.UseStaticFiles();
    builder.UseDefaultFiles();
    builder.Run(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(app.Environment.WebRootPath, "index.html"));
    });
});

app.MapControllers();
app.MapFallbackToFile("index.html"); // Redirige a index.html sin barra diagonal inicial

app.Run();