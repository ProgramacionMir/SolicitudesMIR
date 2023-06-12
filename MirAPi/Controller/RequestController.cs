using Azure.Core;
using Microsoft.AspNetCore.Mvc;

namespace Mir_Requests.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequestController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "actividad infantil", "conferncia", "no hay internet"
    };
        private static readonly string[] names = new[]
       {
        "christopher", "osner", "origenes", "Pedro", "Luzdivina", "Franc", "gary", "cristian (el fuerte)", "christian"
    };
        private static readonly string[] requests = new[]
       {
        "Proyector", "photocopia", "salon", "eqipo audio video", "equipo audio", "proyector", "ordenador", "tecnico"
    };

        private readonly ILogger<RequestController> _logger;

        public RequestController(ILogger<RequestController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRequests")]
        public IEnumerable<Requests> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Requests
            {
                Date = DateTime.Now.AddDays(index),
                name = names[Random.Shared.Next(names.Length)],
                request = requests[Random.Shared.Next(requests.Length)],
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost("ui{usuario}requ='{request}'smmry=({summary}) date={date}")]
        public IActionResult CreateRequest([FromBody] Request req){
            try
            {
        if (req is null)
        {
            _logger.LogError("Owner object sent from client is null.");
            return BadRequest("Owner object is null");
        }

        if (!ModelState.IsValid)
        {
            _logger.LogError("Invalid owner object sent from client.");
            return BadRequest("Invalid model object");
        }

        //var reqEntity = _3mapper.Map<req>(req);

        //_repository.Owner.CreateOwner(reqEntity);
        //_repository.Save();

       // var createdOwner = _mapper.Map<OwnerDto>(ownerEntity);

        return CreatedAtRoute("OwnerById", new { id = Request });
    }
    catch (Exception ex)
    {
        _logger.LogError($"Something went wrong inside CreateOwner action: {ex.Message}");
        return StatusCode(500, "Internal server error");
    }
}
        [HttpDelete("{id}")]
        public IActionResult DeleteRequest(Guid id)
        {
            try
            {
                var REquest = _logger;
                if (REquest == null)
                {
                    _logger.LogError($"That request with id: {id}, hasn't been found in db.");
                    return NotFound();
                }

                //_.Owner.DeleteOwner(owner);
                //_repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteOwner action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }

}