// import the appdbcontext ||  using app.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Mir_Requests.NewFolder2;
using static Mir_Requests.NewFolder2.Connsql;

var policyname = "cors-unlock";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add cors

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy =>{
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddConnections(options =>

    //builder.Services.Connsql(options =>
    Options.Create(builder.Configuration.GetConnectionString("Default")));

//builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();

app.UseCors();

app.Run();