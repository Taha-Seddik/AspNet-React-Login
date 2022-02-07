using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NiceServer.Models;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NiceServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null) return Unauthorized("Invalid email");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, loginDto.Email),
                    new Claim(ClaimTypes.Role, "Administrator"),
                };
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity)
                );
                return Ok();
            }
            return Unauthorized("Invalid Pwd");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Problem registering user");

            return Ok("Registration success - please verify email");
        }

    }
}

//[AllowAnonymous]
//[HttpPost("fbLogin")]
//public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
//{
//var fbVerifyKeys = _config["Facebook:AppId"] + "|" + _config["Facebook:AppSecret"];

//var verifyToken = await _httpClient
//    .GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

//if (!verifyToken.IsSuccessStatusCode) return Unauthorized();

//var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

//var response = await _httpClient.GetAsync(fbUrl);

//if (!response.IsSuccessStatusCode) return Unauthorized();

//var fbInfo = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

//var username = (string)fbInfo.id;

//var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);

//if (user != null) return CreateUserObject(user);

//user = new AppUser
//{
//    DisplayName = (string)fbInfo.name,
//    Email = (string)fbInfo.email,
//    UserName = (string)fbInfo.id,
//};

//user.EmailConfirmed = true;

//var result = await _userManager.CreateAsync(user);

//if (!result.Succeeded) return BadRequest("Problem creating user account");

//await SetRefreshToken(user);
//return CreateUserObject(user);
//}