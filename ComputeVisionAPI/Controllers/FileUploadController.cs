using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace ComputeVisionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly IConfiguration _config;

        public FileUploadController(IConfiguration config)
        {
            _config = config;
        }

        private ComputerVisionClient InitializeComputerVisionClient()
        {
            ComputerVisionClient client = new(
                new ApiKeyServiceClientCredentials(_config["VisionKey"]));
            client.Endpoint = _config["VisionEndpoint"];

            return client;
        }

        [HttpPost]
        [Route("analyzeImage")]
        public async Task<IActionResult> AnalyzeImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file was uploaded.");
            }

            if (!file.ContentType.StartsWith("image/"))
            {
                return BadRequest("Only images are accepted");
            }

            using var stream = file.OpenReadStream();

            try
            {
                ComputerVisionClient client = InitializeComputerVisionClient();
                ImageAnalysis result = await client.AnalyzeImageInStreamAsync(stream, new List<VisualFeatureTypes?>() { VisualFeatureTypes.Objects });
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
