using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Hosting.AGUI.AspNetCore;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Options;
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using OpenAI;
using System.ComponentModel;
using System.Text.Json.Serialization;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.TypeInfoResolverChain.Add(ProverbsAgentSerializerContext.Default));
builder.Services.AddAGUI();

WebApplication app = builder.Build();

// Create the agent factory and map the AG-UI agent endpoint
var loggerFactory = app.Services.GetRequiredService<ILoggerFactory>();
var jsonOptions = app.Services.GetRequiredService<IOptions<JsonOptions>>();
var agentFactory = new DataverseAgentFactory(builder.Configuration, loggerFactory, jsonOptions.Value.SerializerOptions);
app.MapAGUI("/", agentFactory.CreateDataverseAgent());

await app.RunAsync();

// =================
// State Management
// =================
public class ProverbsState
{
    public List<string> Proverbs { get; set; } = [];
}

// =================
// Agent Factory
// =================
public class DataverseAgentFactory
{
    private readonly IConfiguration _configuration;
    private readonly ProverbsState _state;
    private readonly OpenAIClient _openAiClient;
    private readonly ServiceClient _serviceClient;

    private readonly ILogger _logger;
    private readonly System.Text.Json.JsonSerializerOptions _jsonSerializerOptions;

    public DataverseAgentFactory(IConfiguration configuration, ILoggerFactory loggerFactory, System.Text.Json.JsonSerializerOptions jsonSerializerOptions)
    {
        _configuration = configuration;
        _state = new();
        _logger = loggerFactory.CreateLogger<DataverseAgentFactory>();
        _jsonSerializerOptions = jsonSerializerOptions;

        // Get the GitHub token from configuration
        var openAiKey = _configuration["OpenAI_ApiKey"]
            ?? throw new InvalidOperationException(
                "OpenAI key not found in configuration. ");

        _openAiClient = new(
            new System.ClientModel.ApiKeyCredential(openAiKey),
            new OpenAIClientOptions
            {
                
            });

        string url = configuration["Dataverse:Url"] ?? throw new InvalidOperationException("Dataverse:Url is missing from configuration");
        string clientId = configuration["Dataverse:ClientId"] ?? throw new InvalidOperationException("Dataverse:ClientId is missing from configuration");
        string secret = configuration["Dataverse:Secret"] ?? throw new InvalidOperationException("Dataverse:Secret is missing from configuration");
        string connectionString = $@"
    AuthType = ClientSecret;
    Url = {url};
    ClientId = {clientId};
    Secret = {secret}";

        _serviceClient = new ServiceClient(connectionString);
    }

    public AIAgent CreateDataverseAgent()
    {
        var chatClient = _openAiClient.GetChatClient("gpt-5.1").AsIChatClient();

        var chatClientAgent = new ChatClientAgent(
            chatClient,
            name: "DataverseAgent",
            description: @"A helpful assistant that helps the user read and write data in Dataverse.", instructions: "When calling the GetContacts tool, make sure that the FetchXml always returns firstname, lastname, emailaddress1 and mobilephone. ",
            tools: [
             
                AIFunctionFactory.Create(GetWeather, options: new() { Name = "get_weather", SerializerOptions = _jsonSerializerOptions }),
                AIFunctionFactory.Create(GetContacts, options: new() { Name = "get_contacts", SerializerOptions = _jsonSerializerOptions })
            ]);

        return new SharedStateAgent(chatClientAgent, _jsonSerializerOptions);
    }

    // =================
    // Tools
    // =================

    [Description("Get the current list of proverbs.")]
    private List<string> GetProverbs()
    {
        _logger.LogInformation("📖 Getting proverbs: {Proverbs}", string.Join(", ", _state.Proverbs));
        return _state.Proverbs;
    }

    [Description("Add new proverbs to the list.")]
    private void AddProverbs([Description("The proverbs to add")] List<string> proverbs)
    {
        _logger.LogInformation("➕ Adding proverbs: {Proverbs}", string.Join(", ", proverbs));
        _state.Proverbs.AddRange(proverbs);
    }

    [Description("Replace the entire list of proverbs.")]
    private void SetProverbs([Description("The new list of proverbs")] List<string> proverbs)
    {
        _logger.LogInformation("📝 Setting proverbs: {Proverbs}", string.Join(", ", proverbs));
        _state.Proverbs = [.. proverbs];
    }

    [Description("Get the weather for a given location. Ensure location is fully spelled out.")]
    private WeatherInfo GetWeather([Description("The location to get the weather for")] string location)
    {
        _logger.LogInformation("🌤️  Getting weather for: {Location}", location);
        return new()
        {
            Temperature = 20,
            Conditions = "sunny",
            Humidity = 50,
            WindSpeed = 10,
            FeelsLike = 25
        };
    }

    [Description("Gets a list of contacts from Dataverse based on a FetchXml query.")]
    private List<ContactInfo> GetContacts([Description("The FetchXml query used to retrieve contacts from Dataverse.")] string fetchXml)
    {
        try
        {
            FetchExpression fetchExpression = new FetchExpression(fetchXml);
            EntityCollection result = _serviceClient.RetrieveMultiple(fetchExpression);

            // Take the result which is a list of contacts, and convert it to List<ContactInfo>.
            var contacts = result.Entities.Select(entity => new ContactInfo
            {
                ContactId = entity.Id,
                FirstName = entity.GetAttributeValue<string>("firstname") ?? string.Empty,
                LastName = entity.GetAttributeValue<string>("lastname") ?? string.Empty,
                Email = entity.GetAttributeValue<string>("emailaddress1") ?? string.Empty,
                MobilePhone = entity.GetAttributeValue<string>("mobilephone") ?? string.Empty
            }).ToList();

            return contacts;
        }
        catch (Exception err)
        {
            _logger.LogError(err, "Error retrieving contacts from Dataverse");
            throw;
        }
    }
}

// =================
// Data Models
// =================

public class ProverbsStateSnapshot
{
    [JsonPropertyName("proverbs")]
    public List<string> Proverbs { get; set; } = [];
}

public class WeatherInfo
{
    [JsonPropertyName("temperature")]
    public int Temperature { get; init; }

    [JsonPropertyName("conditions")]
    public string Conditions { get; init; } = string.Empty;

    [JsonPropertyName("humidity")]
    public int Humidity { get; init; }

    [JsonPropertyName("wind_speed")]
    public int WindSpeed { get; init; }

    [JsonPropertyName("feelsLike")]
    public int FeelsLike { get; init; }
}

public class ContactInfo
{
    [JsonPropertyName("contactid")]
    public Guid ContactId { get; init; }

    [JsonPropertyName("firstname")]
    public string FirstName { get; init; } = string.Empty;

    [JsonPropertyName("lastname")]
    public string LastName { get; init; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; init; } = string.Empty;

    [JsonPropertyName("mobilephone")]
    public string MobilePhone { get; init; } = string.Empty;
}

public partial class Program { }

// =================
// Serializer Context
// =================
[JsonSerializable(typeof(ProverbsStateSnapshot))]
[JsonSerializable(typeof(WeatherInfo))]
internal sealed partial class ProverbsAgentSerializerContext : JsonSerializerContext;
