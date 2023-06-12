namespace Mir_Requests.NewFolder2;
using Microsoft.EntityFrameworkCore;
using Mir_Requests.Controllers;
    public class Connsql : DbContext
    {
        protected readonly IConfiguration Configuration;

        public Connsql(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
           // connect to sql server with connection string from app settings
           object value = options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }
        
    }

// https://www.youtube.com/watch?v=fs91tscu4LM